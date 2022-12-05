import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
// import "./login.css";
import Register from "./Register";


export default function Login({ setShowLogin, setCurrentUsername,myStorage,id }) {
  const [error, setError] = useState({ error: false, message: "" });
  const emailRef = useRef();
  const passwordRef = useRef();
  const [haveAccount, setHaveAccount] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axios.post("http://localhost:8800/api/users/login", user).then((res) => {
      console.log(res);  
    setCurrentUsername(res.data.username);
      myStorage.setItem('user', res.data.loggedUser);
      id(res.data.loggedUser);
      setError({error: false , message:""});
      setShowLogin(true);
    }).catch ((err) => {
      console.log( err);
      setError({ error: true, message: "User name or password is wrong" });
    });


  };



  const login = (    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="email" type="email" ref={emailRef} required/>
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
          required
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error.error}
        {error.error && <span className="failure">{error.message}</span>}
      
      </form>
      Dont have a account
      <button className="" onClick={() => setHaveAccount(false)}>Sign up</button>
    </div>)

  return (
haveAccount ? login : <Register setShowLogin={setShowLogin}
setCurrentUsername={setCurrentUsername}
myStorage={myStorage}
id={id}
/>


  );
}
