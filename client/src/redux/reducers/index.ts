import { combineReducers } from 'redux';
import {wizardDetails} from './wizard';
import {authDetails} from './authentication';

export default combineReducers({
    wizardDetails,
    authDetails,

});