import React from 'react';
import './App.css';
import {Navigate, Route,Routes} from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import Register from './component/Forms/Register';
import Login from './component/Forms/Login';
import Dashboard from './component/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState, useEffect } from 'react';

function App() {

  const [user , setuser] = useState(" ");

  const changeuser = (newuser:string)=>{
      setuser(newuser);
  }
  return (
    <div className="App">
      <Navbar user={user} changeuser={changeuser}/>
      <Routes>
      {/* <h1>This is home page</h1> */}
      <Route path="/" element={<Login  user={user} changeuser={changeuser} />}></Route>
      <Route path="/register" element={<Register  />}></Route>
      <Route path="/login" element={<Login  user={user} changeuser={changeuser} />}></Route>
      <Route path="/dashboard" element={<Dashboard  user={user} changeuser={changeuser} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
