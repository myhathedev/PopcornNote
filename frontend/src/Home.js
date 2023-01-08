import React from "react";
import './Home.css';
import Icon from "./notesticker.js";

export default function Home() {
    return (
        <>
        <div className="grid-container">
            <div className="grid-item popcorn">
                <img src="android-chrome-512x512.png" alt="popcorn" height="200px"></img>      
            </div>
            <div className="grid-item">
                <Icon />
            </div>
            <div className="grid-item">
                <div className="title">
                    <h1>
                        <span>P</span>
                        <span>o</span>
                        <span>P</span>
                        <span>C</span>
                        <span>o</span>
                        <span>R</span>
                        <span>N</span>
                    </h1>
                    <h2 id="pop">Note</h2>
                </div>
                <p>Make your notes today.</p>
                <p>Share thoughts and have fun.</p>
            </div>
        </div>
        </>
    )

}