/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import AzDoc from "azdoc";

export default function user(doc: AzDoc) {
  doc.addGroup({
    name: "User",
    endpoints: [
      {
        description: "Cadastrar novo usuário",
        method: "post",
        url: "/api/user",
        request: { contents: userReq },
        response: { contents: userRes }
      }
    ]
  });
}

const userReq = {
  name: "string",
  email: "string",
  password: "string"
};

export const userRes = {
  id: "uuid",
  name: "string",
  email: "string",
  password: "string",
  token: "string"
}