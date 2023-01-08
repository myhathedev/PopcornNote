import React, {useState} from "react";
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { Link, useNavigate, Navigate } from "react-router-dom";
import './Signup.css';
import useUser from "./container/useUser";

export default function SignUp() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    const [error,setError] = useState('');
    const nav = useNavigate();
    const {user} = useUser();
    

    const createAccount = async (event) => {
        event.preventDefault();
        try {
            if (password !== cpassword) {
                setError('Password does not match.');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(),email,password);
            nav("/createusername");
        }
        catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
        {user? <Navigate to="/notfound" replace/> :
        <div className="signuppage">
        <p className="howdy">Create a new account</p>
        <form className="signupform" onSubmit={createAccount}>
        <div className="formitem">
            <label className="label" htmlFor="email">Email: </label> <br />
            <input 
                type="text" name="email"
                className="signininput"
                require="true" size="30"
                value={email}
                onChange={e => setEmail(e.target.value)}>
            </input> <br/>
        </div>
        <div className="formitem">
              <label className="label" htmlFor="password">Password: </label> <br />
            <input 
                type="password" name="password"
                className="signininput"
                require="true" size="30"
                value={password}
                onChange={e => setPassword(e.target.value)}>
            </input> <br/>
        <label className="label" htmlFor="cpassword">Confirm Password: </label> <br />
            <input 
                type="password" name="cpassword"
                className="signininput"
                require="true" size="30"
                value={cpassword}
                onChange={e => setCpassword(e.target.value)}>
            </input> <br/>
        </div>
        <div className="formitem">
            <input className="signupbutton" type="submit" name="submit" value="Sign Up"></input>
            {error && <p className="error">{error}</p>}       
        </div>
      </form>
        <p>Already have an account? <Link className="link"  to="/login"><span className="signin">Log In</span></Link> </p>
        </div>}
        </>
    )

}