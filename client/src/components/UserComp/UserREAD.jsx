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


		// console.log(Uname);

	});

	return (

		<div id="UserREAD">
			<h4>BirthDay: {BirthDay}</h4>
			<br/>
			<br/>
			<div className="motto">
				<p>{Motto}</p>
				<br/>

			</div>
			<br/>
			<br />
			<div className="aboutme">
				<h3>All About Me</h3>
				<br/>
				<p>{AbotMe}</p>
				<br/>
				<br/>
			</div>
			<br/>
			<br/>
		</div>
	);


}; export default UserREAD;
