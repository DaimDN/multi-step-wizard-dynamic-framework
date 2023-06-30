/* eslint-disable @typescript-eslint/no-var-requires */
import { Application } from 'express';
import * as URLS from './urls';



export class Navigation {
    public enableFor(app: Application): void {
       
        app.get('/', (req, res)=> res.json({response: 'welcome'}));


    }

}