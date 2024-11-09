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
import {CloudantSrvc} from './services/cloudant_srvc.js'

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



app.set('cld_url',process.env.CLOUDANT_URL);
app.set('cld_apikey',process.env.CLOUDANT_APIKEY);
app.set('cld_dbname',process.env.STORAGE_DBNAME);




applogger.debug("==========================================================================")
applogger.debug(`URL бази даних: ${app.get("cld_url")}`)
applogger.debug(`Назва бази даних: ${app.get("cld_dbname")}`)
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

const cloudant = new CloudantSrvc( app )
app.set( "cloudantdb",cloudant)


// ===== loggin req=resp


app.use((req, res, next) => {
    const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'http-req-log' });
    res.header({    "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "DELETE,GET,PATCH,POST,PUT",
      "Content-Type": "application/json; charset=utf-8"
    });  

    let lhttp_req = {  
      originalUrl: req.baseURL,
      baseUrl: req.baseURL,
      path: req.url,
      parms: req.params,
      query: req.query,
      method: req.method,
      headers: req.headers,
      Time: new Date()
    };
    let msg= `http Request: ^${JSON.stringify(lhttp_req)}^`
    log.http(msg);
    next();



});

  

// === app routers ============================
import health from './routers/health.js';
import branch from './routers/branch.js';
import corporate from './routers/corporate.js';



health(app)
branch(app)
corporate(app)


// ============================================





server.listen(appport, function () {
  applogger.info(`listening on http://${apphost}:${appport}`);

});



