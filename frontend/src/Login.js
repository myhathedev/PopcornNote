import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { Link } from "react-router-dom";
import "./Login.css";

export default function LogIn() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');


    const logIn = async(event) => {
        event.preventDefault();
        try {
        await signInWithEmailAndPassword(getAuth(),email,password);
        window.location.replace("/note/create");
        }
        catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
        <div className="signinpage">
            <p className="howdy">Howdy, Popcorn Member!</p>
        <form className="signinform">
        <div className="formitem">
            <label className="label" htmlFor="email">Email: </label> <br />
            <input 
                type="text" name="email" 
                className="signininput"
                require="true" size="30"
                value={email}
                onChange={e => setEmail(e.target.value)}
                >
            </input> <br/>
        </div>
        <div className="formitem">
            <label className="label" htmlFor="password">Password: </label> <br />
            <input 
                className="signininput"
                type="password" name="password"
                require="true" size="30"
                value={password}
                onChange={e => setPassword(e.target.value)}
                >
            </input> <br/>
        </div>
        <div className="formitem">
            <button className="signinbutton" onClick={logIn}>Sign In</button>
            {error && <p className="error">{error}</p>}
        </div>
        </form>
        <p>Do not have an account? <Link to="/signup" className="link"><span className="signup">Sign Up</span></Link></p>
        </div>
        </>
    )

}