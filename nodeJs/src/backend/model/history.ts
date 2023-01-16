/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { setModel } from '../util/sequelize';
import { Repository, tp } from '../util/repository';

const params = {
  userId: { type: tp.uuid, unique: [], require: true },
  quotes: { type: tp.array }
}

export const quoteParams = {
  coin: { type: tp.string, require: true },
  value: { type: tp.number, require: true },
  payMethod: { type: tp.string, require: true }
}

export const HistoryMD = setModel("history");
export const HistoryRP = new Repository("history", HistoryMD, params);
