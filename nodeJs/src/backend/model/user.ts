/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { setModel } from '../util/sequelize';
import { Repository, tp } from '../util/repository';

const params = {
  name: { type: tp.string, unique: [], require: true },
  email: { type: tp.string, unique: [], require: true },
  password: { type: tp.string, require: true }
}

export const UserMD = setModel("user");
export const UserRP = new Repository("user", UserMD, params);
