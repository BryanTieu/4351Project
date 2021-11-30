const dotenv = require('dotenv');


dotenv.config();


const {

    host,
    user,
    password,
    database
} = process.env;


module.exports = {
    HOST: host,
    USER: user,
    PASSWORD: password,
    DATABASE:database
}