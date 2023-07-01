/* eslint-disable @typescript-eslint/no-var-requires */
import { Application } from 'express';
import * as URLS from './urls';



export class Navigation {
    public enableFor(app: Application): void {
        app.get(URLS.GET_SERVER_CHECK as string, (req, res)=> res.status(200).json({response: 'Welcome to Appvia App' }));

    }

}