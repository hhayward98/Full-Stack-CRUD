const express = require('express')
const bodyParser = require ('body-parser')
const bcrypt = require("bcrypt")
const cors = require('cors')
const app = express()
const dotenv = require('dotenv').config()



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

	console.log(Uname, Pword);

	res.send({Auth: true});


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


	bcrypt.hash(Pword, 10).then(function(hash) {
	    console.log("HashPass: ",hash);
	})



	// if username/email dose NOT exist in DB then, 
	console.log("registering user...");
	res.send({Auth: true});

})



const PORT = process.env.SPORT;
const msg = `Listening on Port ${PORT}........`;


app.listen(PORT, () => {
	console.log(msg);
})
