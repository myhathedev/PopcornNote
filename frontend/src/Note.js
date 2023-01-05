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
    const reload= () => {navigate(0)};
    const {user} = useUser();


    useEffect( () => {
        const load = async () => {
        const token = user && await user.getIdToken();
        const respond = await axios.get("http://localhost:8000/api/notelist/list",
        {headers : {authtoken : token}});
        const newnote = respond.data;
        setNote(newnote);
        } 
        load();}
    ,[user])

    console.log( note.map( i => i.title ));
    
    return (
        <div className="notepage">
            <p className="greeting">Hello, friend!</p>
        {user ? 
            <div className ="listgrid-container">
                <div > 
                <Link to="/note/create" className="newbutton">New</Link> 
                    <p className="yournote">Your Note <span className="reloadbutton" onClick={reload}><i class="fa-sharp fa-solid fa-arrows-rotate"></i></span></p> 
                    <div className="notelist">
                        {note.map( i => 
                            <Link to={`/note/${i._id}`} key={i._id}> <div >
                                <p>{i.title} </p>
                                <p className="date">{i.date}</p>
                            </div> </Link>
                        )}
                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
            : <div className="notlogin-grid">
                <div>
                    <Popcorncry />
                </div>
                <div>
                    <p> Sorry! </p>
                    <p> You cannot not use Popcorn Notes right now!</p>
                    <Link to="/login"><p>Log in, please!</p></Link>
                </div>      
            </div>}
        </div>
    )
}