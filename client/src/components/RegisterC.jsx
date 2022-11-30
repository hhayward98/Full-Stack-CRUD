import { useState, useEffect } from "react";
import axios from 'axios';


const RegisterC = () => {

	const [ UserName, setUserName ] = useState("");
	const [ PassWord, setPassWord ] = useState("");
	const [ ConfPass, setConfPass ] = useState("");
	const [ Email, setEmail ] = useState("");
	const [ Phone, setPhone ] = useState("");

	const [ Message, setMessage ] = useState("");


	const [ MatchErr, setMatchErr] = useState("");
	const [ Match, setMatch ] = useState(true);

	useEffect(() => {
		if (PassWord !== ConfPass) {
			setMatchErr("Passwords do not Match!");
			setMatch(false);
		} else if (PassWord === ConfPass) {
			setMatch(true);
			setMatchErr("");
		}

	},[PassWord, ConfPass]);


	const OnSubmit = () => {

		if (UserName.length < 1) {
			setMessage("Username cant be empty");
			return;
		} else if (Email.length < 1) {
			setMessage("Email cant be empty");
			return;
		} else if (PassWord < 1) {
			setMessage("Password Cant be empty");
			return;
		}

		// middle ware here




		axios.post(`${process.env.REACT_APP_HOST}/api/RegisterUser`, { Username: UserName, Password: PassWord, email: Email, phone: Phone }).then((response) => {
			console.log("Request made to server...");
			if (response.data.Auth === true) {
				// props.Test(response.data.Auth);
				console.log("Yayyy");
			} else if (response.data.Auth === false) {
				const Msg = response.data.message;
				setMessage(Msg);
				return;
			}
		});



		setUserName("");
		setPassWord("");
		setConfPass("");
		setEmail("");
		setPhone("");
		setMessage("");

	}

	return (

		<div id="RegisterC">
			<h1>Register User</h1>
			<br/>
			<h3 className="text-danger">{Message}</h3>
			<br/>
			<h3>UserName </h3>
			<input type="username" name="UserName" value={UserName} onChange={(e) => setUserName(e.target.value)} /><br />
			<br />
			<h3>Email </h3>
			<input type="text" name="Email" value={Email} onChange={(e) => setEmail(e.target.value)} /><br />
			<br />
			<h3>Phone (optional) </h3>
			<input type="text" name="Phone" value={Phone} onChange={(e) => setPhone(e.target.value)} /><br />
			<br />
			<h4 className="text-danger">{MatchErr}</h4>
			<br/>
			<h3>Password</h3>
			<input type="password" name="Password" value={PassWord} onChange={(e) => setPassWord(e.target.value)} /><br />
			<br/>
			<h3>Password conformation</h3>
			<input type="password" name="PasswordC" value={ConfPass} onChange={(e) => setConfPass(e.target.value)} /><br />
			<br/>
			<button disabled={!Match} onClick={OnSubmit}>Submit</button>
		</div>

	);
}; export default RegisterC;