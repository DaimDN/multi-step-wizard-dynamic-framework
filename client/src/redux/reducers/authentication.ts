import {GET_USER_AUTH_DATA, ERROR} from '../global/global';
export const INITIALSTATE = {
        userAuthenticationDetails: {}
  };
// eslint-disable-next-line import/no-anonymous-default-export
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