/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import fetch from 'node-fetch';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function Api(endpoint, method, reqHeader = {}, reqBody = {}) {
  try {
    const init = {
      method: method,
      headers: reqHeader,
      mode: 'cors',
      cache: 'default',
    };
    init.headers['Accept'] = 'application/json';
    if (method.toUpperCase() != 'GET') {
      init.headers['Content-Type'] = 'application/json';
      init['body'] = JSON.stringify(reqBody);
    }
    const response = await fetch(endpoint, init);
    const resBody = await response.json();
    return { status: response.status, data: resBody };
  } catch (err) {
    return { status: 503, data: {} };
  }
}

export class FakeRes {
  public statusCode = 0;
  public writableEnded = false;
  public status(code) {
    this.statusCode = code;
    this.writableEnded = true;
    return this;
  }

  public data = null;
  public json(obj) {
    this.data = obj;
    if (this.statusCode != 200) console.log(`#####  ${this.statusCode} ${obj}`);
  }
}
