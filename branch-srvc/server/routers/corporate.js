import express from 'express';
import {ValidationError, ApplicationError, ServerError,AxiosError, ErrorHandler} from '../error/appError.js';
//import {Sharing, SharingOnLine} from '../services/sharing_srvc.js';

/**
 * Роутер - для рооти за corporate API
 * Управляє довідником корпорацій
 * 
 * 
 * @param {*} app 
 */
export default function corporate (app) {
    const router = express.Router();
    const logger = app.get('logger');
    router.put('/', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:corporate' });

        try{
            log.info("=========================================================================")
            log.info(`HTTP Request: Method: ${req.method} BaseUrl: ${req.baseUrl} `);
            log.info("=========================================================================")
            log.info(`HTTP Request.Headers: ${JSON.stringify(req.headers)}`);
            log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            log.info(`HTTP Request.Body: ${JSON.stringify(req.body)}} `);
            log.info(`HTTP Request.Params: ${ JSON.stringify(req.params)}`)
            log.info("=========================================================================")
            let dbsrvc = app.get("cloudantdb")
            let corporateid = await dbsrvc.createCorporate(req.body);
            log.verbose(`Отримано corporateid:  ${corporateid}`)
            let resp={ "corporateid":  corporateid  };
            log.verbose(`Відправляю успішну відповідь ${JSON.stringify(resp)}`)
            return res.status(200).json(resp)                                              
        }
        catch( err){
            let res_err;
            let res_status_code=422
            if( err instanceof ValidationError){
                res_status_code=err.status_code
                res_err=ErrorHandler(err)
            } else if(err instanceof ApplicationError){
                res_status_code=err.status_code
                res_err=ErrorHandler(err)
            } else if(err instanceof ServerError){
                res_status_code=err.status_code 
                res_err=ErrorHandler(err)
            } else if( err instanceof AxiosError){
                res_status_code=err.status
                res_err=ErrorHandler(err)
            } else {
              res_err= ErrorHandler(err)
              res_err.Error.code="InternalError"
              res_err.Error.target="branch-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });
    router.get('/', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:corporate' });

        try{
                //let resp={ "deeplink": "https://deeplink/test" };
                //log.info('health router send response')
                //let docreq = req.body;
                //log.info('Запит: ' + JSON.stringify(docreq));
                //let resp={ "deeplink": "https://deeplink/testmodel"  };
                //log.info('Створюю клас SharingOnLine')
                //let sharing = new SharingOnLine(app);
                //log.info('Створюю метадані')
                //await sharing.createMetaData();
                //log.info('Обробляю метадін та вкладені файли')
                //await sharing.processMetaData();
                //log.info('Відправляю в банк')
                //sharing.sendToBank( docreq.requestId);
            
            let resp={ "ok": true  };
            log.info('GET req Відправляю успішну відповідь')

          return res.status(200).json(resp)                                              
        }
        catch( err){
            let res_err;
            let res_status_code=422
            if( err instanceof ValidationError){
                res_status_code=err.status_code
                res_err=ErrorHandler(err)
            } else if(err instanceof ApplicationError){
                res_status_code=err.status_code
                res_err=ErrorHandler(err)
            } else if(err instanceof ServerError){
                res_status_code=err.status_code 
                res_err=ErrorHandler(err)
            } else if( err instanceof AxiosError){
                res_status_code=err.status
                res_err=ErrorHandler(err)
            } else {
              res_err= ErrorHandler(err)
              res_err.Error.code="InternalError"
              res_err.Error.target="branch-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });
    router.get('/:corporateid', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:corporate' });

        try{
                //let resp={ "deeplink": "https://deeplink/test" };
                //log.info('health router send response')
                //let docreq = req.body;
                //log.info('Запит: ' + JSON.stringify(docreq));
                //let resp={ "deeplink": "https://deeplink/testmodel"  };
                //log.info('Створюю клас SharingOnLine')
                //let sharing = new SharingOnLine(app);
                //log.info('Створюю метадані')
                //await sharing.createMetaData();
                //log.info('Обробляю метадін та вкладені файли')
                //await sharing.processMetaData();
                //log.info('Відправляю в банк')
                //sharing.sendToBank( docreq.requestId);
            
            let resp={ "ok": true  };
            log.info(`GET req Відправляю успішну відповідь ${req.params.branchid}`)

          return res.status(200).json(resp)                                              
        }
        catch( err){
            let res_err;
            let res_status_code=422
            if( err instanceof ValidationError){
                res_status_code=err.status_code
                res_err=ErrorHandler(err)
            } else if(err instanceof ApplicationError){
                res_status_code=err.status_code
                res_err=ErrorHandler(err)
            } else if(err instanceof ServerError){
                res_status_code=err.status_code 
                res_err=ErrorHandler(err)
            } else if( err instanceof AxiosError){
                res_status_code=err.status
                res_err=ErrorHandler(err)
            } else {
              res_err= ErrorHandler(err)
              res_err.Error.code="InternalError"
              res_err.Error.target="branch-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });

    router.delete('/:corporate', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:corporate' });

        try{
                //let resp={ "deeplink": "https://deeplink/test" };
                //log.info('health router send response')
                //let docreq = req.body;
                //log.info('Запит: ' + JSON.stringify(docreq));
                //let resp={ "deeplink": "https://deeplink/testmodel"  };
                //log.info('Створюю клас SharingOnLine')
                //let sharing = new SharingOnLine(app);
                //log.info('Створюю метадані')
                //await sharing.createMetaData();
                //log.info('Обробляю метадін та вкладені файли')
                //await sharing.processMetaData();
                //log.info('Відправляю в банк')
                //sharing.sendToBank( docreq.requestId);
            
            let resp={ "ok": true  };
            log.info(`DELETE req Відправляю успішну відповідь ${req.params.branchid} `)

          return res.status(200).json(resp)                                              
        }
        catch( err){
            let res_err;
            let res_status_code=422
            if( err instanceof ValidationError){
                res_status_code=err.status_code
                res_err=ErrorHandler(err)
            } else if(err instanceof ApplicationError){
                res_status_code=err.status_code
                res_err=ErrorHandler(err)
            } else if(err instanceof ServerError){
                res_status_code=err.status_code 
                res_err=ErrorHandler(err)
            } else if( err instanceof AxiosError){
                res_status_code=err.status
                res_err=ErrorHandler(err)
            } else {
              res_err= ErrorHandler(err)
              res_err.Error.code="InternalError"
              res_err.Error.target="branch-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });

    app.use('/corporate-api/corporate', router);
}

