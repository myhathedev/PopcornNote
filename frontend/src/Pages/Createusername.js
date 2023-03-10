import React, {useState} from "react";
import axios from "axios";
import useUser from "../hook/useUser";
import './Createusername.css';


export default function Createusername () {
    const [username,setUsername] = useState('');
    const {user} = useUser();
    const currentusername = useUser().username;
    const [error,setError]=useState('');
    const [noti,setNoti] = useState('');
    
    const createname = async (event) => {
        
        event.preventDefault(); 
        try {
            const token = user && await user.getIdToken();
            const respond = await axios.post(`/api/${username}/signup`, {},
            { "headers" : { authtoken : token }},)
            console.log(respond.status);
            const data= respond.data;
            if (data.status === false) {
                setNoti('Username existed. Please try again.');
                return;
            } else {
                setNoti('User successfully created.');
                window.location.replace("/note/create");
                }
            } 
        catch (e) {
            setError(e.message);
        }
        }
       

return (
    <>
    {currentusername? <p className="howdy currentusername">Your username is {currentusername}</p> 
    :
        <div className="usernamepage">
        <form>
        <p className="howdy">What is your nick name? </p>
                <input 
                    type="text" name="username"
                    className="signininput"
                    require="true" size="30"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    >
            </input> <br/>.
        <button className="usernamebutton" onClick={createname}>Create</button>
        </form>
        <p className="error">{noti}</p>
        {error && <p className="error">{error}</p>}
        </div> }
    </>

    )
}
