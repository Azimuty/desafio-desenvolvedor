/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

export interface quoteReq {
  coin: string;
  value: number;
  payMethod: string;
}

export interface dbQuote {
  id: string;
  coin: string;
  value: number;
  payMethod: string;
  conversionCoinValue: number;
  payMethodRate: number;
  conversionRate: number;
  coinValue: number;
  payMethodRateValue: number;
  conversionRateValue: number;
  netValue: number;
  createdAt: number;
}