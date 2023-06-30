import { Application } from 'express';
import * as URLS from './urls';



export class DefaultNavigation {
    public enableFor(app: Application): void {

       
        app.get(URLS.GET_DEFAULT_ROUTES as string, (req, res)=> res.json({response: 'route not found'}));

    }

}