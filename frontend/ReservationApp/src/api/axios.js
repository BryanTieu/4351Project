import axios from "axios";



const getAll = async (data,endpoint) => {
    const request = await axios.get(`http://localhost:8080/${endpoint}`)
    return request;
}

const postData = async (customerData,endpoint) => {
  
        const data = await axios
        .post(`http://localhost:8080/${endpoint}`, customerData)
        .then( (res) => {return JSON.parse(JSON.stringify(res.data))})
        
          return data
        

         
   }

export { getAll, postData }