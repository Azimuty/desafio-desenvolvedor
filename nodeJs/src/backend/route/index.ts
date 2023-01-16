/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { Router } from "express";

import Auth from "./auth";
import User from "./user";
import Quote from "./quote";


export default async function register(router: Router): Promise<void> {
  await Auth(router);
  await User(router);
  await Quote(router);
}