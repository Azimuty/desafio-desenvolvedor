/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import AzDoc from "azdoc";

export default function quote(doc: AzDoc) {
  doc.addGroup({
    name: "Cotação",
    endpoints: [
      {
        description: "Obter lista de moedas e formas de pagamento",
        method: "get",
        url: "/quote-data",
        authorization: true,
        response: { contents: quoteData }
      },
      {
        description: "Obter histórico de cotações",
        method: "get",
        url: "/quote",
        authorization: true,
        response: { isArray: true, contents: quoteRes }
      },
      {
        description: "Adicionar nova cotação",
        method: "post",
        url: "/quote",
        authorization: true,
        request: { contents: quoteReq },
        response: { contents: quoteRes }
      }
    ]
  });
}

const quoteData = {
  coins: {
    USD: "Dolar Americano",
    EUR: "Euro",
    '"coin"': "string"
  },
  payMethods: {
    ticket: { name: "Boleto", rate: "1.45" },
    creditCard: { name: "Cartão de Crédito", rate: "7.63" },
    '"paymethod"': { name: "string", rate: "number" }
  }
};

const quoteReq = {
  coin: "string (USD, EUR, ...)",
  value: "number",
  payMethod: "string (ticket, creditCard, ...)"
};

const quoteRes = {
  id: "uuid",
  coin: "string (USD, EUR, ...) - Moeda de destino",
  value: "number - Valor para conversão",
  payMethod: "string (ticket, creditCard, ...) - Forma de pagamento",
  conversionCoinValue: "number - Valor da \"Moeda de destino\" usado para conversão",
  payMethodRate: "number - Taxa de pagamento %",
  conversionRate: "number - Taxa de conversão %",
  coinValue: "number - Valor comprado em \"Moeda de destino\"",
  payMethodRateValue: "number - Taxa de pagamento R$",
  conversionRateValue: "number - Taxa de conversão R$",
  netValue: "number - Valor utilizado para conversão descontando as taxas"
}