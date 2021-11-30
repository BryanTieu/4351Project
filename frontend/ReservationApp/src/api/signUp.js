import axios from "axios";


const baseUrl = 'http://localhost:3500';

const getAll = () => {
    const request = axios.get(baseUrl+'/profiles')
    return request.then(response => response.data)
}

const postData = newObject => {
    const request = axios.post(baseUrl+'/profiles', newObject)
    return request.then(response => response.data)
}

export {getAll, postData}