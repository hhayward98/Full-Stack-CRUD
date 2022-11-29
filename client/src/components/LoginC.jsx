import { useState } from "react";
import axios from 'axios';


const LoginC = () => {

	const [ UserName, setUserName ] = useState("");
	const [ PassWord, setPassWord ] = useState("");



	const OnSubmit = () => {

		axios.post(`${process.env.REACT_APP_HOST}/api/LoginSubmit`, { Username: UserName, Password: PassWord }).then((response) => {
			console.log("Request made to server...");
			if (response.data.Auth === true) {
				// props.Test(response.data.Auth);
				console.log("Yayyy");
			};
		});

		setUserName("");
		setPassWord("");

	}

	return (

		<div id="LoginC">
			<h1>Login Stuff</h1>
			<br/>
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
