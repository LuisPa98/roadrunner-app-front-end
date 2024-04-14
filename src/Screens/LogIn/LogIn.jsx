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
      setProfile(userData.profile);
      navigate(`/profile/${userData.profile.user}`); // Redirect after successful login
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
    <div className="loginContainer">
      <img
        src={process.env.PUBLIC_URL + "/Assets/OrangeLogoWhiteSlogan.png"}
        alt="logo"
        width="70%"
        className="loginLogo"
      />
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          className="loginInput"
          type="text"
          name="username"
          value={form.username}
          placeholder="Enter Username"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          className="loginInput"
          type="password"
          name="password"
          value={form.password}
          placeholder="Enter Password"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        {renderError()}
        <button className="loginSubmitButton" type="submit">
          Sign In
        </button>
      </form>
      <p className="loginRedirect">
        Don't have an account?{"  "}
        <a href="/sign-up" className="loginLinkToSignup">
          Create Account
        </a>
      </p>
    </div>
  );
}

export default Login;
