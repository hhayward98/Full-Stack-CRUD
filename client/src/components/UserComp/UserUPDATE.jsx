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

	const [ NewName, setNewName ] = useState("");
	const [ NewBirthDate, setNewBirthDate ] = useState("");
	const [ NewMotto, setNewMotto ] = useState("");
	const [ NewAboutMe, setNewAboutMe ] = useState("");

	const [ Message, setMessage ] = useState("");



	const BdaySubmit = () => {

		axios.post(`${process.env.REACT_APP_HOST}/api/UpdateUser/Bday`, { username:Uname, nbday: NewBirthDate }).then((response) => {

			setMessage(response.message);

		});
	}


	const MottoSubmit = () => {

		axios.post(`${process.env.REACT_APP_HOST}/api/UpdateUser/Motto`, { username:Uname, nmotto: NewMotto }).then((response) => {

			setMessage(response.message);

		});
	}

	const AboutMeSubmit = () => {

		axios.post(`${process.env.REACT_APP_HOST}/api/UpdateUser/AboutMe`, { username:Uname, naboutme: NewAboutMe }).then((response) => {

			setMessage(response.message);

		});
	}

	return (

		<div id="UserUPDATE">
			<h1>{Message}</h1>
			<br/>
			<br/>

			<h3>BirthDay: {BirthDay}</h3>
			<input type="text" name="Bday" onChange={(e) => setNewBirthDate(e.target.value)}/>
			<br/>
			<h3>Update BirthDay</h3>
			<button onClick={BdaySubmit}>Submit</button>
			<br/>
			<br/>
			<div id="motto">
				<h3>My Motto</h3>
				<br/>
				<p>{Motto}</p>
				<br/>
				<br/>
				<textarea id="NewMotto" name="NewMotto" rows="4" cols="40" onChange={(e) => setNewMotto(e.target.value)} />

				<br/>
				<h3> Update Motto </h3>
				<button onClick={MottoSubmit}>Submit</button>
				<br/>
			</div>
			<br/>
			<br />
			<div id="aboutme">
				<h3>All About Me</h3>
				<br/>
				<p>{AbotMe}</p>
				<br/>
				<br/>
				<textarea id="NewAboutMe" name="NewAboutMe" rows="4" cols="40" onChange={(e) => setNewAboutMe(e.target.value)} />
				<br/>
				<h3> Update AboutMe </h3>
				<button onClick={AboutMeSubmit}>Submit</button>
				<br/>

			</div>
			<br/>
			<br/>
		</div>
	);


}; export default UserUPDATE;
