import { useState } from "react";
import axios from 'axios';




const UserREAD = () => {


	// Read user Data From DB 
	// Username, Email, Phone, BirthDate, Bio, ProfilePic, etc,....
	// Display Data to user in athestic format 
	// allow user to view how others see thier profile 
	 

	return (

		<div id="UserREAD">
			<h3>Display BirthDay</h3>
			<br/>
			<br/>
			<div id="motto">
				<p>Motto</p>
				<br/>
				<textarea id="w3review" name="w3review" rows="4" cols="40">
				display Motto Here
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
				display All About Me Here
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


}; export default UserREAD;
