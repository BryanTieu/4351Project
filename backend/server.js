const express = require('express');
const cors  = require('cors')
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const mysql = require('mysql')
const session = require('express-session')
const config = require('./config.js');


const con = mysql.createConnection({
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

// connection.query(`create table tutorials_tbl(
//     tutorial_id INT NOT NULL AUTO_INCREMENT,
//     tutorial_title VARCHAR(100) NOT NULL,
//     tutorial_author VARCHAR(40) NOT NULL,
//     submission_date DATE,
//     PRIMARY KEY ( tutorial_id )
//  )`)
// .then((res)=>console.log(res))
// .catch((err)=>console.log(err))
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
//     var sql = "DROP TABLE IF EXISTS customers";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table deleted");
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

// FOREIGN KEY (reservationID) REFERENCES cus(PersonID)



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
//     con.query("SELECT * FROM guests", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//        });
        con.query("SHOW TABLES", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    con.end();
  });

app.get('/user/:id',cors(), async(req,res)=>{

    // if(req.params.id != req.session.currentUser && !req.session.authenticated) return res.send('Login first')
    con.query(`SELECT * FROM customers WHERE id ='${req.params.id}'`, function (err, result, fields) {
        if (err)  throw err;
           
        res.send(result);
    });


});
app.put('/user/:id', cors(), async (req,res)=>{
    
    // if(!req.params.id == req.session.id && req.session.authenticated) return res.send('Login first')
    // const {firstName, lastName,email,password,mailAddress,billAddress,phoneNumber} = req.body
    var sql =`SELECT * FROM customers WHERE id='${req.params.id}'`
    
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if(!result.length > 0) return;            
       
        var sql = `UPDATE customers 
                    set ? WHERE id='${req.params.id}'`;

        con.query(sql,req.body, function (err) {
            if (err) throw err;
                console.log("1 record updated");

                // res.send('received')
                res.send(result)
            });
            
        });
          
});


app.post('/login',cors(), async(req,res) =>{
    
    const {email,  password} = req.body;
    var sql =`SELECT * FROM customers WHERE email='${email}'`

    con.query(sql, function (err, result, fields) {
        if (err) throw err;

        if(result.length === 0) res.send('wrong email');
        
        if(password === result[0].password){

            req.session.authenticated = true;
            req.session.currentUser = result[0].id;
            res.send(req.session)
        }
        

    });


});

app.post('/registration', cors(), async (req,res)=>{

   // Input name's should be named the same as below
    const {firstName, lastName,email,password,mailAddress,billAddress,phoneNumber} = req.body

        
    var sql =`SELECT email FROM customers WHERE email='${email}'`
           
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if(result.length > 0) return;            
       
        var sql = `INSERT INTO customers (firstName,lastName,email,password,mailAddress,billAddress,phoneNumber) 
        VALUES ('${firstName}','${lastName}','${email}','${password}','${mailAddress}','${billAddress}','${phoneNumber}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
                console.log(result + "1 record inserted");
                res.send(result)
            });

    });
           
    
    
});
app.get('/users',cors(), async(req,res)=>{

    con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
           
        res.send(result);
    });


});



app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})