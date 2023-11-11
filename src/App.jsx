import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRouter from "./routes/AuthRouter";
import Screenlogin from "./screen/Screenlogin";
import React from 'react';
import LoginForm from './components/index';
import './styles/LoginEstilo.css';


function App() {


  return (
    <>
     <div className="App">
      <LoginForm />
    </div>
    </>
  )
}

export default App
