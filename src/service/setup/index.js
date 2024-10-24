
import axios from 'axios';
import { getCookies } from 'cookies-next';



export function setupApiClient() {
    const baseURL = "https://scapa-api-0b5e0c4e61f2.herokuapp.com"
    //const baseURL = 'http://localhost:4040/'
    const api = axios.create({
        baseURL,
    });
    return api;
}
