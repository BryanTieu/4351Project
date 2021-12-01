import axios from "axios";

const baseUrl = 'http://localhost:8080';

const getAll = async () => {
    const request = await axios.get(baseUrl+'/reservation')
    return request;
}

const postData = async newObject => {
    const request = await axios.post(baseUrl+'/reservation', newObject)
    return request;
}

export {getAll, postData}