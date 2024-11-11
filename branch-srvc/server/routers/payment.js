import express from 'express';
import {ValidationError, ApplicationError, ServerError,AxiosError, ErrorHandler} from '../error/appError.js';

/**
 * Роутер - для рооти за corporate API
 * Управляє довідником  бренчів корпорацій
 * 
 * 
 * @param {*} app 
 */
export default function payment (app) {
    const router = express.Router();
    const logger = app.get('logger');
    router.put('/', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:payment' });

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
            let paymentid = await dbsrvc.createPayment( {  "payment": req.body });
            log.verbose(`Отримано paymentid:  ${paymentid}`)
            let resp={ "paymentid":  paymentid  };
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
              res_err.Error.target="payment-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });
    router.get('/:paymentid', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:payment' });
        try{
            log.info(`HTTP Request: Method: ${req.method} BaseUrl: ${req.baseUrl} `);
            log.info("=========================================================================")
            log.info(`HTTP Request.Headers: ${JSON.stringify(req.headers)}`);
            log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            log.info(`HTTP Request.Body: ${JSON.stringify(req.body)}} `);
            log.info(`HTTP Request.Params: ${ JSON.stringify(req.params)}`)
            log.info("=========================================================================")
            let dbsrvc = app.get("cloudantdb")
            let payment = await dbsrvc.readPayment({"paymentid": req.params.paymentid});
            log.verbose(`Отримано payment:  ${JSON.stringify( payment )}`)
            let resp = payment;
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
              res_err.Error.target="payment-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });
    router.get('/status/:paymentid', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:payment' });

        try{
            log.info(`HTTP Request: Method: ${req.method} BaseUrl: ${req.baseUrl} `);
            log.info("=========================================================================")
            log.info(`HTTP Request.Headers: ${JSON.stringify(req.headers)}`);
            log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            log.info(`HTTP Request.Body: ${JSON.stringify(req.body)}} `);
            log.info(`HTTP Request.Params: ${ JSON.stringify(req.params)}`)
            log.info("=========================================================================")
            let paymentid=req.params.paymentid
            
            let dbsrvc = app.get("cloudantdb")
            log.verbose(`Читаю status по paymentid:  ${paymentid} `)
            let status = await dbsrvc.readPaymentStatus( {"paymentid":paymentid} );
            log.verbose(`Отримано branch:  ${status}`)
            let resp = {"status": status};
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
              res_err.Error.target="payment-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });


    router.options('/', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:payment' });
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
              res_err.Error.target="payment-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });



    app.use('/payment-api/payment', router);
}

