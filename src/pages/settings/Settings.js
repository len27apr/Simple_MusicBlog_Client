import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import DeleteAccount from "../../components/deleteAccount/deleteAccount";
import axios from "axios";
import Transition from 'react-transition-group/Transition';

export default function Settings() {
  const { user, token, dispatch } = useContext(Context);
  const [file, setFile] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isUserDelete, setIsUserDelete] = useState(false);
  const [userModalIsOpen, setUserModalIsOpen] = useState(true);
  // const PF = 'http://localhost:8000/';
  const destinationValue='Users';
  // console.log('the file object in settingsjs is: ',file);
  // console.log('the user Image destination is: ',user.username);
  const deleteUserAccount = async () => {
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/` + user._id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    console.log('res data is: ', res.data);
    if (res.data.deletedUser._id) {
      console.log(res.data.message);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setIsUserDelete(false);
      window.location.replace('/');
    }
  }
  
  const handleLogout=()=>{
    dispatch({type:'LOGOUT'});
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('updating user');
    let updatedUserData;
    let res;
    dispatch({ type: 'UPDATE_START' });
    const updatedUser = {
      username: username ? username : user.username,
      email: email ? email : user.email,
      password: password ? password : user.password
    }
    if (file) {
      updatedUserData = new FormData();
      const filename = Date.now() + file.name;
      updatedUserData.append('username', updatedUser.username);
      updatedUserData.append('email', updatedUser.email);
      updatedUserData.append('password', updatedUser.password)
      updatedUserData.append('name', filename);
      updatedUserData.append('destination', destinationValue);
      updatedUserData.append('file', file);
      //  updatedUser.profilePic=filename; 
      //  try{
      //    await axios.post('/upload',data);
      //  }
      //  catch(error)
      //  {
      //    console.log('The error occured while updating an image in settings.js is: ',error);
      //  }
    }
    try {
      console.log('the token is: ', token);
      if (file) {
        res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/` + user._id, updatedUserData, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
      }
      else {
        res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/` + user._id, updatedUser, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
      }
      setSuccess(true);
      console.log('the res.data of updated user is: ', res.data);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
      localStorage.setItem("user",JSON.stringify(res.data)); 

    }
    catch (error) {
      console.log('The error occured while editing the user profile is: ', error);
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  }
  
  // console.log('the value of is user delete is: ',isUserDelete);
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <button className="deleteAccount" onClick={() => setIsUserDelete(true)
    } >Delete Account</button>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={ file ? URL.createObjectURL(file) : process.env.REACT_APP_BACKEND_IMAGE_URL + user.profilePic }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder="Safak" name="name" onChange={(e) => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder="safak@gmail.com" name="email" onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          <p className="logoutUser" onClick={handleLogout}>LOGOUT</p>
          {success && <span style={{ color: 'green', textAlign: 'center' }}>Profile has been updated...</span>}
        </form>
      </div>
      <Sidebar />
      {isUserDelete &&
        <Transition in={userModalIsOpen} timeout={{ enter: 300, exit: 2000 }} mountOnEnter unmountOnExit>
          {state => {
            //  console.log('The value of state is: ',state);
            return <DeleteAccount state={state} deleteUserAccount={deleteUserAccount} isUserDelete={isUserDelete} setUserModalIsOpen={setUserModalIsOpen}
              setUserDelete={setIsUserDelete} />
          }
          }
        </Transition>
      }
    </div>
  );
}
