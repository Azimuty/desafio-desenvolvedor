/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { onBadRequest } from '../util/handlers';
import * as errors from '../util/errors';
import * as ls from '../util/localStorage';


let payMethodsData = null;

/*
* Retorna a taxa referente ao método de pagamento selecionado.
*/
export async function getPayMethodRate(res, payMethod: string): Promise<number> {
  if (payMethodsData == null) await getPayMethodData();
  if (!(payMethod in payMethodsData)) { onBadRequest(res, errors.isInvalid("Pay Method")); return null; }
  return payMethodsData[payMethod].rate;
}

/*
* Retorna os métodos de pagamento, com nome e taxa
*/
export async function getPayMethodData() {
  if (payMethodsData == null) {
    payMethodsData = await ls.getLS('PayMethods');
    if (payMethodsData == null) {
      payMethodsData = {
        ticket: { name: "Boleto", rate: 1.45 },
        creditCard: { name: "Cartão de Crédito", rate: 7.63 }
      };
      await ls.setLS('PayMethods', payMethodsData);
    }
  }
  return payMethodsData;
}