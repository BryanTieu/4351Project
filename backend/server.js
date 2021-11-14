const express = require('express');
const cors  = require('cors')
const cookieParser = require("cookie-parser");


const app = express();
const PORT = 8080

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())


app.all('/', cors(), async (req,res)=>{

    if(req.method === 'GET'){
        console.log("server here...")
        res.sendFile('home.html', {root: './views'})
    }
    else{

        // Input name's should be named the same as below
        const {firstName, lastName, phone, email,  password, passwordConfirm} = req.body
        console.log(req.body)
        res.send('received')
    }
    
});

app.all('/login', cors(), async (req,res)=>{

    if(req.method === 'GET'){
       
        // res.sendFile('login.html', {root: './views'})
        // After we have a HTML for Login page the code above will render that page and the code below
        // should be removed
        res.send('Login route')
    }
    else{

        // Input name's should be named the same as below
        const {firstName, lastName, phone, email,  password, passwordConfirm} = req.body
        console.log(req.body)
        res.send('received')
    }
    
});

app.all('/reservation', cors(), async (req,res)=>{

    if(req.method === 'GET'){
       
        // res.sendFile('reservation.html', {root: './views'})
        // After we have a HTML for reservetion page the code above will render that page and the code below
        // should be removed
        res.send('reservation route')
    }
    else{

        // Input name's should be named the same as below
        const {date, time, numberOfGuests} = req.body
        console.log(req.body)
        res.send('received')
    }
    
});



app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})