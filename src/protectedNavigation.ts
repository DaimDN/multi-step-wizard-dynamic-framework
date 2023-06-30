/* eslint-disable @typescript-eslint/no-var-requires */
import { Application } from 'express';
import * as URLS from './urls';



export class ProtectedRoutedNavigationSetup {
    public enableFor(app: Application): void {

       
        app.get('/app', (req, res)=> res.json({msg: 'welcome'}));

    }

}