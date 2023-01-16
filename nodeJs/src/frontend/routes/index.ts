/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { Router } from 'express';


export default async function register(router: Router): Promise<void> {
  router.route('/').get(function(req, res) { res.render('pages/auth'); });
  router.route('/cotacao').get(function(req, res) { res.render('pages/quote', { headerButton: 'history' }); });
  router.route('/historico').get(function(req, res) { res.render('pages/history', { headerButton: 'cotacao' }); });
}