/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import AzDoc from 'azdoc';

import auth from './auth';
import user from './user';
import quote from './quote';

export default function wrapperDoc(doc: AzDoc) {
  auth(doc);
  user(doc);
  quote(doc);
}