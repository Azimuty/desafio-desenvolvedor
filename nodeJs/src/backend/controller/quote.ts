/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { onSuccess, onError, onBadRequest } from '../util/handlers';
import { VerifyObj } from '../util/repository';
import * as errors from '../util/errors';

import * as QuoteIT from '../interface/quote';

import { quoteParams } from '../model/history';

import * as HistorySV from '../service/history';
import * as QuoteSV from '../service/quote';
import * as CoinSV from '../service/coin';
import * as PayMethodSV from '../service/payMethod';


/*
* (GET) /quote-data - Obter lista de moedas e formas de pagamento
*/
export async function getData(req, res) {
  try {
    onSuccess(res, {
      coins: CoinSV.coins,
      payMethods: await PayMethodSV.getPayMethodData()
    });
  } catch(err) {
    onError(res, err);
  }
}

/*
* (GET) /quote - Obter histórico de cotações
*/
export async function getAll(req, res) {
  try {
    const dbQuotes = await HistorySV.getAllQuotes(req.user.id);
    onSuccess(res, dbQuotes);
  } catch(err) {
    onError(res, err);
  }
}

/*
* (POST) /quote - Adicionar nova cotação
*/
export async function create(req, res) {
  try {
    const quoteReq: QuoteIT.quoteReq = VerifyObj(res, req.body, quoteParams);
    if (res.writableEnded) return;
    if (quoteReq.value < 1000) { onBadRequest(res, errors.isInvalid('Value < R$ 1000')); return; }
    if (quoteReq.value > 100000) { onBadRequest(res, errors.isInvalid('Value > R$ 100.000')); return; }
    const quote = await QuoteSV.createQuote(res, quoteReq);
    await HistorySV.addQuote(req.user.id, quote);
    onSuccess(res, quote);
  } catch(err) {
    onError(res, err);
  }
}