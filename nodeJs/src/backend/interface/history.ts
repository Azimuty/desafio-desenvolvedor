/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { dbQuote } from './quote';


export interface dbHistory {
  id: string;
  userId: string;
  quotes: dbQuote[];
};
