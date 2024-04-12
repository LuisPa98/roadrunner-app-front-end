import React from "react";
import "./signUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../Services/users.js";


function SignUp({ setUser, setProfile }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",    
    last_name: "",
    isError: false,
    errorMsg: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }; 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = await signUp(form);
      setUser(userData.user);
      setProfile(userData.profile)

      navigate("/profile");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        isError: true,
        errorMsg: "Invalid Credentials",
        username: prevForm.username,
        email: "",
        password: "",
      }));
    }
  };

  const renderError = () => {
    const toggleForm = form.isError ? "danger" : "";

    if (form.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {form.errorMsg}
        </button>
      );
    } else {
      return <button type="submit">Register</button>;
    }
  };
  
  return (
    <div className="home-container">
      
      <div>
        <form className="home-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input
            type='text'
            name='username'
            value={form.username}
            placeholder='Enter Username'
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type='password'
            name='password'
            value={form.password}
            placeholder='Enter Password'
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type='text'
            name='first_name'
            value={form.first_name}
            placeholder='Enter Firstname'
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type='text'
            name='last_name'
            value={form.last_name}
            placeholder='Enter Lastname'
            onChange={handleChange}
            required
            autoComplete="off"
          />



          {renderError()}
        </form>
      </div>
    </div>
  )
}

export default SignUp;