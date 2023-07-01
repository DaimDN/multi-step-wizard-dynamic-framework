
import { Application } from 'express';
import config from 'config';



/* The OIDCAuthServiceClient class is responsible for enabling authentication middleware in an Express
application. */
export class OIDCAuthServiceClient {
    protected static accessForBiddenError = "Forbidden Access";
    public enableFor(app: Application): void {

       
      /* The code snippet is defining a middleware function that will be used by the Express
      application. */
        app.use((req, res, next)=> {
            console.log({msg: 'auth middleware is enabled'});
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

        })

    }

}