import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "./useUser";


export default function CreateUsername () {
    const [username,setUsername] = useState('');
    const nav = useNavigate();
    const {user} = useUser();

    
    const handleSubmit = async () => {
        const token = user && await user.getIdToken();
        const respond = await axios.post(`http://localhost:8000/api/signup/${username}`, {},
        { "headers" : { "Content-Type": "application/json" , authtoken : token }})
        .catch(function(error) {console.log(error);});
        if (respond.status === false) {
            alert('Username existed. Please try again.');
            return;
        } else {
            alert('User successfully created.');
            nav("/note");}
        }

return (
    <>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label> <br />
                <input 
                    type="text" name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    >
            </input> <br/>
        <input type="submit" value="Create"></input>
        </form>
    </>
    )
}
