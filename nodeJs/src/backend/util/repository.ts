/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { col, fn, literal, Op, Sequelize } from 'sequelize';

import * as errors from './errors';
import { onBadRequest, onError } from './handlers';

export const tp = {
  string: 1,
  number: 2,
  boolean: 3,
  object: 4,
  array: 5,
  uuid: 6,
  any: 7,
};

interface filter {
  attributes?: any[];
  keep?: boolean;
  order?: string[][];
  group?: string;
  count?: string;
  log?: boolean;
}

export interface Param {
  type?: number;
  onCreate?: string | number | boolean;
  notUpdate?: boolean;
  require?: boolean;
  unique?: string[];
  default?: any;
  params?: any;
}

export class Repository {
  public params: any;
  public name: string;
  public model: any;

  constructor(name: string, model: any, params: any) {
    this.params = params;
    this.name = name;
    this.model = model;
  }

  /*** PUBLIC ***/

  public async getMany(where, keep: boolean | filter = false): Promise<any[]> {
    const objs = await this.model.findAll(this.setWhere(where, keep));
    return this.getManyObjs(objs, keep);
  }

  public async getOne(where, keep: boolean | filter = true): Promise<any> {
    const obj = await this.model.findOne(this.setWhere(where, keep));
    if (!obj) return null;
    return this.getObj(obj, keep);
  }

  public async getOneById(res, id, filter = null, keep: boolean | filter = true): Promise<any> {
    const obj = await this.model.findOne({ where: { id: id } });
    if (!obj || obj.control.removed != 0) {
      onBadRequest(res, errors.notFound(this.name));
      return;
    }
    if (filter != null)
      for (const key of Object.keys(filter)) {
        if (!(key in obj.data)) {
          onBadRequest(res, errors.insufficientParameters());
          return;
        }
        const filterValue = filter[key];
        let value = obj.data[key];
        if (typeof filterValue == 'string') value = String(value);
        if (value != filterValue) {
          onBadRequest(res, errors.notFound(this.name));
          return;
        }
      }
    return this.getObj(obj, keep);
  }

  public async new(): Promise<any> {
    const obj = new this.model();
    for (const key of Object.keys(this.params)) if (key != 'id') obj.data[key] = null;
    obj.control['created'] = Date.now();
    obj.control['removed'] = 0;
    const objData = this.getObj(obj, true);
    return objData;
  }

  public async create(res, data): Promise<any> {
    const obj = await this.new();
    this.onCreate(data);
    await this.copyData(res, obj, data, true);
    return obj;
  }

  public async update(res, objData, data, properties: string[] = []) {
    this.removeNotUpdate(data);
    await this.copyData(res, objData, data, false, properties);
  }

  public async remove(res, id, filter = {}) {
    const obj = await this.getOneById(res, id, filter);
    if (res.writableEnded) return;
    obj.dbObj.control['removed'] = Date.now();
    obj.dbObj.changed('control', true);
    await obj.dbObj.save();
  }

  public async delete(res, id, filter = {}) {
    await this.getOneById(res, id, filter);
    if (res.writableEnded) return;
    await this.model.destroy({ where: { id: id } });
  }

  public async save(res, obj) {
    if (!('dbObj' in obj)) {
      onError(res, errors.fmdrSave());
      return;
    }
    for (const prop in obj) {
      if (prop != 'id' && prop != 'dbObj') {
        obj.dbObj.data[prop] = obj[prop];
      }
    }
    obj.dbObj.changed('data', true);
    await obj.dbObj.save();
  }

  public async populate(id): Promise<any | any[]> {
    let obj = null;
    if (Array.isArray(id)) obj = this.getManyObjs(await this.getMany({ id: id }), false);
    else obj = this.getObj(await this.getOne({ id: id }), false);
    return obj;
  }

  /*** PRIVATE ***/

  private getObj(dbObj, keep) {
    const obj = JSON.parse(JSON.stringify('data' in dbObj.dataValues ? dbObj.data : dbObj));
    if ('id' in dbObj.dataValues) obj['id'] = dbObj.dataValues.id;
    if ((typeof keep == 'boolean' && keep) || (typeof keep == 'object' && 'keep' in keep && keep['keep']))
      obj['dbObj'] = dbObj;
    return obj;
  }

  private getManyObjs(objs, keep) {
    const objsData = [];
    objs.forEach((obj) => {
      objsData.push(this.getObj(obj, keep));
    });
    return objsData;
  }

  private onCreate(data) {
    Object.keys(this.params).forEach((key) => {
      if ('onCreate' in this.params[key]) data[key] = this.params[key].onCreate;
    });
  }

  private removeNotUpdate(data) {
    Object.keys(data).forEach((key) => {
      if (key in this.params && 'notUpdate' in this.params[key] && this.params[key]['notUpdate']) delete data[key];
    });
  }

  public setWhere(where, keep) {
    const dataWhere = this.sw(where);
    dataWhere['control.removed'] = 0;
    const sequelizeWhere = { where: dataWhere };
    if (typeof keep == 'object') {
      if ('order' in keep) {
        for (const order of keep.order) {
          order[0] = order[0] == 'id' ? 'id' : Sequelize.json(`data.${order[0]}`);
        }
        sequelizeWhere['order'] = keep['order'];
      }
      if ('attributes' in keep) {
        sequelizeWhere['attributes'] = [];
        for (const att of keep.attributes) {
          sequelizeWhere['attributes'].push(
            typeof att == 'string' ? (att == 'id' ? 'id' : [Sequelize.json(`data.${att}`), att]) : att
          );
        }
      }
      if ('group' in keep) {
        sequelizeWhere['group'] = literal(`"data"#>>'{${keep['group']}}'`);
      }
      if ('count' in keep) {
        sequelizeWhere['group'] = literal(`"data"#>>'{${keep['count']}}'`);
        sequelizeWhere['attributes'] = [
          [Sequelize.json(`data.${keep['count']}`), keep['count']],
          [fn('COUNT', col('*')), 'count'],
        ];
      }
      if ('log' in keep && keep.log) {
        sequelizeWhere['logging'] = (sql, queryObject) => { console.log(sql); };
      }
    }
    return sequelizeWhere;
  }

  private sw(obj) {
    for (const key of Object.keys(obj)) {
      if (Array.isArray(obj[key])) {
        for (const i in obj[key]) {
          if (typeof obj[key][i] == 'object') obj[key][i] = this.sw(obj[key][i]);
        }
      } else if (obj[key] != null && typeof obj[key] == 'object') {
        obj[key] = this.sw(obj[key]);
      }
      if (key != 'id' && key.substring(0, 8) != 'control.') {
        obj[`data.${key}`] = obj[key];
        delete obj[key];
      }
    }
    for (const symbol of Object.getOwnPropertySymbols(obj)) {
      if (Array.isArray(obj[symbol])) {
        for (const i in obj[symbol]) {
          if (obj[symbol][i].constructor.name == 'Where') continue;
          if (typeof obj[symbol][i] == 'object') obj[symbol][i] = this.sw(obj[symbol][i]);
        }
      } else if (obj[symbol] != null && typeof obj[symbol] == 'object') {
        obj[symbol] = this.sw(obj[symbol]);
      }
    }
    return obj;
  }

  private async copyData(res, obj, data, isCreate: boolean, properties: string[] = []) {
    const paramsKeys = Object.keys(this.params);
    const keys = properties.length == 0 ? paramsKeys : properties;
    for (const key of keys) {
      if (!paramsKeys.includes(key)) continue;
      const param = this.params[key];
      const value = this.getValue(res, key, data, param);
      if (res.writableEnded) return;
      if (
        isCreate &&
        'require' in param &&
        param.require == true &&
        (value == null || (Array.isArray(value) && value.length == 0))
      ) {
        onBadRequest(res, errors.isEmpty(key));
        return;
      }
      if (key in data) obj[key] = value;
    }
    for (const key of keys) {
      if (!paramsKeys.includes(key) || !(key in data)) continue;
      const param = this.params[key];
      if ('unique' in param) {
        if (!(key in param.unique)) param.unique.push(key);
        const where = { id: { [Op.not]: obj.id }, 'control.removed': 0 };
        for (const p of param.unique) if (p in obj) where[`data.${p}`] = obj[p];
        const exists = await this.model.findOne({ where: where });
        if (exists) {
          onBadRequest(res, errors.isUnavailable(key));
          return;
        }
      }
    }
  }

  private getValue(res, key, data, param) {
    const defaultValue = 'default' in param ? param.default : 'type' in param && param.type == tp.array ? [] : null;
    let value = defaultValue;
    if (key in data) value = data[key];
    if (value != defaultValue && 'type' in param) {
      let err = false;
      const valueType = tp[typeof value];
      if (param.type == tp.array && !Array.isArray(value)) err = true;
      else if (param.type == tp.uuid && valueType != tp.string) err = true;
      else if (![tp.uuid, tp.array].includes(param.type) && param.type != valueType) err = true;
      if (err) {
        onBadRequest(res, errors.invalidParamType(key));
        return;
      }
    }
    return value;
  }
}

interface verifyObjOptions {
  allRequireParams?: boolean;
  defaultParamType?: number;
}

export function VerifyArray(res, arr, params, options: verifyObjOptions = {}) {
  const newArray = [];
  for (const obj of arr) {
    newArray.push(VerifyObj(res, obj, params, options));
    if (res.writableEnded) return;
  }
  return newArray;
}

export function VerifyObj(res, obj, params, options: verifyObjOptions = {}): any {
  options['allRequireParams'] = 'allRequireParams' in options ? options['allRequireParams'] : false;
  options['defaultParamType'] = 'defaultParamType' in options ? options['defaultParamType'] : tp.any;
  if (obj == null) return null;
  const newObj = {};
  for (const key of Object.keys(params)) {
    const param: Param = params[key];
    const isRequire = options.allRequireParams || ('require' in param && param.require == true);
    if (isRequire && !(key in obj)) {
      onBadRequest(res, errors.notFound('Param', `Required Param '${key}'`));
      return;
    }
    if (!('type' in param)) param['type'] = options.defaultParamType;
    // Get Value
    const defaultValue = 'default' in param ? param.default : param.type == tp.array ? [] : null;
    let value = defaultValue;
    if (key in obj) value = obj[key];
    if (value != defaultValue && param.type != tp.any) {
      let err = false;
      const valueType = tp[typeof value];
      if (param.type == tp.array && !Array.isArray(value)) err = true;
      else if (param.type == tp.uuid && valueType != tp.string) err = true;
      else if (![tp.uuid, tp.array].includes(param.type) && param.type != valueType) err = true;
      if (err) {
        onBadRequest(res, errors.invalidParamType(key));
        return;
      }
    }
    if (param.type == tp.uuid && param.type == tp.uuid && isRequire && (value == null || value == '')) {
      onBadRequest(res, errors.isInvalid('Param', `Required Param '${key}'`));
      return;
    }
    // Recursive
    newObj[key] =
      'params' in param
        ? param.type == tp.array
          ? VerifyArray(res, value, param.params, options)
          : VerifyObj(res, value, param.params, options)
        : value;
    if (res.writableEnded) return;
  }
  return newObj;
}
