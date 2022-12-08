import { useState, useEffect } from 'react';
import axios from 'axios';

const MyPostC = (props) => {

	const Uname = props.UserPro.username;

	// all users post


	const [ Row, setRow ] = useState([]);

	const PostArray = [];



	const [ Dmode, setDmode ] = useState(false);
	const [ PDid, setPDid ] = useState("");

	const [ Message, setMessage ] = useState("");



	const DeletePost = (ID) => {

		console.log("Removing post...");

		const PostID = ID.target.id;
		
		axios.post(`${process.env.REACT_APP_HOST}/api/DeletePost`, { username: Uname, postid: PostID }).then((response) => {

			console.log(response.data.message);
			setMessage(response.data.message);

		});

	}


	const Refresh = () => {
		setMessage("");
		const PostArray = [];
		axios.post(`${process.env.REACT_APP_HOST}/api/ReadMyPost`, { username: Uname }).then((response) => {
			const OBJ = response.data.apost;
			// console.log(OBJ);

			let TempArray = [];

			for (let i = 0; i < OBJ.length; i++) {

				const Data = OBJ[i];

				const POST = [Data.id, Data.username, Data.postmessage];

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
			// console.log(PostArray);

		});


	}


	return (

		<div>

			<button onClick={Refresh}>Refresh</button>
			<br/>
			<br/>
			<h3 className="text-danger">{Message}</h3>
			<br/>

			<div id="AllUserPost">
				{Row.map((item, index) => (
					<div className="row">
						{item.map((item2, index2) => (
							<div className="col-md-4">
								<h3>{item2[1]}</h3>
								
								<br/>
								<div className="Butt">
									<p>{item2[2]}</p>
								</div>

								<div >
									<button  id={item2[0]} diabled={Dmode} onClick={DeletePost}>X</button>
								</div>
							</div>
						))}
					</div>
				))}

			</div>
		</div>
	);
}; export default MyPostC;