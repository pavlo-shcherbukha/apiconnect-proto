/**
 * Клас для взаємодії з БД Cloudant
 * По суті імплементує орботу з branch API
 * https://cloud.ibm.com/apidocs/cloudant
 */
import { CloudantV1 } from '@ibm-cloud/cloudant';
import { IamAuthenticator } from 'ibm-cloud-sdk-core';


import { reject }  from 'async';
import {ValidationError, ApplicationError, ServerError,AxiosError } from '../error/appError.js';
import {isDefined, formatError } from  '../applib/apputils.js';


export class CloudantSrvc  {
    constructor(app){
        this.app=app
        this.icld_url = this.app.get('cld_url');
        this.icld_apikey = this.app.get('cld_apikey');
        this.icld_db = this.app.get('cld_dbname');
      
        this.authenticator = new IamAuthenticator({ apikey: this.icld_apikey });
        this.service = new CloudantV1({ authenticator: this.authenticator});
        this.service.setServiceUrl( this.icld_url );
    }

    stringToBoolean (string) {
        switch (string.toLowerCase().trim()) {
            case "true": case "yes": case "1": return true;
            case "false": case "no": case "0": case null: return false;
            default: return Boolean(string);
        }
    }
    async createCorporate(  parm ){

        let uid=await this.service.getUuids({"count": 1})
        let corporate = {}
        corporate._id="CORP-"+uid.result.uuids[0];
        corporate.type= 'CORPORATE';
        corporate.name = parm.name;
        corporate.erdpou = parm.erdpou;
        corporate.contacts = parm.contacts;
        corporate.branches=[];

        let response = await this.service.postDocument({ "db": this.icld_db, "document": corporate })
        return response.result.id
    }
    async readCorporatebyid(  parm ){

        let response = await this.service.getDocument({ "db": this.icld_db, "docId": parm.corporateid })
        let corporate = response.result
        return corporate

    }

    async readCorporateList(){
        //let response = await this.service.postAllDocs({ "db": this.icld_db, includeDocs: true, startKey: 'CORP', limit: 100});
        //let documentList = response.result.rows;

        let response = await this.service.postFind( 
            { 
                "db": this.icld_db,
                "selector":{ "type": {"$eq": "CORPORATE" } },
                "fields": ["_id", "_rev"],
                "limit": 100
            }
        );

        let documentList = response.result.docs;




        let corporateList=[]
        for (const document of documentList) {
            let corporate = await this.readCorporatebyid({ "corporateid": document._id})
            corporateList.push(corporate)
        
        }
        return corporateList;

    }

    async deleteCorporatebyid(  parm ){

        let response_g = await this.service.getDocument({ "db": this.icld_db, "docId": parm.corporateid })
        let revision = response_g.result._rev


        let response = await this.service.deleteDocument({ "db": this.icld_db, "docId": parm.corporateid , "rev": revision})
        let corporate = response.result
        return corporate

    }

    async updateCorporatebyid(  parm ){

        let response = await this.service.putDocument({ "db": this.icld_db, "docId": parm.corporateid , document: parm.corporate})
        let corporate = response.result
        return corporate

    }


    async createBranch(  parm ){

        let uid=await this.service.getUuids({"count": 1})
        let branch = {}
        branch._id="BRANCH-"+uid.result.uuids[0];
        branch.corporateid = parm.corporateid
        branch.type= 'BRANCH';
        branch.branch_name = parm.branch.branch_name;
        branch.branch_erdpou = parm.branch.branch_edrpou;
        branch.branch_adress = parm.branch.branch_adress;
        branch.branch_phone = parm.branch.branch_phone;
        branch.branch_sign_certs = parm.branch.branch_sign_certs;
        branch.branch_encrypt_certs= parm.branch.branch_encrypt_certs;
        let response = await this.service.postDocument({ "db": this.icld_db, "document": branch })
        let corporate = await this.readCorporatebyid({"corporateid": parm.corporateid})
        corporate.branches.push(branch._id);
        let updresponse=await this.updateCorporatebyid({"corporateid": parm.corporateid, "corporate": corporate})
        return response.result.id
    }

    async readBranchbyid(  parm ){

        let response = await this.service.getDocument({ "db": this.icld_db, "docId": parm.branchid })
        let branch = response.result
        if (branch.corporateid !== parm.corporateid){
            branch={}
        }
        return branch

    }

    async readBranchList(parm){
        let corporateid=parm.corporateid;
        let response = await this.service.postFind( 
            { 
                "db": this.icld_db,
                "selector":{ "corporateid": {"$eq": corporateid } },
                "fields": ["_id", "_rev"],
                "limit": 100
            }
        );
        let documentList = response.result.docs;

        let branchList=[]
        for (const document of documentList) {
            let branch = await this.readBranchbyid({ "corporateid": corporateid ,branchid: document._id})
            branchList.push(branch)
          }
        return branchList;

    }

    async deleteBranchbyid(  parm ){

        let response_g = await this.service.getDocument({ "db": this.icld_db, "docId": parm.branchid })
        let revision = response_g.result._rev


        let response = await this.service.deleteDocument({ "db": this.icld_db, "docId": parm.branchid , "rev": revision})
        let branch = response.result
        return branch

    }


    async createPayment(  parm ){

        let uid=await this.service.getUuids({"count": 1})
        let payment = {}
        payment._id="PAYMENT-"+uid.result.uuids[0];
        payment.type= 'PAYMENT';
        payment.branchid=parm.payment.branchid;
        payment.payment_type=parm.payment.payment_type;
        payment.sep_payment_ref=parm.payment.sep_payment_ref
        payment.signature=parm.payment.signature
        payment.rows=parm.payment.rows
        payment.proc_status="NEW"
        let response = await this.service.postDocument({ "db": this.icld_db, "document": payment })

        return response.result.id
    }


    async readPaymentStatus(  parm ){
        let response = await this.service.getDocument({ "db": this.icld_db, "docId": parm.paymentid });
        let payment= response.result;
        return payment.proc_status;
    }

    async readPayment(  parm ){
        let response = await this.service.getDocument({ "db": this.icld_db, "docId": parm.paymentid });
        let payment= response.result;
        return payment;
    }



    async processPayment(  parm ){
        let response = await this.service.getDocument({ "db": this.icld_db, "docId": parm.paymentid });
        let payment= response.result;
        payment.proc_status=parm.status.proc_status
        payment.proc_status_dsc=parm.status.proc_status_dsc
        let response_save = await this.service.putDocument({ "db": this.icld_db, "docId": parm.paymentid , document: payment})
        return response_save.result.id
    }    

    


}    