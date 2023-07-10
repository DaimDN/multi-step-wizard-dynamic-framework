            
            import {API_VALIDATION_ERROR} from '../global/global'  
            
            /* The code is exporting a constant variable called `INITIALSTATE` which is an object with a property
            `formValidations` set to an empty object `{}`. This initial state is likely used as the initial
            value for the state in a Redux store or a similar state management system. */

                export const INITIALSTATE = {
                        formError: []
                };
            // eslint-disable-next-line import/no-anonymous-default-export


            /**
             * The function `apiValidations` is a reducer that updates the state with form errors when an API
             * validation error action is dispatched.
             * @param state - The `state` parameter represents the current state of the `apiValidations` reducer.
             * It is an object that contains the data and properties related to the reducer.
             * @param {any} action - The `action` parameter is an object that represents the action being
             * dispatched. It typically has two properties: `type` and `payload`.
             * @returns The code is returning the updated state object with the formError property set to the value
             * of payload.formError if the action type is API_VALIDATION_ERROR. Otherwise, it returns the current
             * state object.
             */
            export const apiValidations = (state = INITIALSTATE, action : any) =>  {
                const {type, payload } = action;

                if(type === API_VALIDATION_ERROR){
                    return{
                        ...state,
                        formError : payload.formError
                    }
                }
                return state;
               
            }