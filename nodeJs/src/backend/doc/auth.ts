/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import AzDoc from "azdoc";

import { userRes } from "./user";


export default function auth(doc: AzDoc) {
  doc.addGroup({
    name: "Autenticação",
    endpoints: [
      {
        description: "Efetuar login no sistema",
        method: "post",
        url: "/api/login",
        request: { contents: loginReq },
        response: { contents: userRes }
      },
      {
        description: "Efetuar logoff no sistema",
        method: "get",
        url: "/api/logoff",
        authorization: true
      }
    ]
  });
}

const loginReq = {
  email: "string",
  password: "string"
};