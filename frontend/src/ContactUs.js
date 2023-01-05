import React from "react";
import "./ContactUs.css";
import Typewriter from 'typewriter-effect';
import AppreciationIcon from "./appreciation";


export default function ContactUs() {

    return (
        <>
        <div className="contactgrid-container">
            <div className="appreciation">
                <AppreciationIcon />
            </div>
            <div className="contactus"><Typewriter
                onInit={(typewriter)=> {
                typewriter
                .changeDelay(40)
                .typeString('<p class="thankyou">Thank you for using our app.</p>')
                .pasteString('<br/>')
                .typeString("For mor information, please contact:")
                .start();
            }}/>
            </div>

        <div className="info">
            <p>Myha Cao</p>
            <p>Full-stack Website Developer</p>
            <p>Email: caomyhalhp@gmail.com</p>
            <p>New Brunswick, Canada</p>
        </div>
    </div>
        </>
    )

}