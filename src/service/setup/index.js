
import axios from 'axios';
import { getCookies } from 'cookies-next';



export function setupApiClient() {
    const baseURL = "http://localhost:4040"
    const api = axios.create({
        baseURL,
    });
    return api;
}
