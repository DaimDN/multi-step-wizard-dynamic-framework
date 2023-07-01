import { Application } from 'express';
import express from 'express';
import path from 'path';


export class DefaultNavigation {
    public enableFor(app: Application): void {
        app.use(express.static('client/build'));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname,'..', 'client', 'build', 'index.html'));
        }); 

    }

}