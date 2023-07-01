import axios, {AxiosInstance} from 'axios';


const serverBaseURL = 'http://localhost:5000';

export const AxiosServiceInstance = (header?: {}): AxiosInstance => {
    return axios.create({
        baseURL: serverBaseURL,
        headers: {
            ...header
        }
    })
}