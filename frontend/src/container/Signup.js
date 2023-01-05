import React, {useState} from "react";
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    const [error,setError] = useState('');
    const nav = useNavigate();
    

    const createAccount = async () => {
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
        <p>Create a new account</p>
        {error && <p className="error">{error}</p>}
        <form className="signinform" onSubmit={createAccount}>
            <label htmlFor="email">Email: </label> <br />
            <input 
                type="text" name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                >
            </input> <br/>
            <label htmlFor="password">Password: </label> <br />
            <input 
                type="password" name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                >
            </input> <br/>
            <label htmlFor="cpassword">Confirm Password: </label> <br />
            <input 
                type="cpassword" name="cpassword"
                value={cpassword}
                onChange={e => setCpassword(e.target.value)}
                >
            </input> <br/>
            <input type="submit" name="submit" value="Sign In"></input>
        </form>
        <Link  to="/login"> <p>Already has an account? Log In </p></Link>
        </>
    )

}