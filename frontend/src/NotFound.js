import React from "react";
import Dizzy from "./popcorndizzy";
import "./Notfound.css";

export default function NotFound() {
    return (
        <>
        <div className="notfound-grid">
                <div>
                    <Dizzy />
                </div>
                <div className="notfoundtext">
                    <p> Sorry! </p>
                    <p> Page not found.</p>
                </div>      
        </div>
        </>
    )

}