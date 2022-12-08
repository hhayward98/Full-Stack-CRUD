import { useState, useEffect } from 'react';
import axios from 'axios';

const MyPostC = (props) => {

	const Uname = props.UserPro.username;

	// all users post


	const [ Row, setRow ] = useState([]);


	const PostArray = [];



	const Refresh = () => {

		const PostArray = [];
		axios.post(`${process.env.REACT_APP_HOST}/api/ReadMyPost`, { username: Uname }).then((response) => {
			const OBJ = response.data.apost;
			console.log(OBJ);

			let TempArray = [];

			for (let i = 0; i < OBJ.length; i++) {

				const Data = OBJ[i];

				console.log("OBJ Length: ",OBJ.length);
				console.log("Current I: ", i);
				console.log("Next I: ", i+1);


				const POST = [Data.username, Data.postmessage];

				TempArray.push(POST);

				
				if (i+1 == OBJ.length) {
					PostArray.push(TempArray);
					TempArray = [];
				}


				if (TempArray.length == 3) {
					PostArray.push(TempArray);
					TempArray = [];
				}

			}

			setRow(PostArray);
			console.log(PostArray);

		});


	}


	return (

		<div>

			<button onClick={Refresh}>Refresh</button>
			<br/>
			<br/>
			<div id="AllUserPost">
				{Row.map((item, index) => (
					<div className="row">
						{item.map((item2, index2) => (
							<div className="col-md-4">

									
								<h3>{item2[0]}</h3>
								
								<br/>
								<div>
									<p>{item2[1]}</p>
								</div>
								<br/>
								<br/>
								<div>
									<button>X</button>
								</div>
							</div>
						))}
					</div>
				))}

			</div>
		</div>
	);
}; export default MyPostC;