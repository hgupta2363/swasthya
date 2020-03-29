import React,{useEffect,useContext,useState} from "react";
import app from "./base";
import { withRouter, Redirect } from "react-router";
import * as Cookies from "js-cookie";
import { AuthContext } from "./Auth.js";
import "./home.css"
const Home = () => {
 
  const { currentUser } = useContext(AuthContext);
  const logoutHandler=({history})=>{
    
     
    Cookies.remove("session");
 
  }
 
  return (
    <div>
      <h1>Home</h1>

     
      <button onClick={logoutHandler}>Sign out</button>
      <div class="card">
  
  <h1><b>Name</b>     {currentUser[0].firstname}</h1>
  <p class="title">Blood-Group :{currentUser[0].blood}</p>
  <p>Age :{currentUser[0].age}</p>
  <p>City :{currentUser[0].city}</p>
  <p>Date of birth: {currentUser[0].date }</p>
  
</div>
    </div>
  );
};

export default Home;
