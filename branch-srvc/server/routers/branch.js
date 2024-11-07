import express from 'express';
import {ValidationError, ApplicationError, ServerError,AxiosError, ErrorHandler} from '../error/appError.js';
//import {Sharing, SharingOnLine} from '../services/sharing_srvc.js';

/**
 * Роутер - запит на отримання deeplink
 * для отримання документиів по sharing online
 * 
 * 
 * @param {*} app 
 */
export default function sharing_online (app) {
    const router = express.Router();
    const logger = app.get('logger');
    router.post('/', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:sharing_online' });

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
            log.info('POST req Відправляю успішну відповідь')

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
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:sharing_online' });

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
    router.get('/:branchid', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:sharing_online' });

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

    router.delete('/:branchid', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:sharing_online' });

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

    app.use('/api/branch', router);
}

