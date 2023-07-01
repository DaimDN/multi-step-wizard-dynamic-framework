
import { Application } from 'express';
import config from 'config';
import {POST_WIZARD_CREATOR,GET_WIZARD, GET_ALL_WIZARD, GET_WIZARD_SETUP_STARTED, PUT_UPDATE_WIZARD_DATA } from '.././urls';

/* The OIDCAuthServiceClient class is responsible for enabling authentication middleware in an Express
application. */
export class OIDCAuthServiceClient {
    protected static accessForBiddenError = "Forbidden Access";

    protected static protectedRoutes = [
        POST_WIZARD_CREATOR,
        GET_ALL_WIZARD,
        GET_WIZARD,
        GET_ALL_WIZARD,
        GET_WIZARD_SETUP_STARTED,
        PUT_UPDATE_WIZARD_DATA
        ];
    public enableFor(app: Application): void {
       app.use((req, res, next)=> {
            if(OIDCAuthServiceClient.protectedRoutes.includes(req.originalUrl)){
                const token = req.header(config.get('security.authHeaders'));
                if(!token){
                    return res.status(401).json({msg: OIDCAuthServiceClient.accessForBiddenError});
                }else{
                    if(token !== config.get('security.authToken')){
                        return res.status(401).json({msg: OIDCAuthServiceClient.accessForBiddenError});
                    }else{
                       return next();
                    }
                }
            }
            else{
               return next();
            }
        
        })

    }

}