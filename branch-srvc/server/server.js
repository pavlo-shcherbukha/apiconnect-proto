import http from "http";
import express from 'express';
import cookieParser  from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import query from 'querystring';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import multiparty from 'multiparty';
import format from 'util';
import  FormData  from 'form-data';
import fs from 'fs';
import path  from 'path';
import axios from 'axios';
import useragent from 'express-useragent';
import {logger}  from './config/winston.js';
import morgan from'morgan';
import  localconfig from './config/local.json' assert { type: 'json' };
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const apphost=process.env.HOSTNAME||'localhost' 
const appport = process.env.PORT || localconfig.port;
const app = express();
app.set('logger', logger);
app.set('x-powered-by', false);
const applogger = app.get('logger').child({ hostname: process.env.HOSTNAME||'localhost', label: 'app' });
applogger.info("app logger added");

/*
app.set('psp_data',path.join(__dirname, process.env.PSP_DATA));
app.set('psp_img',path.join(__dirname, process.env.PSP_IMG));

app.set('psp_o_data',path.join(__dirname, process.env.PSP_O_DATA));
app.set('psp_o_img',path.join(__dirname, process.env.PSP_O_IMG));
app.set('tax_o_img',path.join(__dirname, process.env.TAX_O_IMG));


app.set('sharing_url',process.env.PSP_URL);
app.set('signature_url',process.env.SIGNATURE_URL);
app.set('diia_acquirer_token',process.env.DIIA_ACQUIRER_TOKEN);
app.set('cryptobaseurl',process.env.CRYPTO_BASE_URL);
app.set('issuer',process.env.ISSUER);
app.set('serial',process.env.SERIAL);
*/
applogger.debug("==========================================================================")
//applogger.debug(`Метаданні по sharing - offLine ${app.get("psp_data")}`)
//applogger.debug(`Бінарний образ документу по sharing - o ${app.get("psp_img")}`)
//applogger.debug(`Метаданні по sharing - onLine ${app.get("psp_o_data")}`)
//applogger.debug(`Каталог бінарних образів паспортів ${app.get("psp_o_img")}`)
//applogger.debug(`Каталог бінарних образів довідки з інд.кодом ${app.get("tax_o_img")}`)
applogger.debug("==========================================================================")



export const server = http.createServer( app);


app.use(useragent.express());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// === app routers ============================
import health from './routers/health.js';
//import diiaauth from './routers/diiaauth.js';
//import sharing_offline from './routers/diia_share_offline.js';
//import sharing_online from './routers/diia_share_online.js';
//import diiasign from './routers/diiasignreq.js';

health(app)
//diiaauth(app)
//sharing_offline(app)
//sharing_online(app)
//diiasign(app)
// ============================================





server.listen(appport, function () {
  applogger.info(`listening on http://${apphost}:${appport}`);

});



