/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { Router } from "express";

import { verifyToken } from '../util/middleware';

import * as CT from "../controller/auth";


export default async function register(router: Router): Promise<void> {
  router.route('/api/login').post(CT.login);
  router.route('/api/logout').get(verifyToken, CT.logout);
}