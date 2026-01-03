import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../CONSTANTS";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/Slices/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error.responce);
    }
  };

  const handleRemoveConnections = async()=>{
    try {
       
    } catch (error) {
        
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <p>no connection</p>;
  if (connections.length === 0) return <p>no new connections</p>;

  return (
    <div>
     <div><h1 className='text-center text-2xl font-bold'>Connections</h1></div>
    <div>
      {connections.map((connection) => {
        const { firstName, lastName, age, gender, photoUrl, _id,about } = connection;
        return (
          <div key={_id}>
            <div className="card w-2/3 mx-auto card-side bg-base-100 shadow-sm">
              <figure>
                <img className="w-36"
                  src={photoUrl}
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{firstName+" "+lastName}</h2>
                <p>{age+" "+ gender}</p>
                <p>{about}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Remove</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default Connections;
