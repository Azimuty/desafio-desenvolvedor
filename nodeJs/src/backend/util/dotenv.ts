/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import * as dotenv from 'dotenv';
dotenv.config();

export function getEnv(env, defaultValue, slashEnd = false) {
  let value = env in process.env ? process.env[env] : defaultValue;
  if (slashEnd && value.charAt(value.length - 1) != '/') value += '/';
  if (typeof defaultValue == 'boolean' && typeof value != 'boolean') value = value.toLowerCase() == 'true';
  return value;
}
