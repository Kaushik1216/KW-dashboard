import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from'react-router-dom'
import loginimg from "./login.svg"

interface props{
  user: String
  changeuser: Function
}
const Login: React.FC<props> = ({user , changeuser})=> {
    const [data,setData]=useState({
        username:"",
        password:""
      });
      const navigate = useNavigate();
      const handlechange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setData({...data,[e.target.name]:e.target.value});
      }
      const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        try {
          const baseurl :string = (process.env.REACT_APP_BACKENDURL as string)
          const url= `${baseurl}/api/user/login/${data.username}`;
          const res=await axios.post(url,{ 'username': data.username, 'password': data.password });
          
          changeuser(data.username)
          navigate(`/dashboard/`)
        } catch (error) {
          alert("Please check your username and password")
        }
      }

  return ( <>

  <div className="container py-5 " style={{width:"70%"}}>
    <div className="row justify-content-center align-items-center h-100 " >
      
        <div className="card shadow-2-strong card-registration" >
        <div className="row formshadow" style={{borderRadius: "10px"}}>
        <div className="col-lg-6  leftlogin d-md-none d-lg-block d-sm-none d-xs-none d-none leftlogin" >
          <div className="d-flex align-items-center justify-content-center " style={{marginTop:"45px"}}><h1 style={{color:"#6D83F2",fontWeight:"600"}}>Welcome to Knowwize!</h1></div>
          <div className="d-flex align-items-center justify-content-center"><img src={loginimg} alt="" /></div>
   
      </div>
         <div className="col-lg-6 col-sm-12 mt-4">
         <div className="d-flex align-items-center justify-content-center d-lg-none d-md-block d-sm-block d-xs-none" style={{marginTop:"40px"}}><h1 style={{color:"#6D83F2",fontWeight:"600"}}>Welcome to Knowwize !</h1></div>
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5  d-flex justify-content-center" style={{color:"#6D83F2",fontWeight:"600"}}>Login </h3>
            <form  onSubmit={handleSubmit} >
              <div className="row">
                <div className="col mb-4 pb-2">

                  <div className="form-outline">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input type="text" id="username" value={data.username} onChange={handlechange} className="form-control form-control-lg" name="username" required/>
                  </div>

                </div>
              </div>
              <div className='row'>
                <div className="col mb-4 pb-2">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" value={data.password} onChange={handlechange} className="form-control form-control-lg"name="password" required/>
                  </div>

                </div>
              </div>

              <div className="mt-2 pt-2  d-flex justify-content-center">
                <input className="btn btn-primary btn-lg" type="submit" value="Login" />
              </div>

            </form>
          <div className="m-2 d-flex justify-content-center text-decoration-underline"> <Link to="/register" className='h5'>Register</Link></div>
         
          </div>
        </div>
        </div>
        </div>

    </div>
  </div>
    </>
  )
}

export default Login;