/* eslint-disable @typescript-eslint/no-var-requires */
import { Application } from 'express';
import * as URLS from './urls';
import config from 'config';



export class Navigation {
    public enableFor(app: Application): void {
        app.get(URLS.GET_SERVER_CHECK as string, (req, res)=> res.status(200).json({response: 'Welcome to Appvia App' }));
        app.get(URLS.GET_AUTH_TOKEN as string, (req, res)=> res.status(200).json({token: config.get('security.authToken') }));

    }

}