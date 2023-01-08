import React  from "react";
import NavBar from './NavBar';
import Routes from './Route';
import useUser from "./container/useUser";

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
