import axios from "axios";
import React, {useState} from "react";
import "./NewNote.css";
import useUser from "./useUser";


export default function NewNote() {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [noti,setNoti] = useState('');
    const {user} = useUser();
    //make the variable become JSON
   

    const handleSubmit  =  async (event) => {
        event.preventDefault();
        const token = user && await user.getIdToken();
        await axios.post(`http://localhost:8000/api/notelist/post`, { title: title,content: content,},
        { "headers" : { "Content-Type": "application/json",authtoken : token }})
        .catch(function(error) {console.log(error);});
        setContent('');
        setTitle('');
        setNoti('New note created. Please reset the list.');
        };

  
    return (
        <>
        <h1>New Note</h1>
        <form>
            <div className="newform">
                <div>
                    <label  htmlFor="title">Title </label> <br />
                    <input  
                        type="text" id="title" name="title" require="true" size="60"
                        value={title}
                        onChange={e => setTitle(e.target.value) }>
                    </input><br />
                </div>
                <div>
                    <label htmlFor="content">Content</label><br />
                    <textarea 
                        id="content" name="content" rows="15" cols="60"
                        value={content}
                        onChange={e => setContent(e.target.value) }>
                    </textarea><br />
                </div>
           <button className="createbutton" onClick={handleSubmit}>Create</button>
           <p className="noti">{noti}</p>
            </div>
        </form>
        </>
    )
}