/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

export function getObjKeyByValue(obj: any, value: any) {
  for (const key of obj)
    if (obj[key] == value)
      return key;
  return null;
}