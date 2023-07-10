import { combineReducers } from 'redux';
import {wizardDetails} from './wizard';
import {authDetails} from './authentication';
import {apiValidations} from './validationError';

/* The code is using the `combineReducers` function from the `redux` library to combine multiple
reducers into a single reducer function. */
export default combineReducers({
    wizardDetails,
    authDetails,
    apiValidations

});