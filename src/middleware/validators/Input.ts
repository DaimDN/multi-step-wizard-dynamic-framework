import {Request, Response, NextFunction} from 'express';

        /* The InputValidator class checks if a specific field in the request body has a character length
        greater than a specified value and returns an error response if it does. */
    export class InputValidator{

      /* The `enableFor` method is a middleware function that checks if a specific field in the request
      body has a character length greater than 63. */
        public enableFor = (req: Request, res: Response, next: NextFunction) =>  {
                if(req.body.wizard.steps[0].questions[0].question === 'name'){
                    if(req.body.wizard.steps[0].questions[0].value.length > 63){
                       return res.status(409).json({msg:  'Please enter 63 characters for name field'});
                    }else{
                    return next();
                    }
                }
                return next();
          
        }
    }