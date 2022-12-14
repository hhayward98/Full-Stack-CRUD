import { useState } from "react";
import axios from 'axios';




const Explore = () => {


	// TODO 

	const [ AllPost, setALLPost ] = useState([]);

	const [ Row, setRow ] = useState([]);

	const [ ViewProfile, setViewProfile ] = useState(false);

	function ProfileView(name) {

		console.log("Viewing....", name.target.innerHTML);
	}

	const OnSubmit = () => {
		console.log("Submit press")

		const PostArray = [];

		// send to Server
		axios.post(`${process.env.REACT_APP_HOST}/api/Explore`, { message: "Need Post Data" }).then((response) => {


			const OBJ = response.data.apost;

			const OBJSize = OBJ.length;
			let TempArray = [];

			for (let i = 0; i < OBJ.length; i++) {
				const post = OBJ[i];

				const POST = [post.id, post.username, post.postmessage];
				TempArray.push(POST);
			}

			let RanArray = [];
			let TempArray2 = [];
			let i = 0;
			while (i < OBJSize) {


				const RandNum = Math.floor(Math.random() * (OBJSize - 0) + 0);

				if (RanArray.includes(RandNum) === false) {
					TempArray2.push(TempArray[RandNum]);
					i++;
				}


				if (i === OBJSize) {
					PostArray.push(TempArray2);
					TempArray2 = [];
				}

				if (TempArray2.length === 3) {
					PostArray.push(TempArray2);
					TempArray2 = [];
				}

				
			}

			setRow(PostArray);
			
		});




	}

	return (

		<div>


			{ViewProfile ? 
				<div>
					<h1>Test</h1>
				</div>


				:


				<div id="Explore">
					<h1>Explore Page</h1>
					<br/>
					<button onClick={OnSubmit}>Refresh</button>
					<br/>
					<div id="AllUserPost">
						{Row.map((item, index) => (
							<div className="row">
								{item.map((item2, index2) => (
									<div className="col-md-4">
										<h3 onClick={ProfileView}>{item2[1]}</h3>
										
										<br/>
										<div className="Butt">
											<textarea defaultValue={item2[2]}/>
										</div>
									</div>
								))}
							</div>
						))}

					</div>
				</div>

			}
		</div>


	);


}; export default Explore;
