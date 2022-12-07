import { useState, useEffect } from 'react';
import axios from 'axios';
import UserUPDATE from './UserComp/UserUPDATE.jsx';
import UserREAD from './UserComp/UserREAD.jsx';
import UserDELETE from './UserComp/UserDELETE.jsx';
import UserPostC from './UserComp/UserPostC.jsx';
import MyPostC from './UserComp/MyPostC.jsx';

const UserDashBord = (props) => {

	const [ UPDATEBTN, setUPDATEBTN ] = useState(false);
	const [ READBTN, setREADBTN ] = useState(false);
	const [ DELETEBTN, setDELETEBTN ] = useState(false);
	const [ PostBTN, setPostBTN ] = useState(false);
	const [ MyPostBTN, setMyPostBTN ] = useState(false);

	const [ HasProfile, setHasProfile] = useState(false);
	const [ Profile, setProfile ] = useState({});

	const User = props.UserInfo;


	const UpdateUser = () => {
		axios.post(`${process.env.REACT_APP_HOST}/api/ReadUserProfile`, {username:User}).then((response) => {

			setProfile(response.data);
			setHasProfile(true);
		});
		setDELETEBTN(false);
		setREADBTN(false);
		setUPDATEBTN(true);
		setPostBTN(false);
		setMyPostBTN(false);
	}

	const ReadUser = () => {
		axios.post(`${process.env.REACT_APP_HOST}/api/ReadUserProfile`, {username:User}).then((response) => {

			setProfile(response.data);
			setHasProfile(true);
		});

		setDELETEBTN(false);
		setREADBTN(true);
		setUPDATEBTN(false);
		setPostBTN(false);
		setMyPostBTN(false);
	}

	const UserPost = () => {
		

		setDELETEBTN(false);
		setREADBTN(false);
		setUPDATEBTN(false);
		setPostBTN(true);
		setMyPostBTN(false);
	}

	const MyPost = () => {

		setDELETEBTN(false);
		setREADBTN(false);
		setUPDATEBTN(false);
		setPostBTN(false);
		setMyPostBTN(true);
	}

	const DeleteUser = () => {
		setDELETEBTN(true);
		setREADBTN(false);
		setUPDATEBTN(false);
		setPostBTN(false);
		setMyPostBTN(false);

	}

	const FetchUser = () => {
		axios.post(`${process.env.REACT_APP_HOST}/api/ReadUserProfile`, {username:User}).then((response) => {

			setProfile(response.data);
			setHasProfile(true);
		});
	}

	// add explore page for users to view post or other profiles.
	// const ExplorePage = () => {
	// 	console.log("Loading Explore Page...");
	// }


	// add Make a post and post for all users to view and allow post to be deleted

	return (


		<div id="DashBord">

			{HasProfile ? 
		        <div className="row">
		          	<div className="col">
		            	<button onClick={UpdateUser}>UPDATE</button>
		          	</div>
		          	<div className="col">
		            	<button onClick={ReadUser} >READ</button>
		          	</div>
		          	<div className="col">
		            	<button onClick={UserPost} >Make Post</button>
		          	</div>
		          	<div className="col">
		            	<button onClick={MyPost} >My Post</button>
		          	</div>
		          	<div className="col">
		            	<button onClick={DeleteUser} >DELETE</button>
		          	</div>
		        </div>
				
				:
				<div> 
					<button onClick={FetchUser}>View Profile</button>
				</div>
			}
	        <br />
	        <br/>
			<h1>Hello {User}</h1>
			<br/>
	        {READBTN ? <div id="UserAccount"> <UserREAD UserPro={Profile}/> </div> : null }
	        {UPDATEBTN ? <div id="UpdateAccount"> <UserUPDATE UserPro={Profile}/> </div> : null }
	        {PostBTN ? <div id="MakeAPost"> <UserPostC UserPro={Profile}/> </div> : null}
	        {MyPostBTN ? <div id="MyPost"> <MyPostC UserPro={Profile}/> </div> : null}
	        {DELETEBTN ? <div id="DeleteAccount"> <UserDELETE/> </div> : null }


		</div>

	);
}; export default UserDashBord;