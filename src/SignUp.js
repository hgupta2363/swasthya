import React, { useCallback,useState } from "react";
import { withRouter,Redirect } from "react-router";
import app from "./base";
import {Link} from "react-router-dom";

const SignUp = ({ history }) => {
  //regular expression for email
  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  //initialized state
const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const [emailError,setemailerror]=useState("")
const [passwordError,setpasserror]=useState("")
// handle signup event
  const handleSubmit = useCallback(async event => {
    event.preventDefault();
    console.log(event.target.elements)
    const { firstname,lastname,age,blood,date,city,email, password } = event.target.elements;
    try {
     //store data on firebase
app.firestore().collection("userdata").add({
  firstname:firstname.value,
  lastname:lastname.value,
  age:age.value,
  blood:blood.value,
  date:date.value,
  city:city.value,
  email:email.value,
  password:password.value

})

        history.push("/")
    } catch (error) {
      alert(error);
    }
  }, [history]);
  //handle change in any input
  const handleChange= e=>{
    const {name,value}=e.target;
    
    switch(name)
    {
      case "email":
        setemailerror({emailError:emailRegex.test(value)?"":"email is not valid"});
      setemail({email:value})
      break;
      case "password":
        setpasserror({passwordError:value.length<6?"password should greater than 6 character":""});
        setpassword({password:value})
        break;
    }
    
  }

  return (
    //signup page view
    <div>
    <div className="wrapper">
  <div className="form-wrapper">
    <h1>SignUp Account</h1>
    <form onSubmit={handleSubmit} noValidate>
    <div className="firstname">
        <label htmlFor="email">Firstname</label>
        <input
                
          placeholder="your firstname"
          type="email"
          name="firstname"
          noValidate
          onChange={handleChange}
        />
      {
        
        emailError!=""&& (
<div className="errorMessage">{emailError.emailError}</div>
        )
        
        
      }

      </div>
      <div className="lastname">
        <label htmlFor="email">Lastname</label>
        <input
                
          placeholder="your lastname"
          type="name"
          name="lastname"
          noValidate
          
        />
      
       <div className="age">
        <label htmlFor="age">Age</label>
        <input
                
          placeholder="your age"
          type="age"
          name="age"
          noValidate
     
        />
   

      </div>
      <div className="blood">
        <label htmlFor="blood-group">Blood Group</label>
        <input
                
          placeholder="your blood-group"
                type="text"
                name="blood"
                noValidate
           
              />
    
      </div>

      </div>
      
      <div className="date">
        <label htmlFor="date">Date of birth</label>
        <input
                
          
          type="date"
          name="date"
          noValidate
     
        />
    

      </div>
      <div className="city">
        <label htmlFor="email">City</label>
        <input
                
          placeholder="your city"
          type="city"
          name="city"
          noValidate
        
        />
    
      

      </div>
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
        <small>Not Have an Account? <Link to="/login">Login</Link></small>
      </div>
    </form>
  </div>
</div>
    </div>
  );
};

export default withRouter(SignUp);
