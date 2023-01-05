import React , {useState , useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './NewNote.css';


export default function Read() {
   
    const [note,setNote] = useState([]);
    const param = useParams();
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [username,setUsername] = useState('');
    const [id,setId] = useState('')
    const [noti,setNoti] = useState('');
    const [disable,setDisable] =useState(false);
    
    
    useEffect(() => {
        const id = param.id;
        console.log(id);
        const load = async () => {
        const respond = await axios.get(`http://localhost:8000/api/notelist/${id}/get`);
        setNote (respond.data);
        setTitle(note.title);
        setContent(note.content);
        setUsername(note.username);
        setId(note._id);
        } 
        load();
        setDisable(false);
    },[param,note.title,note.content,note._id,note.username])

    const handleUpdate =  async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:8000/api/notelist/${id}/update`, { title: title, content: content,},
        { "headers" : { "Content-Type": "application/json" }})
        .catch(function(error) {
            console.log(error);
            })
        console.log(title,content);
        setNoti('Note updated. Please reset the list.');
        setDisable(true);
            };

        

    const handleDelete=  async (event) => {
        event.preventDefault();
        await axios.delete(`http://localhost:8000/api/notelist/${id}/delete`,
        { "headers" : { "Content-Type": "application/json" }})
        .catch(function(error) {
            console.log(error);
            })
        console.log(title,content);
        setContent('');
        setTitle('');
        setUsername('');
        setNoti('Note deleted. Please reset the list.');
            };

    return (
        <>
         <h1>Note</h1>
        <form>
            <div className="newform">
                <div>
                    <label  htmlFor="title">Title </label> <br />
                    <input  
                        type="text" id="title" name="title" size="60"
                        value={title}
                        onChange={e=> setTitle(e.target.value)}
                       >
                    </input><br />
                </div>
                <div>
                    <label  htmlFor="username">Username </label> <br />
                    <input  
                        type="text" id="username" name="username" size="60"
                        value={username}
                        readOnly
                        >
                    </input><br />
                </div>
                <div>
                    <label htmlFor="content">Content</label><br />
                    <textarea 
                        id="content" name="content" rows="15" cols="60"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        >
                    </textarea><br />
                </div>
                <button className="updatebutton" onClick={handleUpdate}>Update</button> 
                <button type='button' className="deletebutton"  onClick={handleDelete} disabled={disable} >Delete</button>
                <p className="noti">{noti}</p>
            </div>
        </form>
        </>
    )

}