const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const mysql = require('mysql')
const session = require('express-session')
const config = require('./config.js');


const con = mysql.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE

})

const app = express();
const PORT = 8080

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}))
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())






/// Middlewares

const  sendErrorMessage = (req,res,next,message) => {


            
            res.send({"error":"Email already taken"})


}

// printtable()

const getUserProfile =  (req,res,next) => {

    console.log("inside ")
    con.query(`SELECT * FROM customers WHERE id=${req.session.currentUserId}`, function (err, result, fields) {
        if (err) throw err;
        res.send(result[0])
     });
     
}

function printtable(){

    // con.query("SELECT * FROM guests", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    //    });
       con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
       });
    //    con.query("SELECT * FROM payments", function (err, result, fields) {
    //     if (err) throw err;


    //     console.log(result);
    //    });
    //    con.query("SELECT * FROM reservations", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    //    });



}

function droptable(name){

    var sql = `DROP TABLE IF EXISTS  ${name}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`Table ${name} deleted`);
    });
  

}


// function createtablecustomers(){


//     var sql = `CREATE TABLE IF NOT EXISTS customers  
    
//             (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//              firstname VARCHAR(255) NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             lastName VARCHAR(255) NOT NULL,
//             email VARCHAR(255) NOT NULL UNIQUE,
//             mailAddress VARCHAR(255) NOT NULL,
//             billAddress VARCHAR(255) NOT NULL,
//             phoneNumber VARCHAR(255) NOT NULL),
//             earnedPoints INT DEFAULT 0`;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
// }

// function createtablereservation(){
//  var sql = `CREATE TABLE IF NOT EXISTS reservationdetails
//             (id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//             customerID INT,
//             guestNumber INT ,
//             paymentID INT, 
//             date DATE NOT NULL,
//             time DATETIME NOT NULL,
//             FOREIGN KEY (customerID) REFERENCES customers(id),
//             FOREIGN KEY (paymentID) REFERENCES paymentdetails(id))`;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
// }

//  var sql = `CREATE TABLE IF NOT EXISTS paymentdetails
//             (id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//             customerID INT, 
//             cardNumber VARCHAR(255),
//             securityCode VARCHAR(255),
//  FOREIGN KEY (customerID) REFERENCES customers(id)

// )`;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });

//  var sql = `CREATE TABLE IF NOT EXISTS guests  

//             (id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//              firstname VARCHAR(255), 
//             lastName VARCHAR(255),
//             email VARCHAR(255),
//             phoneNumber VARCHAR(255))`;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
// describetable("reservationdetails")
function describetable(table){
    var sql = `DESCRIBE ${table}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });

    
}


function showtable (){


    con.query("SHOW TABLES", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });


}


app.post('/registration', cors(), async (req, res,next) => {

    // Input name's should be named the same as below
    // console.log(req.body)
    const { firstName, lastName, email, password, mailAddress, billAddress, phoneNumber } = req.body


    var sql = `SELECT * FROM customers WHERE email='${email}'`

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result)
        if(result.length > 0) return res.send({"error":"Email already taken"});
               
        var sql = `INSERT INTO customers (firstname,lastName,email,password,mailAddress,billAddress,phoneNumber) 
        VALUES ('${firstName}','${lastName}','${email}','${password}','${mailAddress}','${billAddress}','${phoneNumber}')`;
        con.query(sql, function (err, insertedCustomer) {
            if (err) throw err;

            // const currentUser = insertedCustomer[0];
            // req.session.currentUser = currentUser;
            console.log(" 1 record inserted");
            req.session.currentUserId = insertedCustomer.insertId;
            next()
            // res.send(insertedCustomer)
        });

    });

app.post('/login', cors(), async (req, res) => {

        const { email, password } = req.body;
        var sql = `SELECT * FROM customers WHERE email='${email}'`

        con.query(sql, function (err, result, fields) {
            if (err) throw err;

            if (result.length === 0) res.send({'error':' email not registered'});

            if (password === result[0].password) {

                req.session.currentUserId = result[0].id;
                res.send(result)
            }


        });


    });


});


app.delete('/customers/:id', cors(), async (req, res) => {


        /*
          deletes registed customer based on id which is passed in the 
          url query string we will change to req.session.customer.id
        
        
        */
        var sql = `SELECT * FROM customers WHERE id='${req.params.id}'`

        con.query(sql, function (err, result, fields) {
            if (err) throw err;

            if (result.length === 0) res.send({'error':' email not registered'});

            if (password === result[0].password) {

                req.session.currentUser = result[0].id;
                res.send(req.session)
            }


        });


});



/*
    should return a single guests from the db
    based on id
*/
app.get('/guests/:id', cors(), async (req, res) => {

    // if(req.params.id != req.session.currentUser && !req.session.authenticated) return res.send('Login first')
    con.query(`SELECT * FROM guests WHERE id ='${req.params.id}'`, function (err, result, fields) {
        if (err) throw err;

        res.send(result);
    });


});

/*
    should return all the guests in the db
*/
app.get('/guests', cors(), async (req, res) => {

    con.query("SELECT * FROM guests", function (err, result, fields) {
        if (err) throw err;

        res.send(result);
    });


});

/*
    should return a specific registered customer from the db
    based on id
*/

app.get('/customers/:id', cors(), async (req, res) => {

    // if(req.params.id != req.session.currentUser && !req.session.authenticated) return res.send('Login first')
    con.query(`SELECT * FROM customers WHERE id ='${req.params.id}'`, function (err, result, fields) {
        if (err) throw err;

        res.send(result);
    });


});
/*
    should return all the registered customers in the db
*/
app.get('/customers', cors(), async (req, res) => {

    con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;

        res.send(result);
    });


});

app.put('/customers/:id', cors(), async (req, res) => {


     /*  
         A valid put request to this route will update a registered
         user information in the db then return the updated result
     
      */
    // if(!req.params.id == req.session.id && req.session.authenticated) return res.send('Login first')
    // const {firstName, lastName,email,password,mailAddress,billAddress,phoneNumber} = req.body
    var sql = `SELECT * FROM customers WHERE id='${req.params.id}'`

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (!result.length > 0) return;

        var sql = `UPDATE customers 
                    set ? WHERE id='${req.params.id}'`;

        con.query(sql, req.body, function (err) {
            if (err) throw err;
            console.log("1 record updated");

            // res.send('received')
            res.send(result)
        });

    });

});
// table reservation routes

//  var sql = `CREATE TABLE IF NOT EXISTS reservationdetails
//             (id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//             customerID INT,
//             guestNumber INT NOT NULL,
//             paymentID INT, 
//             date DATE NOT NULL,
//             time DATETIME NOT NULL,
//             FOREIGN KEY (customerID) REFERENCES customers(id),
//             FOREIGN KEY (paymentID) REFERENCES paymentdetails(id))`;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
app.post('/checktime', cors(), async(req,res) =>{

    const { date , numberOfGuests} = req.body;

    /// table availableTable -> number of tables | number of seats  | date of reservation
    // return to frontend all the # of seats available on a specific date



})

app.post('/reservation', cors(), async(req,res)=>{

    // if(!req.body) res.send("empty fields")
    console.log(req.body )
    const {firstName, lastName,email, phoneNumber, cardNumber,securityCode,guestNumber,date,time } = req.body;

    res.send(req.body)


    /*  should query the db to find an so that we know
         if the user making the reservation is registered or not.
         if it is then we will store into reservation db with
         customerID otherwise use guestsID

    
    
    */
    // var sql =`SELECT email FROM customers WHERE email='${email}'`
           
    // con.query(sql, function (err, result, fields) {
    //     if (err) throw err;
    //     if(result.length > 0) return;            
    //    });  
    // var sql = `INSERT INTO reservationdetails VALUES ?`;
    // con.query(sql,req.body, function (err, result) {
    //     if (err) throw err.message;
    //         console.log(result + "1 record inserted");
    //         res.send(result)
    //     });

      /*  var sql = `INSERT INTO guests (firstname,lastName,email,phoneNumber) 
        VALUES ('${firstName}','${lastName}','${email}','${phoneNumber}')`;
        
        con.query(sql, function (err, resultGuest) {
            if (err) throw err.message;
            console.log(resultGuest + "1  guests inserted");
                // res.send(result)

            var sql = `INSERT INTO payments (customerID,cardNumber,securityCode) 
            VALUES ('${resultGuest.insertedId}','${cardNumber}','${securityCode}')`;
            con.query(sql, function (err, result) {
            if (err) throw err.message;
            console.log(result + "1 payments inserted");
                        // res.send(result)
                   
                
                    var sql = `INSERT INTO reservations (customerID,guestNumber,paymentID,date,time) 
                    VALUES ('${resultGuest.insertedId}','${guestNumber}','${result.insertedId}','${date}','${time}')`;

                    con.query(sql, function (err, result) {
                        if (err) throw err.message;
                            console.log(result + "1 reservations inserted");
                            res.send(result)
                    
                
                    });
                });

      
        });*/
  
    
    
})

app.use(getUserProfile)
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})