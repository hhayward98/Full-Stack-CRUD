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

	const [ Disable, setDisable] = useState(false);
	const [ DisMotto, setDisMotto ] = useState(false);
	const [ DisAboutMe, setDisAboutMe ] = useState(false);

	useEffect(() => {

		if (NewBirthDate.length < 1) {
			setDisable(false);
		} else {
			setDisable(true);
		}
		
		if (NewAboutMe.length < 1) {
			setDisAboutMe(false);
		} else {
			setDisAboutMe(true);
		}

		if (NewMotto.length < 1) {
			setDisMotto(false);
		} else {
			setDisMotto(true);
		}


	},[NewBirthDate, NewAboutMe, NewMotto]);


	const BdaySubmit = () => {


		axios.post(`${process.env.REACT_APP_HOST}/api/UpdateUser/Bday`, { username:Uname, nbday: NewBirthDate }).then((response) => {

			setMessage(response.data.message);

		});

		setNewBirthDate("");
	}


	const MottoSubmit = () => {

		axios.post(`${process.env.REACT_APP_HOST}/api/UpdateUser/Motto`, { username:Uname, nmotto: NewMotto }).then((response) => {

			setMessage(response.data.message);

		});

		setNewMotto("");
	}

	const AboutMeSubmit = () => {

		axios.post(`${process.env.REACT_APP_HOST}/api/UpdateUser/AboutMe`, { username:Uname, naboutme: NewAboutMe }).then((response) => {

			setMessage(response.data.message);

		});
		setNewAboutMe("");
	}

	return (

		<div id="UserUPDATE">
			<h1 className="text-danger">{Message}</h1>
			<br/>
			<br/>
			<div className="birthday">
				<h3>BirthDay: {BirthDay}</h3>
				<input type="text" name="Bday" value={NewBirthDate} onChange={(e) => setNewBirthDate(e.target.value)}/>
				<br/>
				<h3>Update BirthDay</h3>
				<button disabled={!Disable} onClick={BdaySubmit}>Submit</button>
				<br/>
			</div>
			<br/>
			<div className="motto">
				<h3>My Motto</h3>
				<br/>
				<p>{Motto}</p>
				<br/>
				<br/>
				<textarea id="NewMotto" name="NewMotto" value={NewMotto} rows="4" cols="40" onChange={(e) => setNewMotto(e.target.value)} />

				<br/>
				<h3> Update Motto </h3>
				<button disabled={!DisMotto} onClick={MottoSubmit}>Submit</button>
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
				<textarea id="NewAboutMe" name="NewAboutMe" value={NewAboutMe} rows="4" cols="40" onChange={(e) => setNewAboutMe(e.target.value)} />
				<br/>
				<h3> Update AboutMe </h3>
				<button disabled={!DisAboutMe} onClick={AboutMeSubmit}>Submit</button>
				<br/>

			</div>
			<br/>
			<br/>
		</div>
	);


}; export default UserUPDATE;
