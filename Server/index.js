const express = require('express')
const bodyParser = require ('body-parser')
const bcrypt = require("bcrypt")
const cors = require('cors')
const mysql = require('mysql2')
const app = express()
const dotenv = require('dotenv').config()

const db = mysql.createPool({ // createConnection
    host: '127.0.0.1',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})

function SanitizeData(data) {
    if (data.includes("`") === true ) {
        return false;
    } else if (data.includes("=") === true) {
        return false;
    } else if (data.includes("<") === true) {
        return false;
    } else if (data.includes(";") === true) {
        return false;
    } else if (data.includes("'") === true) {
        return false;
    } else {
        return true;
    }
}





app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))



app.get("/api/read", (req, res) => {

	console.log("Running Api read Request....");

	res.send("Hello from Server");

})



app.post("/api/LoginSubmit", (req, res) => {

	const Uname = req.body.Username;
	const Pword = req.body.Password;

	if (SanitizeData(Uname) === false) {
		res.send({Auth: false, message: "Invalid characters detected in Username"});
		console.log("Invalid characters detected during user registration");
		return;
	} else if (SanitizeData(Pword) === false) {
		res.send({Auth: false, message: "Invalid characters detected in Password"});
		console.log("Invalid characters detected during user registration");
		return;
	} else {
		console.log(Uname, Pword);
	}

	const sqlSelect = "SELECT * FROM users WHERE username=?;";
    db.query(sqlSelect, [Uname], (err, result) => {
        if(err){
            throw err;
        }

        console.log(result);

    });

	res.send({Auth: true, user: Uname});


})


app.post("/api/RegisterUser", (req, res) => {

	const Uname = req.body.Username;
	const Email = req.body.email;
	let Phone = req.body.phone;
	const Pword = req.body.Password;

	if (Phone.length < 1) {
		Phone = "000";
	}


	if (SanitizeData(Uname) === false) {
		res.send({Auth: false, message: "Invalid characters detected in Username"});
		console.log("Invalid characters detected during user registration");
		return;
	} else if (SanitizeData(Email) === false) {
		res.send({Auth: false, message: "Invalid characters detected in Email"});
		console.log("Invalid characters detected during user registration");
		return;

	} else if (SanitizeData(Phone) === false) {
		res.send({Auth: false, message: "Invalid characters detected in Phone"});
		console.log("Invalid characters detected during user registration");
		return;
	} else if (SanitizeData(Pword) === false) {
		res.send({Auth: false, message: "Invalid characters detected in Password"});
		console.log("Invalid characters detected during user registration");
		return;
	} else {
		console.log("UserName: ", Uname);
		console.log("Email: ",Email);
		console.log("Phone Number: ", Phone);
		console.log("Pword :",Pword);
	}


	// check if username or email exist in DB



	const sqlSelectEmail = "SELECT * FROM users WHERE email=?;";
    db.query(sqlSelectEmail, [Email], (err, result) => {
        if(err){
            throw err;
        }
        if (result.length < 1) {
			const sqlSelectUserName = "SELECT * FROM users WHERE username=?;";
		    db.query(sqlSelectUserName, [Uname], (err, result) => {
		        if(err){
		            throw err;
		        }
		        if (result.length < 1) {
					bcrypt.hash(Pword, 10).then(function(hash) {
					    console.log("HashPass: ",hash);
						const sqlInsert = "INSERT INTO users (username, password, email, phone) VALUES (?,?,?,?);";
					    db.query(sqlInsert, [Uname, hash, Email, Phone], (err, result) => {
					        if(err) throw err
					    	console.log("registering user...");

					    });
					    // profile table
						const sqlInsert2 = "INSERT INTO profile (username, Birthday, Motto, AboutMe) VALUES (?,?,?,?);";
					    db.query(sqlInsert2, [Uname, "N/A", "N/A","N/A" ], (err, result) => {
					        if(err) throw err

					        console.log("Profile Set");

					    });
					    res.send({Auth: true, user: Uname});
					});
					
		        	return;
		        } else {
					res.send({Auth:false, message: "Username already exists"});
					return;

		        }

		    });
        	return;
        } else {
			res.send({Auth:false, message: "Email already in use"});
			return;
        }

    });


})



const PORT = process.env.SPORT;
const msg = `Listening on Port ${PORT}........`;


app.listen(PORT, () => {
	console.log(msg);
})
