import { useState } from "react";




const ValidUser = () => {


	const [ ADDBTN, setADDBTN ] = useState(false);
	const [ UPDATEBTN, setUPDATEBTN ] = useState(false);
	const [ READBTN, setREADBTN ] = useState(false);
	const [ DELETEBTN, setDELETEBTN ] = useState(false);


	return (

		<div id="ValidUser">
			<h1>CRUD</h1>
			<br/>
	        <div className="row">
	          <div className="col">
	            <button >ADD</button>
	          </div>
	          <div className="col">
	            <button >UPDATE</button>
	          </div>
	          <div className="col">
	            <button >READ</button>
	          </div>
	          <div className="col">
	            <button >DELETE</button>
	          </div>
	        </div>
		</div>


	);
}; export default ValidUser;