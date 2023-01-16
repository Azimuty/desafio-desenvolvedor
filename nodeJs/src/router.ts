/*******************************************************************************
 ** Developed by RDL - Renato De Almeida Faria
 ** Copyright (c) 2021 Certi
 ** All rights reserved.
 ********************************************************************************/

import * as express from 'express';

import backend from './backend/route';
import frontend from './frontend/routes';
 import doc from './backend/util/azdoc';

export function setupRouter(): express.Router {
  const router = express.Router();

  backend(router);
  frontend(router);
  doc(router);

  return router;
}

export default setupRouter;
