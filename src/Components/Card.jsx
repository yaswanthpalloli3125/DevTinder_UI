import axios from "axios";
import React from "react";
import { BASE_URL } from "../CONSTANTS";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/Slices/feed";

const Card = ({ user, styleClass}) => {
  const dispatch = useDispatch();
  const {_id, firstName, lastName, age, gender, photoUrl,about } = user;
   


  const handleFeed = async(status,userID)=>{
    try {
        await axios.post(BASE_URL+"/connectionrequest/"+status+"/"+userID,{},{withCredentials:true});
           dispatch(removeFeed(_id));
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <div className={`card bg-base-300 w-96 shadow-sm ${styleClass? styleClass:"mx-auto"} my-5`}>
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <div>
            {about}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={()=>handleFeed("ignored",_id)}>ignore</button>
          <button className="btn btn-secondary" onClick={()=>handleFeed("interested",_id)}>interested</button>
        </div>
      </div>
    </div>
  );
};

export default Card