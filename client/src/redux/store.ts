import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ROOT_REDUCERS from './reducers/index'
import {getAutToken} from './network/getAuthToken';
import {GET_WIZARD_DATA, GET_USER_AUTH_DATA, ERROR} from './global/global';
import {AxiosServiceInstance} from '../common/network/ajaxInstance';
const INITIALSTATE : Object = {};
const MIDDLEWARE_INITIALIZER = [thunk];

const STORE = createStore(
    ROOT_REDUCERS,
    INITIALSTATE,
    composeWithDevTools(applyMiddleware(...MIDDLEWARE_INITIALIZER))
 );


 class DefaultStoreConfig{

    public loadDefaultTokenConfigurations = async () => {
        const getToken = await getAutToken();
        STORE.dispatch({
            type: GET_USER_AUTH_DATA,
            payload : {token:  getToken},
        })
    }

    public loadDefaultWizardConfigurations = async () => {
        try {
            const getToken = await getAutToken();
            const requestHeaders = {'x-auth-appvia-token': getToken};
            const requestWizardsDetails = await AxiosServiceInstance(requestHeaders).get('/api/wizard/all');
            STORE.dispatch({
                type: GET_WIZARD_DATA,
                payload : {wizardPayload:  requestWizardsDetails.data.wizards},
            })
        } catch (exception) {
            STORE.dispatch({
                type: ERROR,
            })
            console.log(exception);
        }
    
    }
 }



const defaultStoreConfig = new DefaultStoreConfig();
defaultStoreConfig.loadDefaultTokenConfigurations();
defaultStoreConfig.loadDefaultWizardConfigurations();

//defaultStoreConfig.loadDefaultWizardConfigurations();


export  {STORE};