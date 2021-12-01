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




// ALTER TABLE paymentdetails DROP FOREIGN KEY customerID
// ALTER TABLE reservationdetails DROP FOREIGN KEY customerID

// con.query("ALTER TABLE reservationdetails DROP FOREIGN KEY id, drop id", function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// var sql = `CREATE TABLE IF NOT EXISTS customers  

//         (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//          firstname VARCHAR(255) NOT NULL,
//password VARCHAR(255) NOT NULL,
//         lastName VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL UNIQUE,
//         mailAddress VARCHAR(255) NOT NULL,
//         billAddress VARCHAR(255) NOT NULL,
//         phoneNumber VARCHAR(255) NOT NULL),
//         earnedPoints INT DEFAULT 0`;
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });

function printtable(){

    con.query("SELECT * FROM guests", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
       });
       con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
       });
       con.query("SELECT * FROM paymentdetails", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
       });
       con.query("SELECT * FROM reservationdetails", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
       });



}

function droptable(name){

    var sql = `DROP TABLE IF EXISTS  ${name}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table deleted");
    });
  

}
function createtablecustomers(){


    var sql = `CREATE TABLE IF NOT EXISTS customers  
    
            (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
             firstname VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            lastName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            mailAddress VARCHAR(255) NOT NULL,
            billAddress VARCHAR(255) NOT NULL,
            phoneNumber VARCHAR(255) NOT NULL),
            earnedPoints INT DEFAULT 0`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
}


// FOREIGN KEY (reservationID) REFERENCES cus(PersonID)


function createtablereservation(){
 var sql = `CREATE TABLE IF NOT EXISTS reservationdetails
            (id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            customerID INT,
            guestNumber INT ,
            paymentID INT, 
            date DATE NOT NULL,
            time DATETIME NOT NULL,
            FOREIGN KEY (customerID) REFERENCES customers(id),
            FOREIGN KEY (paymentID) REFERENCES paymentdetails(id))`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
}

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

// var sql = "DESCRIBE paymentdetails";
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });

//     var sql = `INSERT INTO customers 
// (firstName, lastName, email, mailAddress,billAdress,phoneNumber) 
// VALUES ('Hammer','Doll','hammerd@email.com','6969 thatway st', '6969 thatway st','11111111')`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });

function showtable (){


    con.query("SHOW TABLES", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });


}

  

app.get('/user/:id', cors(), async (req, res) => {

    // if(req.params.id != req.session.currentUser && !req.session.authenticated) return res.send('Login first')
    con.query(`SELECT * FROM customers WHERE id ='${req.params.id}'`, function (err, result, fields) {
        if (err) throw err;

        res.send(result);
    });


});
app.put('/user/:id', cors(), async (req, res) => {

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


app.post('/login', cors(), async (req, res) => {

    const { email, password } = req.body;
    var sql = `SELECT * FROM customers WHERE email='${email}'`

    con.query(sql, function (err, result, fields) {
        if (err) throw err;

        if (result.length === 0) res.send('wrong email');

        if (password === result[0].password) {

            req.session.authenticated = true;
            req.session.currentUser = result[0].id;
            res.send(req.session)
        }


    });


});

app.post('/registration', cors(), async (req, res) => {

    // Input name's should be named the same as below
    const { firstName, lastName, email, password, mailAddress, billAddress, phoneNumber } = req.body


    var sql = `SELECT email FROM customers WHERE email='${email}'`

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if(result.length > 0) return;            
       
        var sql = `INSERT INTO customers (firstname,lastName,email,password,mailAddress,billAddress,phoneNumber) 
        VALUES ('${firstName}','${lastName}','${email}','${password}','${mailAddress}','${billAddress}','${phoneNumber}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result + "1 record inserted");
            res.send(result)
        });

    });



});
app.get('/users', cors(), async (req, res) => {

    con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;

        res.send(result);
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


app.post('/reservation', cors(), async(req,res)=>{

    // if(!req.body) res.send("empty fields")
    const {firstName, lastName,email, phoneNumber, cardNumber,securityCode,guestNumber,date,time } = req.body;

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

        var sql = `INSERT INTO guests (firstname,lastName,email,phoneNumber) 
        VALUES ('${firstName}','${lastName}','${email}','${phoneNumber}')`;
        
        con.query(sql, function (err, resultGuest) {
            if (err) throw err.message;
            console.log(resultGuest + "1  guests inserted");
                // res.send(result)

            var sql = `INSERT INTO paymentdetails (customerID,cardNumber,securityCode) 
            VALUES ('${resultGuest.insertedId}','${cardNumber}','${securityCode}')`;
            con.query(sql, function (err, result) {
            if (err) throw err.message;
            console.log(result + "1 paymentdetails inserted");
                        // res.send(result)
                   
                
                    var sql = `INSERT INTO reservationdetails (customerID,guestNumber,paymentID,date,time) 
                    VALUES ('${resultGuest,insertedId}','${guestNumber}','${result.insertedId}','${date}','${time}')`;

                    con.query(sql, function (err, result) {
                        if (err) throw err.message;
                            console.log(result + "1 reservationdetails inserted");
                            res.send(result)
                    
                
                    });
                });

      
        });
  
    
    
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})