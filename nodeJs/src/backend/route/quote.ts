/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { Router } from 'express';

import { verifyToken } from '../util/middleware';

import * as CT from '../controller/quote';


export default async function register(router: Router): Promise<void> {
  router.route('/api/quote-data').get(verifyToken, CT.getData);
  router.route('/api/quote').get(verifyToken, CT.getAll);
  router.route('/api/quote').post(verifyToken, CT.create);
}