import classes from "./login.module.css";
import { useRef, useContext, useState } from 'react';
import { Context } from "../../context/Context";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const userRef = useRef();
  const passwordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const nameRef = useRef();
  const buttonRef = useRef();
  const { dispatch } = useContext(Context);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false)
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isNewPasswordInvalid, setIsNewPasswordInvalid] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState(false);
  const [newPasswordUser, setNewPasswordUser] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('logging in');
    if (!userRef.current.value.trim().includes('@') && passwordRef.current.value.trim().length <= 3) {
      console.log('email and password is invalid');
      setIsEmailInvalid(true);
      setIsPasswordInvalid(true);
    }
    else if (passwordRef.current.value.length <= 3) {
      console.log('password is invalid');
      setIsPasswordInvalid(true);
      isEmailInvalid && setIsEmailInvalid(false);
    }
    else if (!userRef.current.value.includes('@')) {
      console.log('email is invalid');
      setIsEmailInvalid(true);
      isPasswordInvalid && setIsPasswordInvalid(false);
    }
    else {
      isEmailInvalid && setIsEmailInvalid(false);
      isPasswordInvalid && setIsPasswordInvalid(false);
      dispatch({ type: 'LOGIN_START' });
      try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
          email: userRef.current.value,
          password: passwordRef.current.value
        })
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: res.data.user, token: res.data.token } })
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        history.push('/');
      } catch (error) {
        console.log('The error obtained while logging in the user is: ', error);
        dispatch({ type: 'LOGIN_FAILURE' })
      }
    }

  }



  const forgotPasswordHandler = async () => {
    if (buttonRef.current.innerText === 'Forgot Password') {
      setForgotPassword(true);
    }
    else if (buttonRef.current.innerText === 'Update Password') {
      if (nameRef.current.value.length === 0) {
        setIsNameInvalid(true);
      }
      else {
        setIsNameInvalid(false);
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/forgotPassword`, {
          name: nameRef.current.value
        })
        // console.log('the user needd to change the pasword is: ',res.data.user);
        if (res.data.user) {
          // console.log('the new password user is: ',res.data.user)
          setNewPasswordUser(res.data.user);
          setConfirmNewPassword(true);
          setForgotPassword(false);
        }
      }
    }
    else if (buttonRef.current.innerText === 'Confirm Password') {
      if (confirmNewPasswordRef.current.value.length <= 3) {
        setIsNewPasswordInvalid(true);
      }
      else {
        setIsNewPasswordInvalid(false);
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/newPassword`, {
          userId: newPasswordUser._id,
          password: confirmNewPasswordRef.current.value
        })
        if (res.data.updatedUser) {
          console.log('the password has been changed successfully');
          // console.log('the updated user is: ',res.data.updatedUser);
          setConfirmNewPassword(false);
          setForgotPassword(false);
        }
      }
    }
  }



  return (
    <div className={classes.login}>
      <span className={classes.loginTitle}>Login</span>
      <form className={classes.loginForm} onSubmit={handleSubmit}>

        <label>Email</label>
        <input className={`${classes.loginInput} ${isEmailInvalid && classes.invalidInput}`} type="text" placeholder="Enter your email..." ref={userRef} />
        {isEmailInvalid && <span className={classes.invalid}>Invalid Email!</span>}
        <label>Password</label>
        <input className={`${classes.loginInput} ${isPasswordInvalid && classes.invalidInput}`} type="password" placeholder="Enter your password..." ref={passwordRef} />
        {isPasswordInvalid && <span className={classes.invalid}>Invalid Password!</span>}

        {forgotPassword && <label>Enter your user name</label>}
        {forgotPassword && <input className={`${classes.loginInput} ${isNameInvalid && classes.invalidInput}`} type="text" placeholder="Enter your user name..." ref={nameRef} />}
        {isNameInvalid && <span className={classes.invalid}>Invalid Name!</span>}

        {confirmNewPassword && <label>New Password</label>}
        {confirmNewPassword && <input className={`${classes.loginInput} ${isNewPasswordInvalid && classes.invalidInput}`} type="password" placeholder="Enter your new Password..." ref={confirmNewPasswordRef} />}
        {isNewPasswordInvalid && <span className={classes.invalid}>Invalid Password!</span>}

        <button className={classes.loginButton} type='submit'>Login</button>
        <button className={`${classes.loginButton} ${classes.forgotPasswordButton}`} type='button' onClick={() => forgotPasswordHandler()} ref={buttonRef}>
          {forgotPassword ? 'Update Password' : confirmNewPassword ?
            'Confirm Password' : 'Forgot Password'}</button>
      </form>
      <Link className="link" to="/register">
        <button className={classes.loginRegisterButton}>Register</button>
      </Link>

    </div>
  );
}
