/*******************************************************************************
** Desafio Desenvolvedor
** Developed by Renato De Almeida Faria.
********************************************************************************/

import { Response } from 'express';
import * as stream from 'stream';
// import { logger } from "./logger";

export function onSuccess(res: Response, data?: object): void {
  if (res.writableEnded) return;
  if (Array.isArray(data))
    for (const key in data) {
      if (typeof data[key] == 'object' && 'dbObj' in data[key]) delete data[key]['dbObj'];
    }
  else if (data != null && 'dbObj' in data) delete data['dbObj'];
  res.status(200).json(data);
}

export function onCreated(res: Response, data?: object): void {
  res.status(201).json(data);
}

export function onBadRequest(res: Response, error: Error): void {
  if (res.writableEnded) return;
  if (error.name == 'SequelizeHostNotReachableError') onNotReachableDB(res);
  else res.status(400).json({ error: error.name, message: error.message });
}

export function onUnauthorized(res: Response): void {
  res.status(401).json({ error: 'Unauthorized' });
}

export function onNotFound(res: Response): void {
  res.status(404).json({ error: 'NotFound' });
}

export function onError(res: Response, error: Error): void {
  //   if (process.env.NODE_ENV !== "test") logger.error(JSON.stringify(error));
  console.log(error);
  if (res.writableEnded) return;
  if (error.name == 'SequelizeHostNotReachableError') onNotReachableDB(res);
  else res.status(500).json(error);
}

export function onNotReachableDB(res: Response): void {
  res.status(503).json({ error: 'NOT-REACHABLE-DB', message: 'Not Reachable Database' });
}

export function onBufferDownload(res: Response, fileName: string, mimeType: string, buffer: Buffer): void {
  const readStream = new stream.PassThrough();
  readStream.end(buffer);
  res.set('Content-disposition', `attachment; filename=${fileName}`);
  res.set('Content-Type', mimeType);
  readStream.pipe(res);
}

export function onHtml(res: Response, mimeType = 'text/html', fileContents: string | Buffer, encoding: BufferEncoding) {
  const buffer = Buffer.isBuffer(fileContents) ? fileContents : Buffer.from(fileContents, encoding);
  res.set('Content-Type', mimeType);
  res.send(buffer);
}