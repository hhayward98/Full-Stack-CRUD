const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv').config()






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





const PORT = process.env.SPORT;
const msg = ` Listening on Port ${PORT}........`;


app.listen(PORT, () => {
	console.log(msg);
})
