import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "./container/useUser";


export default function Createusername () {
    const [username,setUsername] = useState('');
    const nav = useNavigate();
    const {user} = useUser();
    const [error,setError]=useState('');
    const [noti,setNoti] = useState('');

    
    const createname = async (event) => {
        event.preventDefault(); 
        try {
            const token = user && await user.getIdToken();
            const respond = await axios.post(`http://localhost:8000/api/signup/${username}`, {},
            { "headers" : { authtoken : token }},)
            console.log(respond.status);
            const data= respond.data;
            if (data.status === false) {
                setNoti('Username existed. Please try again.');
                return;
            } else {
                setNoti('User successfully created.');
                nav("/note");
                }
            } 
        catch (e) {
            setError(e.message);
        }
        }
       

return (
    <>
         {error && <p className="error">{error}</p>}
        <form>
        <label htmlFor="username">Username: </label> <br />
                <input 
                    type="text" name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    >
            </input> <br/>.
        <button onClick={createname}>Create Username</button>
        </form>
        <p>{noti}</p>
    </>
    )
}
