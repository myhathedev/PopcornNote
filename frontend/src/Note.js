import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./Note.css";
import { Link, Outlet, useNavigate} from "react-router-dom";
import useUser from "./container/useUser";
import Popcorncry from "./popcorncry";

export default function Note() {
    const [note,setNote] = useState([]);
    const navigate = useNavigate();
    const {user,isLoading} = useUser();

    useEffect( () => {
        const load = async () => {
        const token = user && await user.getIdToken();
        //list notes
        const respond = await axios.get("http://localhost:8000/api/notelist/list",
        {headers : {authtoken : token}});
        const newnote = respond.data;
        setNote(newnote);
        } 
        load();}
    ,[user])
    
    return (
        <>
        {isLoading? 
        <p>Loading...</p>
        :
        <div className="notepage">
        { user ? 
            <div>
            <div className ="listgrid-container">
                <div > 
                <Link to="/note/create" className="newbutton">New</Link> 
                    <p className="yournote">Your Note <span className="reloadbutton" onClick={()=> {navigate(0)}}><i className="fa-sharp fa-solid fa-arrows-rotate"></i></span></p> 
                    <div className="notelist">
                        {note.map( i => 
                            <Link className="link" to={`/note/${i._id}`} key={i._id}> <div >
                                <p>{i.title} </p>
                                <p className="date">Last updated: {i.dateupdated}</p>
                            </div> </Link>
                        )}
                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
            </div>
            : <div className="notlogin-grid">
                <div>
                    <Popcorncry />
                </div>
                <div class="sorry">
                    <p> Sorry! </p>
                    <p> You cannot not use Popcorn Notes right now!</p>
                    <Link className="link" to="/login" ><p className="loginplease">Log in, please!</p></Link>
                </div>      
            </div>}
        </div>}
        </>
        
        
        
      
    )
}