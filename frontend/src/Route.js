import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound.js";
import Login from './Login.js';
import ContactUs from './ContactUs.js';
import Note from './Note.js';
import NewNote from "./container/NewNote";
import Read from "./container/Read";
import SignUp from "./container/Signup";
import CreateUsername from "./container/Createusername";

function Links() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/createusername" element={<CreateUsername />} />
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
