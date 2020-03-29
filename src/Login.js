import React, { useCallback, useContext,useState } from "react";
import { withRouter, Redirect } from "react-router";
import {setSessionCookie,getSessionCookie} from "./session";
import "./Login.css"
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import { readlink } from "fs";

const Login = ({ history }) => {
  //regular expression for email to  check valid email
  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  //initialized state
const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const [emailError,setemailerror]=useState("")
const [passwordError,setpasserror]=useState("")

//handle login event
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
const email=event.target.email.value
const password=event.target.password.value
//fetch data from firestore
    app.firestore().collection("userdata").get().then((snapshot)=>{
 const user= snapshot.docs.map((e)=>{
    
 if(e.data().email==email)
 {
 return e.data() 
 }
 else
 {
 return {}
 }
      })
      //filter fetched data
   const currentuser=  user.filter((e)=>{
 return e.email==email
     })
     //check email
      if(currentuser.length==0)
      {
        alert("your email is incorrect")
      }
      //check password
      else if(currentuser[0].password!=password)
      {
        alert("your password is incorrect")
      }
      // successfully login
      else {
        alert("you are successfully logged in")
        //save loggedin user data in sessioncookie
        setSessionCookie({currentuser})
       
      }
    })

      
     
    },
    [history]
  );
  //handle the change in any input
  const handleChange= e=>{
    const {name,value}=e.target;
    //to identify which input changed
    switch(name)
    {
      case "email":
        //handle the error
        setemailerror({emailError:emailRegex.test(value)?"":"email is not valid"});
     
      break;
      case "password":
        //handle the error
        setpasserror({passwordError:value.length<6?"password should greater than 6 character":""});
        
        break;
    }
    
  }
//get props data from authprovider 
  const { currentUser } = useContext(AuthContext);
  

if(currentUser)
{
  console.log(currentUser)
  return <Redirect to="/" />;
}

else{

  return (
    //login page view
  <div className="wrapper">
  <div className="form-wrapper">
    <h1>Login Account</h1>
    <form onSubmit={handleLogin} noValidate>
      
      
      <div className="email">
        <label htmlFor="email">Email</label>
        <input
                
          placeholder="Email"
          type="email"
          name="email"
          noValidate
          onChange={handleChange}
        />
      {
        
        emailError!=""&& (
<div className="errorMessage">{emailError.emailError}</div>
        )
        
        
      }

      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <input
          
          placeholder="Password"
          type="password"
          name="password"
          noValidate
          onChange={handleChange}
        />
      {passwordError!="" && (
              <span className="errorMessage">{passwordError.passwordError}</span>
            )}
      </div>
      <div className="createAccount">
        <button type="submit">Login</button>
        <small>Not Have an Account?</small>
      </div>
    </form>
  </div>
</div>
  );
      }
};

export default withRouter(Login);
