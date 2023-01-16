/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { setLocalStorageModel } from './sequelize';

const LsMD = setLocalStorageModel();

export async function getLS(type: string): Promise<any> {
  const ls = await LsMD.findOne({ where: { type: type } });
  if (ls == null) return null;
  return ls.dataValues.data;
}

export async function setLS(type: string, data: any) {
  let ls = await LsMD.findOne({ where: { type: type } });
  if (ls == null) {
    ls = new LsMD();
    ls.setDataValue('control', { created: Date.now() });
    ls.setDataValue('type', type);
  }
  ls.setDataValue('data', data);
  await ls.save();
}
