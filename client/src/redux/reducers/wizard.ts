import {GET_WIZARD_DATA, ERROR} from '../global/global';
export const INITIALSTATE = {
        wizardPayload: {}
  };
// eslint-disable-next-line import/no-anonymous-default-export
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