import classes from "./register.module.css"
import {useState} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
    const [username,setUsername]=useState('');
    const [email, setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(false);
    const [isUserTouched,setIsUserTouched]=useState(false)
    const [isEmailTouched,setIsEmailTouched]=useState(false)
    const [isPasswordTouched,setIsPasswordTouched]=useState(false);
    
    let isUserInvalid=false;
    let isEmailInvalid=false;
    let isPasswordInvalid=false;
    let isInputInvalid=false;
    
    
    // console.log('the passowrd length is: ',password.trim().length>4);
    (!(username.trim().length > 0) && isUserTouched) ? isUserInvalid = true : isUserInvalid = false;
    (!email.trim().includes('@') && isEmailTouched) ? isEmailInvalid = true : isEmailInvalid = false;
    (!(password.trim().length > 4) && isPasswordTouched) ? isPasswordInvalid = true : isPasswordInvalid = false;
    (isUserInvalid || isEmailInvalid || isPasswordInvalid || !isUserTouched || !isEmailTouched || !isPasswordTouched) ? isInputInvalid=true : isInputInvalid=false
    

    const handleSubmit=async(e)=>{
          e.preventDefault();
          setError(false);
          if(!isInputInvalid)
          {
            try{
              const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
                username,
                email,
                password,
              });
              res.data && window.location.replace("/login");
            }
            catch(error)
            {
              setError(true);
            }
          }
          else{
            console.log('Invalid credentials');
          }
    }


    return (
        <div className={classes.register}>
      <span className={classes.registerTitle}>Register</span>
      <form className={classes.registerForm} onSubmit={handleSubmit}>

        <label>Username</label>
        <input  onBlur={()=>setIsUserTouched(true)} value={username} className={`${classes.registerInput} ${isUserInvalid && classes.invalidInput}`} type="text" placeholder="Enter your username..." onChange={(e)=> setUsername(e.target.value)}/>
        {isUserInvalid && <span className={classes.invalid}>Invalid Username!!</span>}

        <label>Email</label>
        <input  onBlur={()=>setIsEmailTouched(true)} className={`${classes.registerInput} ${isEmailInvalid && classes.invalidInput}`} type="text" placeholder="Enter your email..." onChange={(e)=> setEmail(e.target.value)} value={email}/>
        {isEmailInvalid && <span className={classes.invalid}>Invalid Email!</span>}

        <label>Password</label>
        <input onBlur={()=>setIsPasswordTouched(true)} className={`${classes.registerInput} ${isPasswordInvalid && classes.invalidInput}`} type="password" value={password} placeholder="Enter your password..." onChange={(e)=>setPassword(e.target.value)} />
        {isPasswordInvalid && <span className={classes.invalid}>Invalid Password!</span>}

        <button className={`${classes.registerButton} ${isInputInvalid && classes.disable}`} type='submit' disabled={isInputInvalid}>Register</button>
      </form>
        <button className={classes.registerLoginButton}>
        <Link className="link" to="/login">
          Login
        </Link>
        </button>
        {error && <span style={{color:'red', marginTop:'10px'}}>Something went wrong!</span>}
    </div>
    )
}
