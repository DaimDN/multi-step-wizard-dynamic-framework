import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ROOT_REDUCERS from './reducers/index'
import {getAutToken} from './network/getAuthToken';
import {GET_WIZARD_DATA, GET_USER_AUTH_DATA, ERROR} from './global/global';
import {AxiosServiceInstance} from '../common/network/ajaxInstance';
const INITIALSTATE : Object = {};
const MIDDLEWARE_INITIALIZER = [thunk];

    /* The `const STORE` is creating a Redux store using the `createStore` function from the Redux library.
    It takes three arguments: */
    const STORE = createStore(
        ROOT_REDUCERS,
        INITIALSTATE,
        composeWithDevTools(applyMiddleware(...MIDDLEWARE_INITIALIZER))
    );


    /* The DefaultStoreConfig class is responsible for loading default token and wizard configurations into
    the store. */
    class DefaultStoreConfig{

       /* The `loadDefaultTokenConfigurations` function is an asynchronous function that is responsible
       for loading the default token configuration into the Redux store. */
        public loadDefaultTokenConfigurations = async () => {
            const getToken = await getAutToken();
            STORE.dispatch({
                type: GET_USER_AUTH_DATA,
                payload : {token:  getToken},
            })
        }
      /* The `loadDefaultWizardConfigurations` function is an asynchronous function that is responsible
      for loading the default wizard configurations into the Redux store. */
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


    /* The code `const defaultStoreConfig = new DefaultStoreConfig();` creates an instance of the
    `DefaultStoreConfig` class. */
    const defaultStoreConfig = new DefaultStoreConfig();
    defaultStoreConfig.loadDefaultTokenConfigurations();
    defaultStoreConfig.loadDefaultWizardConfigurations();


export  {STORE};