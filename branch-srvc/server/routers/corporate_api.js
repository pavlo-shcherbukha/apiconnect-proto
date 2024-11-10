import express from 'express';
import {ValidationError, ApplicationError, ServerError,AxiosError, ErrorHandler} from '../error/appError.js';

/**
 * Роутер - для рооти за corporate API
 * Управляє довідником корпорацій
 * 
 * 
 * @param {*} app 
 */
export default function corporate_api (app) {
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
              res_err.Error.target="corporate-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });
    router.get('/', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:corporate' });
        try{
            log.info(`HTTP Request: Method: ${req.method} BaseUrl: ${req.baseUrl} `);
            log.info("=========================================================================")
            log.info(`HTTP Request.Headers: ${JSON.stringify(req.headers)}`);
            log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            log.info(`HTTP Request.Body: ${JSON.stringify(req.body)}} `);
            log.info(`HTTP Request.Params: ${ JSON.stringify(req.params)}`)
            log.info("=========================================================================")
            let dbsrvc = app.get("cloudantdb")
            let corporateList = await dbsrvc.readCorporateList();
            log.verbose(`Отримано corporate:  ${JSON.stringify(corporateList)}`)
            let resp = corporateList;
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
              res_err.Error.target="corporate-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });
    router.get('/:corporateid', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:corporate' });

        try{
            log.info(`HTTP Request: Method: ${req.method} BaseUrl: ${req.baseUrl} `);
            log.info("=========================================================================")
            log.info(`HTTP Request.Headers: ${JSON.stringify(req.headers)}`);
            log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            log.info(`HTTP Request.Body: ${JSON.stringify(req.body)}} `);
            log.info(`HTTP Request.Params: ${ JSON.stringify(req.params)}`)
            log.info("=========================================================================")
            let corporateid=req.params.corporateid
            let dbsrvc = app.get("cloudantdb")
            log.verbose(`Читаю дані корпорації по corporateid:  ${corporateid}`)
            let corporate = await dbsrvc.readCorporatebyid( {"corporateid":corporateid} );
            log.verbose(`Отримано corporate:  ${JSON.stringify(corporate)}`)
            let resp = corporate;
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
              res_err.Error.target="corporate-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });

    router.delete('/:corporateid', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:corporate' });

        try{
            log.info(`HTTP Request: Method: ${req.method} BaseUrl: ${req.baseUrl} `);
            log.info("=========================================================================")
            log.info(`HTTP Request.Headers: ${JSON.stringify(req.headers)}`);
            log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            log.info(`HTTP Request.Body: ${JSON.stringify(req.body)}} `);
            log.info(`HTTP Request.Params: ${ JSON.stringify(req.params)}`)
            log.info("=========================================================================")
            let corporateid=req.params.corporateid
            let dbsrvc = app.get("cloudantdb")
            log.verbose(`Читаю дані корпорації по corporateid:  ${corporateid}`)
            let deleteresult = await dbsrvc.deleteCorporatebyid( {"corporateid":corporateid} );
            log.verbose(`Отримано corporate:  ${JSON.stringify(deleteresult)}`)
            let resp = deleteresult;
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
              res_err.Error.target="corporate-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });

    router.options('/', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:corporate' });
        try{
            log.info(`HTTP Request: Method: ${req.method} BaseUrl: ${req.baseUrl} `);
            log.info("=========================================================================")
            log.info(`HTTP Request.Headers: ${JSON.stringify(req.headers)}`);
            log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            log.info(`HTTP Request.Body: ${JSON.stringify(req.body)}} `);
            log.info(`HTTP Request.Params: ${ JSON.stringify(req.params)}`)
            log.info("=========================================================================")


            log.verbose(`Відправляю успішну відповідь`);
            return res.status(200).end();  
                                             
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
              res_err.Error.target="corporate-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });


    app.use('/corporate-api/corporate', router);
}

