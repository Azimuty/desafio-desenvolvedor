/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { Router } from "express";

import * as CT from "../controller/user";

export default async function register(router: Router): Promise<void> {
  router.route('/api/user').post(CT.create);
}