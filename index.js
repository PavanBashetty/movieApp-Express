const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const {query} = require("express");
const {json} = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, './frontendcode/dist')));

var port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Server started....!");
});

app.get("/", (req,res)=>{
    res.send("Hello again from the movie app server!")
});

/*
// Connect to the local MySQL database
const connection  = mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});
*/

// Connect to the GCP server
const connection  = mysql.createConnection({
    socketPath:"/cloudsql/--",
    host: "--",
    user:"--",
    password:"--",
    database:"--"
});

connection.connect((err)=>{
    if(err) throw err
    console.log("Movie app database connected successfully");
});

// get rest used to check login credentials. 
app.get("/api/login/:emailID", (req,res)=>{
    let emailID = req.params.emailID;
    let query = `SELECT * FROM userCredentials WHERE email = '${emailID}'`;
    
    connection.query(query, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not get the data"
            })
        }
        res.send(200,{
            msg:"Data fetched successfully",
            data:result
        })
       // console.log(result.length);
    })
});


// post method to add a new user into the database.
app.post("/api/signupcred", (req,res)=>{
    console.log("Requested to add a new user..");
    let fullName = req.body.fullName;
    let age = req.body.age;
    let email = req.body.email;
    let password = req.body.password;

    let query = `INSERT INTO userCredentials(fullName, age, email, user_password) 
    VALUES('${fullName}','${age}','${email}','${password}')`;

    connection.query(query, (err, result)=>{
        if(err){
            res.json(500,{
                msg:"Something went wrong"
            })
        }
        res.json(200,{
            msg:"user registered successfully"
        })
    })
});

//get method to send specific user details to browser
app.get("/api/userdetails/:userid", (req,res)=>{
    let userid = req.params.userid;

    let query = `SELECT uc.fullName, uc.age, uc.email, uc.current_status, count(ur.user_id) as ratedMovies
    FROM userCredentials uc 
    JOIN user_rating ur ON uc.user_id = ur.user_id
    WHERE uc.user_id = '${userid}'`;

    connection.query(query, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not get the data"
            })
        }
        res.send(200,{
            msg:"Data fetched successfully",
            data:result
        })
    })
});


// get method to send movie rating, movie name list of a specific user to browser
app.get("/api/ratedMovies/:userid", (req,res)=>{
    
    let userid = req.params.userid;
    let query = `SELECT movie_name, rating FROM user_rating WHERE user_id = '${userid}'`;

    connection.query(query,(err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not get the data"
            })
        }
        res.send(200,{
            msg:"Data fetched successfully",
            data:result
        })
    })
});

// post method to add a new rating/update existing rating into the database
app.post("/api/addrating", (req,res)=>{
    console.log("Requesting to add a new rating");
    let rating = req.body.rating;
    let movie_name = req.body.movie_name;
    let user_id = req.body.user_id;
    let fullName = req.body.fullName;

    let querySelect = `SELECT * FROM user_rating WHERE user_id = '${user_id}' and movie_name = '${movie_name}'`
    let queryInsert = `INSERT INTO user_rating VALUES('${user_id}', '${fullName}','${movie_name}','${rating}')`;
    let queryUpdate = `UPDATE user_rating SET rating = '${rating}' WHERE movie_name = '${movie_name}' and user_id = '${user_id}'`;

    connection.query(querySelect, (err,result)=>{
        if(err){
            res.json(500,{
                msg:"Server issue, could not get the data"
            })
        }
        //console.log(result.length);
        if(result.length > 0){
            connection.query(queryUpdate, (err,result) =>{
                if(err){
                    res.json(500,{
                        msg:"Server issue, could not get the data"
                    })
                }
                res.json(200,{
                    msg:"Rating updated in the database",
                })
            })
        }else{
            connection.query(queryInsert, (err,result)=>{
                if(err){
                    res.json(500,{
                        msg:"Server issue, could not get the data"
                    })
                }
                res.json(200,{
                    msg:"Rating added in the database"
                })
            })
        }
    })
});

// delete method to delete an existing rating
app.delete("/api/deleterating/:movie_name/:user_id", (req,res)=>{
    console.log("Requesting to delete a movie rating..");
    let movie_name = req.params.movie_name;
    let user_id = req.params.user_id;
    
    let query = `DELETE FROM user_rating WHERE user_id = '${user_id}' and movie_name = '${movie_name}'`;

    connection.query(query,(err,result)=>{
        if(err){
            res.json(500,{
                msg:"Something went wrong, could not delete the row"
            })
        }
        res.json(200,{
            msg:"Movie rating deleted"
        })
    })
});






/*
const mysql = require("mysql2");

Here is an example of JavaScript code to connect a local MySQL database to a Google Cloud Platform (GCP) server using Node.js:

// Connect to the local MySQL database
const localConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "database_name"
});

// Connect to the GCP server
const gcpConnection = mysql.createConnection({
  host: "hostname_or_ip_address",
  user: "username",
  password: "password",
  database: "database_name"
});

// Use the local database connection
localConnection.query("SELECT * FROM table_name", (err, rows) => {
  if (err) throw err;
  console.log("Local database result: ", rows);
});

// Use the GCP connection
gcpConnection.query("SELECT * FROM table_name", (err, rows) => {
  if (err) throw err;
  console.log("GCP server result: ", rows);
});


Please note that you need to replace the placeholders with your actual values, such as the hostname or IP address of your GCP server, the username and password to access the server, and the name of the database and table you want to connect to. Additionally, you will need to make sure that the necessary ports are open on the firewall to allow connections between the local MySQL database and the GCP server.



gcloud compute instances describe <instance-name> --format='value(networkInterfaces[0].networkIP)'

*/