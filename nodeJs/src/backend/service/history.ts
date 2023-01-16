/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import * as HistoryIT from '../interface/history';
import * as QuoteIT from '../interface/quote';

import { HistoryRP } from '../model/history';

/*
* Obtem todas as cotações de um usuário
*/
export async function getAllQuotes(userId: string) {
  const dbHistory = await getOneOrCreate(userId);
  return dbHistory.quotes;
}

/*
* Obtem uma cotação do usuário pelo id da cotação
*/
export async function getOneQuoteById(userId: string, quoteId: string) {
  const dbHistory = await getOneOrCreate(userId);
  for (const quote of dbHistory.quotes)
    if (quote.id == quoteId)
      return quote;
  return null;
}

/*
* OAdiciona uma nova cotação ao histórico
*/
export async function addQuote(userId: string, quote: QuoteIT.dbQuote) {
  const dbHistory = await getOneOrCreate(userId);
  dbHistory.quotes.push(quote);
  await HistoryRP.save({}, dbHistory);
}

/*
* Obtem histórico de cotações do usuário ou cria um se não existir
*/
async function getOneOrCreate(userId: string): Promise<HistoryIT.dbHistory> {
  let history = await HistoryRP.getOne({ userId: userId });
  if (history == null) {
    history = await HistoryRP.create({}, {
      userId: userId,
      quotes: []
    });
  }
  return history;
}