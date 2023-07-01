import axios, {AxiosInstance} from 'axios';


    const serverBaseURL = 'http://localhost:5000';

    /**
     * The function creates an instance of Axios with a specified header and base URL.
     * @param [header] - The `header` parameter is an optional object that contains additional headers to
     * be included in the HTTP requests made by the Axios instance.
     * @returns an instance of Axios, which is created using the axios.create() method. The instance has a
     * baseURL property set to the value of serverBaseURL and headers property set to the value of the
     * header parameter.
     */
    export const AxiosServiceInstance = (header?: {}): AxiosInstance => {
        return axios.create({
            baseURL: serverBaseURL,
            headers: {
                ...header
            }
        })
    }