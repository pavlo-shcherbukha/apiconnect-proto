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
        let response = await this.service.postAllDocs({ "db": this.icld_db, includeDocs: true, startKey: 'CORP', limit: 100});
        let documentList = response.result.rows;

        let corporateList=[]
        for (const document of documentList) {
            corporateList.push(document.doc)
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

}    