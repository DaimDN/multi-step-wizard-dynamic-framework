import {AxiosServiceInstance} from '../../common/network/ajaxInstance';

    /**
     * The function `getAuthToken` is an asynchronous function that makes a network request to retrieve a
     * token and returns the token value if successful, or 'network error' if there is an exception.
     * @returns a Promise that resolves to a string.
     */

    export const getAutToken = async (): Promise<String> => {
        try {
            const networkRequest = await AxiosServiceInstance().get('/api/token');
            return networkRequest.data.token
        } catch (exception) {
            console.log(exception);
            return 'network error';
        }
    
    }
