import axios, { AxiosResponse } from "axios"

axios.defaults.baseURL = 'http://localhost:8080/api/';

const responseBody = (response: AxiosResponse) => response.data;

const requests = { 
    get:    (url : string) => axios.get(url).then(responseBody),
    post:   (url : string, body: object) => axios.post(url, body).then(responseBody),
    put:    (url: string, body:object) => axios.put(url,body).then(responseBody),
    delete: (url: string) => axios.put(url).then(responseBody)
}

const Store = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const api = {
    Store
}
export default api;