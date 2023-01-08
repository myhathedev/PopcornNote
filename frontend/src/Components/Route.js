import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound.js";
import Login from '../Pages/Login.js';
import ContactUs from '../Pages/ContactUs.js';
import Note from '../Pages/Note.js';
import NewNote from "./NewNote";
import Read from "./Read";
import SignUp from "../Pages/Signup";
import Createusername from "../Pages/Createusername";
import Logout from "../Components/Logout";


function Links() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/createusername" element={<Createusername />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/note" element={<Note />} >
                <Route path="create" element={<NewNote />}/>
                <Route path=":id" element={<Read />} />
            </Route>            
            <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default Links;
