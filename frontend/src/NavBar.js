import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import "./NavBar.css";
import useUser from './container/useUser';
import { signOut,getAuth } from 'firebase/auth';

export default function NavBar() {
  const {user} = useUser();
  const nav = useNavigate();
  return (
    <nav className="navbar">
      <ul>    
        <Link to="/" className="navitem"><li>Home</li></Link>
        <Link to="/note/create" className="navitem"><li>Your Note</li></Link>
        <Link to="/contactus" className="navitem"><li>Contact Us</li></Link>
        {user? 
        <li onClick={()=> {signOut(getAuth());nav("/");}}>Log Out</li>
        :<Link to="/login" className="navitem"><li>Log In</li></Link>
      }
      </ul>         
    </nav>
  );
}
