import React , {useState , useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './Read.css';
import useUser from "../hook/useUser";


export default function Read() {
   
    const [note,setNote] = useState([]);
    const param = useParams();
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [username,setUsername] = useState('');
    const [id,setId] = useState('')
    const [noti,setNoti] = useState('');
    const [datecreated,setDatecreated] = useState('');
    const [dateupdated,setDateupdated] = useState('');
    const [disable,setDisable] =useState(false);
    const {user} = useUser();
    
    useEffect(() => {
        const id = param.id;
        const load = async () => {
            const respond = await axios.get(`/api/notelist/${id}/get`);
            setNote (respond.data);
            setTitle(note.title);
            setContent(note.content);
            setUsername(note.username);
            setDatecreated(note.datecreated);
            setDateupdated(note.dateupdated);
            setId(note._id);
        } 
        load();
        setDisable(false);
    },[param,note.title,note.content,note._id,note.username,note.datecreated,note.dateupdated])

    const handleUpdate =  async (event) => {
        event.preventDefault();
        const token = user && await user.getIdToken();
        await axios.put(`/api/notelist/${id}/update`, { title: title, content: content,},
        { "headers" : { "Content-Type": "application/json", authtoken : token }})
        .catch(function(error) {
            console.log(error);
            })
        console.log(title,content);
        setNoti('Note updated. Please reset the list.');
        setDisable(true);
            };

        

    const handleDelete=  async (event) => {
        event.preventDefault();
        const token = user && await user.getIdToken();
        const response = await axios.delete(`/api/notelist/${id}/delete`,
        { "headers" :{ authtoken : token }})
        .catch(function(error) {
            console.log(error);
            })
        console.log(title,content);
        setContent('');
        setTitle('');
        setUsername('');
        setNoti(response.data);
            };

    return (
        <>
         <h1>Note</h1>
        <form>
            <div className="newform">
                <p className="text">User: <span className="username">{username}</span> </p>
                <p className="text">Title: <span className="notetitle">{title}</span></p>

                    <div className="formitem1">
                    <label htmlFor="content">Content</label><br />
                    <textarea 
                        id="content" name="content" rows="15" cols="60"
                        value={content || ''}
                        onChange={e => setContent(e.target.value)}
                        >
                    </textarea><br />
                    <pre className="date">
                    Created:      {datecreated} <br/>
                    Last updated: {dateupdated}
                    </pre>
                    </div>
                    
                    <div className="formitem1">
                <button className="updatebutton" onClick={handleUpdate}>Update</button> 
                <button type='button' className="deletebutton"  onClick={handleDelete} disabled={disable} >Delete</button>
                <p className="noti">{noti}</p>
                </div>
            </div>
        </form>
        </>
    )

}