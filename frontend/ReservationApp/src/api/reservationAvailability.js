import axios from "axios";

const baseUrl = 'http://localhost:8080';

const getAll = async () => {
    const request = await axios.get(baseUrl + '/reservation')
    return request;
}

const postData =  newObject => {
    try {
        const request =  axios
        .post('http://localhost:8080/reservation', newObject)
        .then((data) => console.log(data))
        .catch(err => {
          console.error(err);
        });

        return request;
    }
    catch(err){
        console.log(err.message);
    }
    
}

export { getAll, postData }