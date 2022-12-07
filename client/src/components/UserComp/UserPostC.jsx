import { useState, useEffect } from "react";
import axios from 'axios';



// componet is used for posting conetent for all users to see.


const UserPostC = (props) => {

	// dedicate DB table for users to add/update/read/delete from
	// DB table includes user id for tracking and authentication.
	// User ID has to equal Message Auth ID to make edits to message 

	const Uname = props.UserPro.username;

	const [ PostMsg, setPostMsg ] = useState("");

	const [ SrvMsg, setSrvMsg ] = useState("");
	const [ TL, setTL ] = useState("");
	const [ Dis , setDis ] = useState(true);

	useEffect(() => {

		if (PostMsg.length < 1) {
			setDis(true);
		} else if (PostMsg.length > 240) {
			setDis(true);
			setTL("Message is too long!");
		}else {
			setDis(false);
			setTL("");
		}


	},[PostMsg]);

	const OnSubmit = () => {
		console.log("Submit press")

		// send to Server
		axios.post(`${process.env.REACT_APP_HOST}/api/UserPost`, { username: Uname, postmsg: PostMsg }).then((response) => {

			console.log(response.data.message);
			setSrvMsg(response.data.message);

		});

		setPostMsg("");

	}

	return (

		<div id="MakePost">

			<h1>make a Post</h1>
			<br/>
			<h4> {SrvMsg} </h4>
			<br/>
			<p className="text-danger">{TL}</p>
			<textarea id="PostMSG" name="PostMSG" value={PostMsg} rows="4" cols="40" onChange={(e) => setPostMsg(e.target.value)} />

			<br/>
			<br/>
			<button disabled={Dis} onClick={OnSubmit}>Post Message</button>
			<br/>
		</div>
	);


}; export default UserPostC;
