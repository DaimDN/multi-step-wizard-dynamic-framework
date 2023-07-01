import {GET_USER_AUTH_DATA, ERROR} from '../global/global';
    /* The `export const INITIALSTATE` is defining an initial state object for the `authDetails` reducer.
    It has a property `userAuthenticationDetails` which is an empty object. This initial state will be
    used when the reducer is first initialized or when the state is reset. */
    export const INITIALSTATE = {
            userAuthenticationDetails: {}
    };
// eslint-disable-next-line import/no-anonymous-default-export
    /**
     * The authDetails function is a reducer that handles actions related to user authentication details
     * and updates the state accordingly.
     * @param state - The `state` parameter represents the current state of the `authDetails` reducer. It
     * is an object that contains the authentication details of the user.
     * @param {any} action - The `action` parameter is an object that contains information about the action
     * being dispatched. It typically has two properties: `type` and `payload`.
     * @returns an updated state object based on the action type. If the action type is
     * "GET_USER_AUTH_DATA", it returns a new state object with the userAuthenticationDetails property
     * updated with the token from the payload. If the action type is "ERROR", it returns a new state
     * object with the ERROR property set to 'error occurred'. If the action type does not match any of the
     * cases
     */
    export const authDetails = (state = INITIALSTATE, action : any) =>  {
        const { type, payload } = action;
        switch (type) {
            case GET_USER_AUTH_DATA:
                return {
                    ...state,
                    userAuthenticationDetails : {token: payload.token},
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