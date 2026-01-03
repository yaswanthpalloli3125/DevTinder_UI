import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../CONSTANTS";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Slices/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [toast,setToast]=useState(false)

  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/userupdate",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
      const toastTimer = setTimeout(()=>{
           setToast(false);
      },3000)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center gap-3">
      
      <div className="card w-96 bg-base-300 card-sm shadow-sm  my-4">
        <div className="card-body">
          <h2 className=" text-center text-2xl font-bold">Profile</h2>

          <div>
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
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label>Photo URL</label>
            <input
              type="text"
              className="input"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block">Age</label>
            <input
              type="text"
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label>Gender</label>
            <input
              type="text"
              className="input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label>About</label>
            <input
              type="text"
              className="input"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div className="justify-center card-actions">
            <button className="btn btn-primary" onClick={handleSave}>
              Save details
            </button>
          </div>
        </div>
      </div>

      <div className={`card bg-base-300 w-96 shadow-sm my-5`}>
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <div>{about}</div>
        </div>
      </div>
      {toast && <div className="toast toast-top toast-center">
        
        <div className="alert alert-success">
          <span>Message sent successfully.</span>
        </div>
      </div>}
    </div>
  );
};

export default EditProfile;
