import { useState } from 'react';

import UserUPDATE from './UserComp/UserUPDATE.jsx';
import UserREAD from './UserComp/UserREAD.jsx';
import UserDELETE from './UserComp/UserDELETE';

const UserDashBord = () => {

	const [ UPDATEBTN, setUPDATEBTN ] = useState(false);
	const [ READBTN, setREADBTN ] = useState(false);
	const [ DELETEBTN, setDELETEBTN ] = useState(false);


	const UpdateUser = () => {
		setDELETEBTN(false);
		setREADBTN(false);
		setUPDATEBTN(true);
	}

	const ReadUser = () => {
		setDELETEBTN(false);
		setREADBTN(true);
		setUPDATEBTN(false);
	}

	const DeleteUser = () => {
		setDELETEBTN(true);
		setREADBTN(false);
		setUPDATEBTN(false);

	}

	// add explore page for users to view post or other profiles.
	// const ExplorePage = () => {
	// 	console.log("Loading Explore Page...");
	// }


	// add Make a post and post for all users to view and allow post to be deleted

	return (


		<div id="DashBord">
			<h1>CRUD</h1>
			<br/>
	        <div className="row">
	          <div className="col">
	            <button onClick={UpdateUser}>UPDATE</button>
	          </div>
	          <div className="col">
	            <button onClick={ReadUser} >READ</button>
	          </div>
	          <div className="col">
	            <button onClick={DeleteUser} >DELETE</button>
	          </div>
	        </div>
	        <br/>
	        {READBTN ? <div id="UserAccount"> <p>Fetch user Info from server and display info with format</p> </div> : null }
	        {UPDATEBTN ? <div id="UpdateAccount"> <p>fetch user info and make updates to DB </p> </div> : null }
	        {DeleteUser ? <div id="DeleteAccount"> <p>log user out and delete account from DB </p> </div> : null }
		</div>

	);
}; export default UserDashBord;