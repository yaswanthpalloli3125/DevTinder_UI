import React, { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Slices/userSlice";
import { BASE_URL } from "../CONSTANTS";

const Login = () => {
  const [email, setEmail] = useState("zetti@gmail.com");
  const [password, setPassword] = useState("Zetti@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/usersignup", {firstName,lastName,email,password},{withCredentials:true});
    
       dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (error) {
      console.log(error)
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/userlogin",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.data || "somethig went wrong");
      console.log(error);
    }
  };

  return (
    <div className="card w-96 bg-base-300 card-sm shadow-sm mx-auto mt-4">
      <div className="card-body">
        <h2 className=" text-center text-2xl font-bold">{isLoginForm ? "Login":"SignUp"}</h2>
        {!isLoginForm && <div>
             <div>
          <label>First Name</label>
          <input
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
         <div>
          <label>Last Name</label>
        <input type="text" className="input" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
        </div>
           </div>}
        <div>
          <label>Email ID</label>
          <input
            type="text"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text-red-600">{errorMessage}</p>
        <div className="justify-center card-actions">
          <button className="btn btn-primary" onClick={isLoginForm? handleLogin:handleSignUp}>
           { isLoginForm?"Login":"SignUp"}
          </button>
        </div>
        <p className="text-center my-3 cursor-pointer" onClick={()=> setIsLoginForm(value=>!value)}>{isLoginForm? "New user? sign up here" : "Existing user? login here"}</p>
      </div>
    </div>
  );
};

export default Login;
