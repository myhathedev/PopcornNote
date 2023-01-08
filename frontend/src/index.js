// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBTgACVNmBNEZauQEp4bwLEhHJxFIzHWSI",

  authDomain: "popcornnote-a4008.firebaseapp.com",

  projectId: "popcornnote-a4008",

  storageBucket: "popcornnote-a4008.appspot.com",

  messagingSenderId: "446809598898",

  appId: "1:446809598898:web:58bd065626d725e266d2ab"

};


// Initialize Firebase

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

     <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>

 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
