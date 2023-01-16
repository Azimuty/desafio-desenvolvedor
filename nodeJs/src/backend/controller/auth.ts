/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { onSuccess, onError, onBadRequest } from '../util/handlers';
import { userLogout, isValidPass } from '../util/middleware';
import { VerifyObj, tp } from '../util/repository';
import * as errors from '../util/errors';

import * as AuthIT from '../interface/auth';
import * as UserIT from '../interface/user';

import { UserRP } from '../model/user';

import * as UserSV from '../service/user';

/*
* (POST) /login - Efetuar login no sistema
*/
export async function login(req, res) {
  try {
    const loginReq: AuthIT.loginReq = VerifyObj(res, req.body, {
      email: { type: tp.string, require: true },
      password: { type: tp.string, require: true }
    }); if (res.writableEnded) return;
    const dbUser: UserIT.dbUser = await UserRP.getOne({ email: loginReq.email });
    if (dbUser == null) { onBadRequest(res, errors.notFound('User')); return; }
    if (!(await isValidPass(loginReq.password, dbUser.password))) { onBadRequest(res, errors.isInvalid('Password')); return; }
    const userRes = UserSV.output(dbUser);
    onSuccess(res, userRes);
  } catch(err) {
    onError(res, err);
  }
}

/*
* (GET) /logoff - Efetuar logoff no sistema
*/
export async function logout(req, res) {
  try {
    userLogout(req.user.id);
    onSuccess(res, {});
  } catch(err) {
    onError(res, err);
  }
}