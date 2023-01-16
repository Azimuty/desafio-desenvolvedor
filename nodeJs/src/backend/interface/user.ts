/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

export interface dbUser {
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface dbUserReq {
  name: string;
  email: string;
  password: string;
};

export interface userRes {
  id: string;
  name: string;
  email: string;
};

export interface loginUser {
  id: string;
  name: string;
  email: string;
  token: string;
};