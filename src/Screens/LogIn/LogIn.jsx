import React from "react";
import "./logIn.css"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../Services/users.js"; 

function Login({ setUser, setProfile }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
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
      const userData = await signIn(form); // Use your login service function
      setUser(userData.user);
      setProfile(userData.profile)
      navigate("/profile"); // Redirect after successful login
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        ...prevForm,
        isError: true,
        errorMsg: "Invalid credentials",
        password: "", // Clear password field on error
      }));
    }
  };

  const renderError = () => {
    const toggleForm = form.isError ? "danger" : "";

    if (form.isError) {
      return <p className={toggleForm}>{form.errorMsg}</p>;
    }
  };

  return (
    <div className="home-container">
      <div>
        <form className="home-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            type="text"
            name="username"
            value={form.username}
            placeholder="Enter Username"
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter Password"
            onChange={handleChange}
            required
            autoComplete="off"
          />
          {renderError()}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;