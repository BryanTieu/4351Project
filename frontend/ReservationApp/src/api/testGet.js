import axios from "axios";


const baseUrl = 'http://localhost:8080';

const getAll = () => {
    const request = axios.get(baseUrl+'/users')
    return request.then(response => response.data)
}

export {getAll}