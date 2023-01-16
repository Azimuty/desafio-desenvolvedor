/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import * as UserIT from '../interface/user';

import { getToken } from '../util/middleware';


/*
* Adiciona token e remove a senha
*/
export function output(user: UserIT.dbUser): UserIT.userRes {
  user['token'] = getToken(user.id);
  delete user.password;
  return user as UserIT.userRes;
}