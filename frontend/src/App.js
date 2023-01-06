import React, { useState, useEffect }  from "react";
import NavBar from './NavBar';
import Routes from './Route';
import useUser from "./container/useUser";
import axios from "axios";

function App() {
  const {user} = useUser();
  const [username,setUsername] = useState();

  useEffect( () => {
    const load = async () => {
    const uid = user &&  user.uid ;
    console.log(uid);
    //get username
    const response = await axios.get(`http://localhost:8000/api/getusername/${uid}`);
    setUsername(response.data);
    } 
    load();}
,[user])

  return (
        <div className="App">
        <NavBar />
        {user? <p className="greeting">Hello, {username}!</p> : <p className="greeting">Hello, my friend!</p> }
        <Routes />
        </div>
  );
}

export default App;
