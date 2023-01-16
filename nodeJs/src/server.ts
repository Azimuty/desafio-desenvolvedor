/*******************************************************************************
 ** Developed by RDL - Renato De Almeida Faria
 ** Copyright (c) 2021 Certi
 ** All rights reserved.
 ********************************************************************************/

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';

import setupRouter from './router';

import { getCoins } from './backend/service/coin';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/frontend/views'));
app.use(express.static(__dirname + '/frontend/public'));

app.use(cors({ origin: '*' }));

app.use(bodyParser.json({ limit: '1mb' }));

app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

app.use('/', setupRouter());

getCoins();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
