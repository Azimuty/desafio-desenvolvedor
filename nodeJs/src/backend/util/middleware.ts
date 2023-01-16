/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { onUnauthorized, onError } from './handlers';

import { UserRP } from "../model/user";

import { getEnv } from './dotenv';


const logguedUsers = {};

const tokenSecret = getEnv('TOKEN_SECRET', 'MyTG33ZJhnTAB5HRXt');
const tokenTime = Number(getEnv('TOKEN_TIME', '86400'));


export async function verifyToken(req, res, next = null) { try {

  // Authorization header param verify
  const authorization = req.headers.authorization;
  if (!authorization) { return onUnauthorized(res); }
  const token = authorization.replace("Bearer ", "");

  // Token Verify
  let decoded = null;
  try { decoded = await jwt.verify(token, tokenSecret); } catch (err) { onUnauthorized(res); return; }
  if (!decoded) { onUnauthorized(res); return; }
  const userId = decoded.id;
  
  // User Verify
  if (!(userId in logguedUsers)) {
    const user = await UserRP.getOneById(res, userId, {}, false); if (res.writableEnded) return;
    logguedUsers[user.id] = user; }
  req["user"] = logguedUsers[userId];
  
  if (next != null) next();
} catch (err) { onError(res, err); }
}


export function getToken(userId: string): string {
  return jwt.sign({ id: userId }, tokenSecret, { expiresIn: tokenTime });
}

export async function cryptPass(password: string): Promise<string> {
  return await bcrypt.hash(password,8);
}

export async function isValidPass(password: string, encryptedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, encryptedPassword);
}

export async function userLogout(userId: string) {
  delete logguedUsers[userId];
}