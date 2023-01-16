/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { v4 as uuid } from 'uuid';

import * as QuoteIT from '../interface/quote';

import * as CoinSV from './coin';
import * as PayMethodSV from './payMethod';
import * as ConversionRateSV from './conversionRate';


/*
* Cria a cotação a partir do dados recebidos
*/
export async function createQuote(res, quoteReq: QuoteIT.quoteReq): Promise<QuoteIT.dbQuote> {
  const payMethodRate = await PayMethodSV.getPayMethodRate(res, quoteReq.payMethod); if (payMethodRate == null) return;
  const conversionRate = await ConversionRateSV.getQuoteRate(quoteReq.value);
  const conversionCoinValue = await CoinSV.getConversionValue(res, quoteReq.coin); if (conversionCoinValue == null) return;
  const payMethodRateValue = Math.ceil(quoteReq.value * payMethodRate) / 100;
  const conversionRateValue = Math.ceil(quoteReq.value * conversionRate) / 100;
  const netValue = quoteReq.value - (conversionRateValue + payMethodRateValue);
  return {
    id: uuid(),
    coin: quoteReq.coin,
    value: quoteReq.value,
    payMethod: quoteReq.payMethod,
    conversionCoinValue: conversionCoinValue,
    payMethodRate: payMethodRate,
    conversionRate: conversionRate,
    payMethodRateValue: payMethodRateValue,
    conversionRateValue: conversionRateValue,
    netValue: netValue,
    coinValue: Math.floor(100 * netValue / conversionCoinValue) / 100,
    createdAt: Date.now()
  };
}