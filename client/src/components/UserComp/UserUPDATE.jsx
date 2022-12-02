import { useState, useEffect } from "react";
import axios from 'axios';




const UserUPDATE = (props) => {

	// Read user Data From DB 
	// Username, Email, Phone, BirthDate, Bio, ProfilePic, etc,....
	// Display Data to user in a GUI format 
	// have save button to finalize results to be updated server side
	// allow user to hide and show different information

	const UserProfile = props.UserPro;

	const Uname = props.UserPro.username;
	const BirthDay = props.UserPro.bday;
	const Motto = props.UserPro.motto;
	const AbotMe = props.UserPro.aboutme;


	useEffect(() => {


		console.log(Uname);

	});

	return (

		<div id="UserREAD">
			<h3>{BirthDay}</h3>
			<br/>
			<br/>
			<div id="motto">
				<p>Motto</p>
				<br/>
				<textarea id="w3review" name="w3review" rows="4" cols="40">
				{Motto}
				</textarea>
				<br/>
				<br/>
				<input type="text" name="Motto" value="Update info"/>
				<br/>
				<br/>
				<button>Submit</button>
				<br />
				<br />
			</div>
			<br/>
			<br />
			<div id="aboutme">
				<p>All About Me</p>
				<br/>
				<textarea id="w3review" name="w3review" rows="4" cols="40">
				{AbotMe}
				</textarea>
				<br/>
				<br/>
				<input type="text" name="AboutMe" value="Update info"/>
				<br/>
				<br/>
				<button>Submit</button>
				<br />
				<br />

			</div>
			<br/>
			<br/>
		</div>
	);


}; export default UserUPDATE;
