/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import * as ls from '../util/localStorage';


let conversionRateData: {
  quoteDivValue: number;
  lowQuoteRate: number;
  hightQuoteRate: number;
} = null;

/*
* Retorna a taxa de conversão baseada no valor
*/
export async function getQuoteRate(value: number): Promise<number> {
  if (conversionRateData == null) {
    conversionRateData = await ls.getLS('ConversionRate');
    if (conversionRateData == null) {
      conversionRateData = {
        quoteDivValue: 3000,
        lowQuoteRate: 1,
        hightQuoteRate: 2
      };
      await ls.setLS('ConversionRate', conversionRateData);
    }
  }
  if (value <= conversionRateData.quoteDivValue) return conversionRateData.hightQuoteRate;
  return conversionRateData.lowQuoteRate;
}