import { useState, useEffect } from "react";
import axios from 'axios';




const UserREAD = (props) => {



	// Read user Data From DB 
	// Username, Email, Phone, BirthDate, Bio, ProfilePic, etc,....
	// Display Data to user in athestic format 
	// allow user to view how others see thier profile 
	 
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
				<p>My Motto</p>
				<br/>
				<textarea id="w3review" name="w3review" rows="4" cols="40">
				{Motto}
				</textarea>
				<br/>
				<br/>
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

			</div>
			<br/>
			<br/>
		</div>
	);


}; export default UserREAD;
