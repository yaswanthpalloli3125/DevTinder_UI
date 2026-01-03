import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../CONSTANTS";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/Slices/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const handleRequests = async (status, rqstID) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connectionrequest/review/"+status+"/"+rqstID,{},{withCredentials:true}
      );

      dispatch(removeRequest(rqstID));
      console.log(res.data.data);
    } catch (error) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return <p>no connection</p>;
  if (requests.length === 0) return <p>no new connections</p>;

  return (
    <div>
         <div>
              <h1 className="text-center text-2xl font-bold">Requests</h1>
            </div>
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, about } = request.fromUserID;
        return (
          <div key={request._id}>
           
            <div>
              <div className="card w-2/3 mx-auto card-side bg-base-100 shadow-sm">
                <figure>
                  <img className="w-36" src={photoUrl} alt="Movie" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{firstName + " " + lastName}</h2>

                  <p>{about}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Remove</button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleRequests("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
