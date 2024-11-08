import express from 'express';
import {ValidationError, ApplicationError, ServerError,AxiosError, ErrorHandler} from '../error/appError.js';

/**
 * Роутер - для рооти за corporate API
 * Управляє довідником  бренчів корпорацій
 * 
 * 
 * @param {*} app 
 */
export default function branch (app) {
    const router = express.Router();
    const logger = app.get('logger');
    router.put('/:corporateid', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:branch' });

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
            let branchid = await dbsrvc.createBranch( { "corporateid": req.params.corporateid , "branch": req.body });
            log.verbose(`Отримано corporateid:  ${branchid}`)
            let resp={ "branchid":  branchid  };
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
    router.get('/:corporateid', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:branch' });
        try{
            log.info(`HTTP Request: Method: ${req.method} BaseUrl: ${req.baseUrl} `);
            log.info("=========================================================================")
            log.info(`HTTP Request.Headers: ${JSON.stringify(req.headers)}`);
            log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            log.info(`HTTP Request.Body: ${JSON.stringify(req.body)}} `);
            log.info(`HTTP Request.Params: ${ JSON.stringify(req.params)}`)
            log.info("=========================================================================")
            let dbsrvc = app.get("cloudantdb")
            let branchList = await dbsrvc.readBranchList({"corporateid": req.params.corporateid});
            log.verbose(`Отримано branches list:  ${JSON.stringify(branchList)}`)
            let resp = branchList;
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
    router.get('/:corporateid/:branchid', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:branch' });

        try{
            log.info(`HTTP Request: Method: ${req.method} BaseUrl: ${req.baseUrl} `);
            log.info("=========================================================================")
            log.info(`HTTP Request.Headers: ${JSON.stringify(req.headers)}`);
            log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            log.info(`HTTP Request.Body: ${JSON.stringify(req.body)}} `);
            log.info(`HTTP Request.Params: ${ JSON.stringify(req.params)}`)
            log.info("=========================================================================")
            let corporateid=req.params.corporateid
            let branchid=req.params.branchid
            let dbsrvc = app.get("cloudantdb")
            log.verbose(`Читаю дані branch по corporateid:  ${corporateid} branchid: ${branchid}`)
            let branch = await dbsrvc.readBranchbyid( {"corporateid":corporateid, "branchid": branchid} );
            log.verbose(`Отримано branch:  ${JSON.stringify(branch)}`)
            let resp = branch;
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

    router.delete('/:corporateid/:branchid', async function(req, res, next) {
        const log = logger.child({ hostname: process.env.HOSTNAME||'localhost', label: 'router:branch' });

        try{
            log.info(`HTTP Request: Method: ${req.method} BaseUrl: ${req.baseUrl} `);
            log.info("=========================================================================")
            log.info(`HTTP Request.Headers: ${JSON.stringify(req.headers)}`);
            log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            log.info(`HTTP Request.Body: ${JSON.stringify(req.body)}} `);
            log.info(`HTTP Request.Params: ${ JSON.stringify(req.params)}`)
            log.info("=========================================================================")
            let corporateid=req.params.corporateid
            let branchid=req.params.branchid
            let dbsrvc = app.get("cloudantdb")
            log.verbose(`Читаю дані корпорації по corporateid:  ${corporateid}`)
            let deleteresult = await dbsrvc.deleteBranchbyid( {"corporateid":corporateid, "branchid": branchid} );
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
              res_err.Error.target="branch-router"
            }  
            log.error(res_err)
            res.status(res_status_code).json( res_err );
        }    


    });

    app.use('/branch-api/branch', router);
}

