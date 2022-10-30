import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBb_2TWMrIp8p3rdIHMn6_uMFX9egJXgHg",
  authDomain: "menu-engeneer.firebaseapp.com",
  projectId: "menu-engeneer",
  storageBucket: "menu-engeneer.appspot.com",
  messagingSenderId: "999640660328",
  appId: "1:999640660328:web:b2ca2f08f13b669ad37edd"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
