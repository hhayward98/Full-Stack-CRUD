import { useState } from 'react';

import UserUPDATE from './UserComp/UserUPDATE.jsx';
import UserREAD from './UserComp/UserREAD.jsx';
import UserDELETE from './UserComp/UserDELETE';

const UserDashBord = (props) => {

	const [ UPDATEBTN, setUPDATEBTN ] = useState(false);
	const [ READBTN, setREADBTN ] = useState(false);
	const [ DELETEBTN, setDELETEBTN ] = useState(false);

	const User = props.UserInfo;

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
			<h1>Hello {User}</h1>
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
	        {READBTN ? <div id="UserAccount"> <UserREAD/> </div> : null }
	        {UPDATEBTN ? <div id="UpdateAccount"> <UserUPDATE/> </div> : null }
	        {DELETEBTN ? <div id="DeleteAccount"> <UserDELETE/> </div> : null }
		</div>

	);
}; export default UserDashBord;