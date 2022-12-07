import { useState, useEffect } from 'react';
import axios from 'axios';

const MyPostC = (props) => {

	const Uname = props.UserPro.username;

	// all users post
	const [ AUP, setAUP ] = useState({});


	const [ Row, setRow ] = useState({});


	const [ COL, setCOL ] = useState({});


	const Refresh = () => {
		axios.post(`${process.env.REACT_APP_HOST}/api/ReadMyPost`, { username: Uname }).then((response) => {
			console.log(response.data.apost);
			setAUP(response.data.apost);
			
			const PostAmount = AUP.length;


		});



	}


	return (

		<div>

			<button onClick={Refresh}>Refresh</button>
			<br/>
			<br/>
			<div id="AllUserPost">
				<div className="row">
					<div className="col">
						<h1>Post</h1>
					</div>
				</div>
			</div>
		</div>
	);
}; export default MyPostC;