import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const nav = useNavigate();

    const logIn = async(event) => {
        event.preventDefault();
        try {
        await signInWithEmailAndPassword(getAuth(),email,password);
        nav("/note/create");
        }
        catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
        {error && <p className="error">{error}</p>}
        <form className="signinform">
            <label htmlFor="email">Email: </label> <br />
            <input 
                type="text" name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                >
            </input> <br/>
            <label htmlFor="password">Password: </label> <br />
            <input 
                type="text" name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                >
            </input> <br/>
            <button onClick={logIn}>Sign In</button>
        </form>
        <p>Do not have an account? <Link to="/signup"><span>Sign Up</span></Link></p>
        </>
    )

}