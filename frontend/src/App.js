import React  from "react";
import NavBar from './Components/NavBar';
import Routes from './Components/Route';
import useUser from "./hook/useUser";

function App() {
  const {user,isLoading,username} = useUser();
  return (
      <div className="App">
        {isLoading? <p>Loading...</p>
        : <div>
          <NavBar user={user} />
          {username? <p className="greeting">Hello, {username}!</p>
          :<p className="greeting">Hello, visitor!</p>}
          <Routes />
        </div>}
      </div>
  );
}

export default App;
