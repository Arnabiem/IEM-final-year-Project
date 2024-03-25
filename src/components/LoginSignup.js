import React, { useState } from 'react'
import './LoginSignup.css'
import user_icon from '../components/Assets/person.png'
import email_icon from './Assets/email.png'
import password_icon from './Assets/password.png'
import axios from 'axios'
//import {useNavigate} from 'react-router-dom'
const LoginSignup = () => {

 // const navigate = useNavigate();
   const [action , setAction] = useState("Sign Up");
   const [email,setEmail] = useState('');
   const [password, setPassword] = useState('');

  const handleSubmit = ()=>{
   
    axios.post('/api/user/register',{
      email: email,
      password:password
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }
    
  const handleSubmitt = ()=>{
   
    axios.post('/api/user/login',{
      email: email,
      password:password
    }).then((res)=>{

      if(res.data.code === 500)
      {
        alert("User not found")
      }
      if(res.data.code === 404)
      {
        alert("Password is Wrong")
      }
      if(res.data.code === 200)
      {
      //  navigate('/');
        localStorage.setItem('token', res.data.token);
      }
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }


  return (
    <div className='containerr'> 
    
      <div className='headerr'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
    <div className='inputs'>

      {action==='Login'?<div></div>:<div className='input'>
         <img src={user_icon} alt=''/>
         <input type='text' placeholder='Name'/>
        </div>}
        

        <div className='input'>
         <img src={email_icon} alt=''/>
         <input type='email' onChange={(e)=>{
          setEmail(e.target.value)
         }}  value={email} placeholder='Email Id'/>
        </div>

        <div className='input'>
         <img src={password_icon} alt=''/>
         <input type='password' onChange={(e)=>{
          setPassword(e.target.value)
         }}
         value={password} placeholder='Password'/>
        </div>
    </div>
 {action==='Sign Up'?<div></div>: <div className='forgot-password'>Lost Password? <span>Click Here</span></div>}


    <div className='submit-container'>
      <div className={action==="Login" ? "submit gray" : "submit"} onClick={()=>{setAction("Sign Up")
    }}> Sign Up</div>

      <div className={action==="Sign Up" ? "submit gray":"submit"} onClick={()=>{setAction("Login")}}> Log In</div>
    </div>
    
    </div>
  )
}

export default LoginSignup