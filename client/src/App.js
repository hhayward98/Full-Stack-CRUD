
import LoginC from './components/LoginC.jsx';
import RegisterC from './components/RegisterC.jsx';
import UserDashBord from './components/UserDashBord.jsx';
import './App.css';
import { useState } from "react";

function App() {

  const [ LoginBTN, setLoginBTN ] = useState(false);
  const [ RegisterBTN, setRegisterBTN ] = useState(false);

  const [ IsLoggedIn, setIsLoggedIn ] = useState(false);
  const [ User, setUser ] = useState("");


  const ValidateUser = (auth, user) => {

    if (auth === true) {
      setLoginBTN(false);
      setRegisterBTN(false);
      setIsLoggedIn(true);
      setUser(user);
    }

  }

  const LogUserIn = () => {
    console.log("Loging user in");
    setLoginBTN(true);
    setRegisterBTN(false);

  }

  const RegisterUser = () => {
    console.log("registering User....");
    setLoginBTN(false);
    setRegisterBTN(true);
  }

  const LogoutUser = () => {
    setLoginBTN(false);
    setRegisterBTN(false);
    setIsLoggedIn(false);
    setUser("");
  }




  return (
    <div className="App">
      <header className="App-header">
        {IsLoggedIn ? 
          <div id="LoggedIn">
            <div id="logoutDiv">
              <button onClick={LogoutUser}>Logout</button>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <UserDashBord UserInfo={User}/>
          </div>

          :

          <div id="NotLoggedIn">
            <h1>Welcome to the UnderGround</h1>
            <br />
            <h3> Login or Register to continue</h3>
            <br/>
            <div className="row">
              <div className="col">
                <button onClick={LogUserIn} >Login</button>
              </div>
              <div className="col">
                <button onClick={RegisterUser} >Register</button>
              </div>
            </div>
            {LoginBTN ? <LoginC FunProp={ValidateUser}/> : null }
            {RegisterBTN ? <RegisterC FunProp={ValidateUser}/> : null }
          </div>
        }
      </header>
    </div>
  );
}

export default App;
