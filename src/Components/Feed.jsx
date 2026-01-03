import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../CONSTANTS'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/Slices/feed';
import Card from "./Card"


const Feed = () => {
  const feedData = useSelector(store=>store.feed);

    const dispatch = useDispatch();
   

  const fetchFeed = async ()=>{
   try {
    if(feedData)return;
     const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
 
    dispatch(addFeed(res?.data?.data));
   } catch (error) {
     console.log(error)
   }
  }
  useEffect(()=>{
    fetchFeed()
  },[dispatch])

  if(!feedData) return;
  if(feedData.length <=0) return <h1 className='text-center text-4xl'>No new Users available</h1>
  
  return feedData && (<Card user={feedData[0]}/>)
}

export default Feed