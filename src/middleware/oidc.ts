
import { Application } from 'express';
import config from 'config';
import {POST_WIZARD_CREATOR,GET_WIZARD, GET_ALL_WIZARD, GET_WIZARD_SETUP_STARTED, PUT_UPDATE_WIZARD_DATA } from '.././urls';

    /* The OIDCAuthServiceClient class is responsible for enabling authentication middleware in an Express
    application. */
    export class OIDCAuthServiceClient {
  
    /* The line `protected accessForBiddenError = "Forbidden Access";` is declaring a protected variable
    `accessForBiddenError` and assigning it the value "Forbidden Access". This variable is used to
    store the error message that will be sent in the response when a request does not have a valid
    token or is not authorized to access a protected route. */
        protected  accessForBiddenError = "Forbidden Access";


        protected  protectedRoutes = [
            POST_WIZARD_CREATOR,
            GET_ALL_WIZARD,
            GET_WIZARD,
            GET_ALL_WIZARD,
            GET_WIZARD_SETUP_STARTED,
            PUT_UPDATE_WIZARD_DATA
            ];
        /**
            * The enableFor function is a middleware that checks if a request's original URL is in the
            * protectedRoutes array, and if so, it checks if the request has a valid token in the authHeaders
            * header, and if the token matches the authToken configuration value.
            * @param {Application} app - The `app` parameter is an instance of the Express application. It is
            * used to enable the middleware function for the application.
            */
        public enableFor(app: Application): void {
        app.use((req, res, next)=> {
                if(this.protectedRoutes.includes(req.originalUrl)){
                    const token = req.header(config.get('security.authHeaders'));
                    if(!token){
                        return res.status(401).json({msg: this.accessForBiddenError});
                    }else{
                        if(token !== config.get('security.authToken')){
                            return res.status(401).json({msg: this.accessForBiddenError});
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