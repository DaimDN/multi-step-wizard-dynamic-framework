import express, { Application } from 'express';
import path from 'path';


export class DefaultNavigation {
    public enableFor(app: Application): void {
      /* `app.use(express.static('client/build'));` is a middleware function that serves static files
      from the specified directory. In this case, it is serving static files from the 'client/build'
      directory. This means that any files in the 'client/build' directory can be accessed directly
      by their URL without any additional routing or processing. */
        app.use(express.static('client/build'));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname,'..', 'client', 'build', 'index.html'));
        }); 

    }

}