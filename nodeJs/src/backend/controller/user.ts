/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { onSuccess, onError } from '../util/handlers';
import { cryptPass } from '../util/middleware';

import * as UserIT from '../interface/user';

import { UserRP } from '../model/user';

import * as UserSV from '../service/user';


/*
* (POST) /create - Cadastrar novo usuário
*/
export async function create(req, res) {
  try {
    const body: UserIT.dbUserReq = req.body;
    const dbUser: UserIT.dbUser = await UserRP.create(res, body); if (res.writableEnded) return;
    dbUser.password = await cryptPass(dbUser.password);
    await UserRP.save(res, dbUser);
    const userRes = UserSV.output(dbUser);
    onSuccess(res, userRes);
  } catch(err) {
    onError(res, err);
  }
}