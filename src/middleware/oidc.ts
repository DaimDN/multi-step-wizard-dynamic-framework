
import { Application } from 'express';
import config from 'config';
import {POST_WIZARD_CREATOR,GET_WIZARD, GET_ALL_WIZARD, GET_WIZARD_SETUP_STARTED, PUT_UPDATE_WIZARD_DATA } from '.././urls';

    /* The OIDCAuthServiceClient class is responsible for enabling authentication middleware in an Express
    application. */
    export class OIDCAuthServiceClient {
        /* The line `protected static accessForBiddenError = "Forbidden Access";` is declaring a protected
        static variable named `accessForBiddenError` and assigning it the value "Forbidden Access". */
        protected static accessForBiddenError = "Forbidden Access";

        /* The `protectedRoutes` array is storing a list of URLs that are considered protected routes. These
        routes require authentication and authorization to access. The array contains the URLs for various
        HTTP methods such as POST, GET, and PUT, along with their corresponding endpoints. */
        protected static protectedRoutes = [
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