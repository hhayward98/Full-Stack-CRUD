import { useState } from "react";
import axios from 'axios';


const LoginC = () => {

	const [ UserName, setUserName ] = useState("");
	const [ PassWord, setPassWord ] = useState("");

	const [ Message, setMessage ] = useState("");

	const [ Match, setMatch ] = useState(false);


	const OnSubmit = () => {

		axios.post(`${process.env.REACT_APP_HOST}/api/LoginSubmit`, { Username: UserName, Password: PassWord }).then((response) => {
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
		setMessage("");

	}

	return (

		<div id="LoginC">
			<h1>Login Stuff</h1>
			<br/>
			<h3 className="text-danger">{Message}</h3>
			<br />
			<h3>UserName </h3>
			<input type="username" name="UserName" value={UserName} onChange={(e) => setUserName(e.target.value)} /><br />
			<br />
			<h3>Password</h3>
			<input type="password" name="Password" value={PassWord} onChange={(e) => setPassWord(e.target.value)} /><br />
			<br/>
			<button onClick={OnSubmit}>Submit</button>
		</div>
	);
}; export default LoginC; 
