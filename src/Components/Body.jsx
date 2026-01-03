import React, { useEffect } from 'react'
import Navbar from './Navbar';
import { Outlet, useNavigate} from 'react-router-dom';
import Footer from "./Footer"
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {addUser} from "../utils/Slices/User";
import { BASE_URL } from '../CONSTANTS';

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData  = useSelector(store=>store.user);

  const fetchUser = async ()=>{
    if(userData) return
  try {
    
    
    
    const res = await axios.get(BASE_URL+"/userprofile",{withCredentials:true});
    
    
   dispatch(addUser(res.data));


  } catch (error) {

    if(error.status){
      navigate("/login")
    }
    console.log(error)
  }
  }
  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div className='flex flex-col h-screen'>
        <Navbar/>
        <Outlet/>
        <Footer />
    </div>
  )
}

export default Body