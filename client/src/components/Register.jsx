import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState,useEffect } from "react";
// import "./register.css";

export default function Register({ setShowLogin,setCurrentUsername,myStorage,id,auth }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };


      axios.post(auth+"/register", newUser).then((res) => {
      setCurrentUsername(res.data.username);
      myStorage.setItem('user', res.data.loggedUser);
      id(res.data.loggedUser);
      setError({error: false , message:""});
      setSuccess(true);
      setShowLogin(true);
    }).catch ((err) => {
      console.log( err);
      setError({ error: true, message: "User name or password is wrong" });
    });

  }

  return (
    <div className="registerContainer">
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" min="2" ref={usernameRef} required/>
        <input type="email" placeholder="email" ref={emailRef} required />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
          required
        />
        <input
          type="password"
          min="6"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
          required
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
        {success && (
          <span className="success">Successfull. You will be redirected</span>
          //react router dom redirect here 
        )}
        {error.error && <span className="failure">{error.message}</span>}
      </form>
    </div>
  );
}
