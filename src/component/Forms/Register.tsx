import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from'react-router-dom'
import signin from "./signin.svg"

// # response = await registerUser({"firstname":"Kaushik","lastname":"Vishwakarma","username":"Kaushik1216","email":"kaushik.vishwakarma2003@gmail.com","password":"123","totalcredit":20,"usedcredit":0})

const Register: React.FC = ()=> {
  // const [data,setData]=useState({firstname:"Kaushik",lastname:"Vishwakarma",username:"Kaushik",email:"kaushik.vishwakarma2003@gmail.com",password:"123"});
  const [data,setData]=useState({
    firstname:"",
    lastname:"",
    username:"",
    email:"",
    password:"",
    totalcredit:0,
    usedcredit:0,
  });
  const [success, setSuccess] = useState(false);

  const navigate=useNavigate()
  useEffect(()=>{
    console.log(success)
    if(success){
      navigate("/login")
    }
  },[success])

  const handlechange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setData({...data,[e.target.name]:e.target.value});
  }

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    try {
      const baseurl :string = (process.env.REACT_APP_BACKENDURL as string)
      const url= `${baseurl}/api/user/register/`;
      const res=await axios.post(url,data);
      console.log("repon",res)
      setSuccess(true)
    } catch (error) {
      console.log("ref eroor")
    }
  }
  return (
    <><section className=" gradient-custom"  >
  <div className="container py-5 h-100 ">
    <div className="row justify-content-center align-items-center h-100 m-1">
        <div className="card shadow-2-strong card-registration">
        <div className="row formshadow"  style={{borderRadius: "10px"}}>
        <div className="col-lg-6  leftlogin d-md-none d-lg-block d-sm-none d-xs-none d-none" >
        <div className="d-flex align-items-center justify-content-center d-md-none d-lg-block" style={{marginTop:"40px"}}><h1 style={{color:"#6D83F2",fontWeight:"600"}}>Welcome to Knowwize !</h1></div>
          <div className="d-flex align-items-center justify-content-center"><img src={signin} alt="" /></div>
   
      </div>
         <div className="col-lg-6 col-sm-12 mt-4">
         <div className="d-flex align-items-center justify-content-center d-lg-none d-md-block d-sm-block d-xs-none" style={{marginTop:"40px"}}><h1 style={{color:"#6D83F2",fontWeight:"600"}}>Welcome to Knowwize !</h1></div>
          <div className="card-body p-1 p-md-3 ">
            <h3 className="mb-4   d-flex justify-content-center" style={{color:"#6D83F2",fontWeight:"600"}}>Registration</h3>
            <form  onSubmit={handleSubmit} >
                  <div className="row">
                <div className="col-md-6 mb-3">

                  <div className="form-outline">
                    <label className="form-label" htmlFor="firstName">First Name*</label>
                    <input type="text" id="firstName"value={data.firstname} onChange={handlechange} className="form-control form-control-lg" name="firstname"required/>
                  </div>

                </div>
                <div className="col-md-6 mb-3">

                  <div className="form-outline">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" value={data.lastname} onChange={handlechange} className="form-control form-control-lg" name="lastname" required/>
                  </div>

                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="emailAddress" >Email</label>
                    <input type="email" id="emailAddress" value={data.email} onChange={handlechange} className="form-control form-control-lg" name="email" required/>
                  </div>

                </div>
                <div className="col-md-6 mb-3">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="username" >Username</label>
                    <input type="text" id="username" value={data.username} onChange={handlechange} className="form-control form-control-lg" name="username" required/>
                  </div>

                </div>
                </div>
              <div className="row">
                <div className="col-md-6 mb-3 pb-2">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="phoneNumber">Password</label>
                    <input type="password" id="password" value={data.password} onChange={handlechange} className="form-control form-control-lg"name="password" required/>
                  </div>

                </div>
                {/* <div className="col-md-6 mb-3 pb-2">

                  <div className="form-outline">
                    <label className="form-label" htmlFor="phoneNumber">Confirm Password</label>
                    <input type="password" id="cpassword" value={data.cpassword} onChange={handlechange} className="form-control form-control-lg" name="cpassword" required/>
                  </div>

                </div> */}
              </div>

              <div className="mt-3 pt-2  d-flex justify-content-center">
                <input className="btn btn-primary btn-lg" type="submit" value="Register" />
              </div>

            </form>
            <div className="m-2 d-flex justify-content-center text-decoration-underline"> <Link to="/login" className='h6'>Login</Link></div>

          </div>
        </div>
      </div>
    </div>
  </div>

  </div>
</section>
    </>
  )
}
export default Register;