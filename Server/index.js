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

// SQL inject against = to validate if secure
function SanitizeData2(data) {
    if (data.includes("`") === true ) {
        return false;
    } else if (data.includes("--") === true) {
        return false;
    } else if (data.includes("<?") === true) {
        return false;
    } else if (data.includes("';") === true) {
        return false;
    } else {
        return true;
    }
}


function GetDATETIME() {

	const TimeNow = new Date();
	const day = ("0" + TimeNow.getDate()).slice(-2);
	const month = ("0" + (TimeNow.getMonth() + 1)).slice(-2);
	const year = TimeNow.getFullYear();
	const hours = TimeNow.getHours();
	const minutes = TimeNow.getMinutes();
	const seconds = TimeNow.getSeconds();

	const DATETIME = year+ "-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds+".000";

	return DATETIME;
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
		console.log("running....");
	}

	const sqlSelect = "SELECT * FROM users WHERE username=?;";
    db.query(sqlSelect, [Uname], (err, result) => {
        if(err){
            throw err;
        }
        if (result.length > 0) {
	        bcrypt.compare(Pword, result[0].password, function(err, result) {
	            if (result) {
	            	console.log("Match Found, bcrypt worked!");
	            	res.send({Auth: true, user: Uname});

	            } else {
	            	console.log("Error, Invalid Login Attempt!");
	                res.send({Auth: false, message: "Error, Invalid Login Attempt!" });
	           	}
	        });
        } else {
            console.log("Error, Invalid Login Attempt!");
            res.send({Auth: false, message: "Error, Invalid Login Attempt!" });
        }

    });


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
		console.log("Running....");
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
					
		        	
		        } else {
					res.send({Auth:false, message: "Username already exists"});
					return;

		        }

		    });
        	
        } else {
			res.send({Auth:false, message: "Email already in use"});
			return;
        }

    });


})

// Read User Profile
app.post("/api/ReadUserProfile", (req, res) => {

	// validate session for profile
	const Uname = req.body.username;
	console.log("Fetching Profile for User: ", req.body.username);

	if (SanitizeData(Uname) === false) {
		res.send({Auth: false, message:"Invalid characters detected"})
		return;
	} else {

		const sqlSelectUserName = "SELECT * FROM profile WHERE username=?;";
	    db.query(sqlSelectUserName, [Uname], (err, result) => {
	        if(err){
	            throw err;
	        }


	        if (result.length < 1) {
	        	console.log("Empty");
	        } else {
		        const Uname = result[0].username;
		        const Birthday = result[0].Birthday;
		        const Motto = result[0].Motto;
		        const AboutMe = result[0].AboutMe;


		        res.send({username:Uname, bday:Birthday, motto:Motto, aboutme:AboutMe});

	        	console.log("Sent Profile Info");

	        }


	    });
	}


})



// update profile
app.post("/api/UpdateUser/Bday", (req, res) => {
	const Uname = req.body.username;
	console.log("Updating User ",Uname);
	
	const Nbday = req.body.nbday;
	

	if (SanitizeData2(Nbday) === false) {
		res.send({message: "Invalid characters detected"});
		console.log("Invalid characters detected by ", Uname);
		return;
	} else {
		console.log("Updating User profile.....");
	}


    const sqlUpdate = "UPDATE profile SET Birthday = ? WHERE  username = ?";
    db.query(sqlUpdate, [Nbday, Uname], (err, result)=>{
        if(err)  throw err;
        console.log("Server changed: ", Nbday, "to", Uname)
        
        res.send({message: "Profile Updated"});
        return;
    });



})


app.post("/api/UpdateUser/Motto", (req, res) => {
	const Uname = req.body.username;
	console.log("Updating User ",Uname);
	const Nmotto = req.body.nmotto;

	if (SanitizeData2(Nmotto) === false) {
		res.send({message: "Invalid characters detected"});
		console.log("Invalid characters detected by ", Uname);
		return;
	} else {

		console.log("Updating User profile.....");
	}


    const sqlUpdate = "UPDATE profile SET Motto = ? WHERE  username = ?";
    db.query(sqlUpdate, [Nmotto, Uname], (err, result)=>{
        if(err)  throw err;
        console.log("Server changed: ", Nmotto, "to", Uname)
        
        res.send({message: "Profile Updated"});
        return;
    });


});


app.post("/api/UpdateUser/AboutMe", (req, res) => {
	const Uname = req.body.username;
	console.log("Updating User ",Uname);
	const Naboutme = req.body.naboutme;


	if (SanitizeData2(Naboutme) === false) {
		res.send({message: "Invalid characters detected"});
		console.log("Invalid characters detected by ", Uname);
		return;
	} else {
		console.log("Updating User profile.....");
		
	}

    const sqlUpdate = "UPDATE profile SET AboutMe = ? WHERE  username = ?";
    db.query(sqlUpdate, [Naboutme, Uname], (err, result)=>{
        if(err)  throw err;
        console.log("Server changed: ", Naboutme, "to", Uname)
        res.send({message: "Profile Updated"});
        return;
    });


});


// User make Post
app.post("/api/UserPost", (req, res) => {

	const Uname = req.body.username;
	const Pmsg = req.body.postmsg;


	if (SanitizeData2(Pmsg) === false) {
		res.send({message: "Invalid characters detected"});
		console.log("Invalid characters detected by ", Uname);
		return;
	} else {
		console.log("Making Post for ", Uname);
		
	}

	const datetime = GetDATETIME();
    const SQLPostINS = "INSERT INTO apost (username, postmessage, datetime) VALUES (?,?,?)";
    db.query(SQLPostINS, [Uname, Pmsg, datetime ], (err, result) => {
        if(err) throw err
		res.send({message: "Congrats, you made a Post!"});
		return;

    });




})

// view Post
app.post("/api/ReadMyPost", (req, res) => {

	const Uname = req.body.username;

	const SQLREADp = "SELECT * FROM apost WHERE username=?";
	db.query(SQLREADp, [Uname], (err, result) => {
		if(err) throw err

		res.send({message:"Success", apost: result});
	})

})

// User Update Post
// app.post()

// User Delete Post
// app.post()




const PORT = process.env.SPORT;
const msg = `Listening on Port ${PORT}........`;


app.listen(PORT, () => {
	console.log(msg);
})
