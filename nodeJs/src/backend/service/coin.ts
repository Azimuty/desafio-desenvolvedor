/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { onBadRequest } from '../util/handlers';
import * as errors from '../util/errors';
import Api from '../util/api';

export let coins = {};

/*
* Acessa a url, filtra as conversões possíveis que comecem com BRL
*/
export async function getCoins() {
  const coinRes = await Api('https://economia.awesomeapi.com.br/json/available', 'GET');
  if (coinRes.status != 200) {
    console.log('FATAL ERROR: Cannot get coin list.');
    process.exit();
  }
  for (const key of Object.keys(coinRes.data)) {
    if (key.substring(0,3) == "BRL")
      coins[key.substring(4)] = coinRes.data[key].split('/')[1];
  }
}

/*
* Retorna o valor de conversão para a moeda selecionada.
*/
export async function getConversionValue(res, coin: string): Promise<number> {
  if (!(coin in coins)) { onBadRequest(res, errors.isInvalid("Coin")); return null; }
  const conversionRes = await Api(`https://economia.awesomeapi.com.br/json/last/BRL-${coin}`, 'GET');
  if (conversionRes.status != 200) { onBadRequest(res, errors.isUnavailable("Convertion Api")); return null; }
  return Math.ceil(100 * (1 / Number(conversionRes.data[Object.keys(conversionRes.data)[0]].bid))) / 100;
}