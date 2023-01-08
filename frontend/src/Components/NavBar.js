import React  from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";


export default function NavBar({user}) {
  return (

    <nav className="navbar">
      <ul>    
        <Link to="/" className="navitem"><li>Home</li></Link>
        <Link to="/note/create" className="navitem"><li>Your Note</li></Link>
         {user? 
        <Link to="/logout" className="navitem"><li>Log Out</li></Link>
        :
        <>
          <Link to="/login" className="navitem"><li>Log In</li></Link>
          <Link to="/signup" className="navitem"><li>Sign Up</li></Link>
          </>
        }
        <Link to="/contactus" className="navitem"><li>Contact Us</li></Link>
      </ul>         
    </nav>
  );
}
