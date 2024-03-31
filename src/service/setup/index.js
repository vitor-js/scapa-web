
import axios from 'axios';
import { getCookies } from 'cookies-next';



export function setupApiClient() {
    const baseURL = "https://scapa-api-0b5e0c4e61f2.herokuapp.com"
    const api = axios.create({
        baseURL,
    });
    return api;
}
