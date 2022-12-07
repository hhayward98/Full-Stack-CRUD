import { useState } from "react";
import axios from 'axios';



// componet is used for posting conetent for all users to see.


const UserPostC = () => {

	// dedicate DB table for users to add/update/read/delete from
	// DB table includes user id for tracking and authentication.
	// User ID has to equal Message Auth ID to make edits to message 

	const [ PostMsg, setPostMsg ] = useState("");



	const [ Dis , setDis ] = useState(false);


	const OnSubmit = () => {
		console.log("Submit press")
	}

	return (

		<div id="MakePost">

			<h1>make a Post</h1>
			<br/>
			<textarea id="PostMSG" name="PostMSG" value={PostMsg} rows="4" cols="40" onChange={(e) => setPostMsg(e.target.value)} />

			<br/>
			<h3> Update Motto </h3>
			<button disabled={Dis} onClick={OnSubmit}>Submit</button>
			<br/>
		</div>
	);


}; export default UserPostC;
