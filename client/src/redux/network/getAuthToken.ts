import {AxiosServiceInstance} from '../../common/network/ajaxInstance';



export const getAutToken = async (): Promise<String> => {
    try {
        const networkRequest = await AxiosServiceInstance().get('/api/token');
        return networkRequest.data.token
    } catch (exception) {
        console.log(exception);
        return 'network error';
    }
 
}
