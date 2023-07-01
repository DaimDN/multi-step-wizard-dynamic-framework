import {GET_WIZARD_DATA, ERROR} from '../global/global';
    /* The code `export const INITIALSTATE = { wizardPayload: {} };` is defining the initial state for the
    `wizardDetails` reducer. It creates an object with a property `wizardPayload` that is initially set
    to an empty object `{}`. This initial state will be used as the starting point for the reducer and
    will be updated based on the actions dispatched to the reducer. */
    export const INITIALSTATE = {
            wizardPayload: {}
    };
    // eslint-disable-next-line import/no-anonymous-default-export
    /**
     * The function is a reducer that handles different actions and updates the state accordingly.
     * @param state - The `state` parameter represents the current state of the wizardDetails reducer. It
     * is initialized with the value of `INITIALSTATE` and is updated based on the actions dispatched to
     * the reducer.
     * @param {any} action - The `action` parameter is an object that contains information about the action
     * being dispatched. It typically has two properties:
     * @returns an object with the updated state.
     */
    export const wizardDetails = (state = INITIALSTATE, action : any) =>  {
        const { type, payload } = action;
        switch (type) {
            case GET_WIZARD_DATA:
                return {
                    ...state,
                    wizardPayload : payload.wizardPayload,
                };  
            case ERROR:
                return {
                    ...state,
                    ERROR: 'error occured'
                }  ;        
            default:
            return state;
        }
    }