/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import AzDoc from 'azdoc';

import wrapper from '../doc';
import { onError, onHtml } from './handlers';

let html = '';

export default function doc(router) {
  const doc = new AzDoc('Desafio Desenvolvedor');
  wrapper(doc);
  html = doc.html();
  router.route('/api/doc').get((req, res) => {
    try {
      onHtml(res, 'text/html', html, 'utf-8');
    } catch (err) {
      onError(res, err);
    }
  });
}
