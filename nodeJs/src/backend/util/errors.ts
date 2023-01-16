/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

export function insufficientParameters(): Error {
  const error = new Error('Failed! Insufficient parameters!');
  error.name = 'INSUFFICIENT-PARAMETERS';
  return error;
}
export function invalidParamType(obj: string): Error {
  const error = new Error(`Failed! Invalid parameters "${obj}" type!`);
  error.name = 'INVALID-PARAMETER-TYPE';
  return error;
}
export function notFound(obj: string, msg: string = null): Error {
  const error = new Error(`Failed! ${msg == null ? obj : msg} not found!`);
  error.name = `${obj.toUpperCase().replace(' ', '-')}-NOT-FOUND`;
  return error;
}
export function isEmpty(obj: string, msg: string = null): Error {
  const error = new Error(`Failed! ${msg == null ? obj : msg} is empty!`);
  error.name = `${obj.toUpperCase().replace(' ', '-')}-EMPTY`;
  return error;
}
export function isUnavailable(obj: string, msg: string = null): Error {
  const error = new Error(`Failed! This ${msg == null ? obj : msg} is already in use!`);
  error.name = `${obj.toUpperCase().replace(' ', '-')}-UNAVAILABLE`;
  return error;
}
export function isInvalid(obj: string, msg: string = null): Error {
  const error = new Error(`Failed! Invalid ${msg == null ? obj : msg}!`);
  error.name = `INVALID-${obj.toUpperCase().replace(' ', '-')}`;
  return error;
}
export function fmdrSave(): Error {
  const error = new Error('Failed! Cannot save object! Missing keep on get object!');
  error.name = 'FMDR-ERROR';
  return error;
}
export function custom(name, message): Error {
  const error = new Error(message);
  error.name = name;
  return error;
}
export function python(): Error {
  const error = new Error('Failed! Python!');
  error.name = 'PYTHON-ERROR';
  return error;
}
