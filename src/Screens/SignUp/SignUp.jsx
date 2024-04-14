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
      console.log(userData);
      setUser(userData.user);
      setProfile(userData.profile);
      navigate("/feed");
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
      return (
        <button className="signupSubmitButton" type="submit">
          Create Account
        </button>
      );
    }
  };

  return (
    <div className="signupContainer">
      <img
        src={process.env.PUBLIC_URL + "/Assets/OrangeLogoWhiteSlogan.png"}
        alt="logo"
        width="70%"
        className="signupLogo"
      />
      <form className="signupForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={form.username}
          placeholder="Enter Username"
          onChange={handleChange}
          required
          autoComplete="off"
          className="signupInput"
        />
        <input
          type="text"
          name="email"
          value={form.email}
          placeholder="Enter email"
          onChange={handleChange}
          required
          autoComplete="off"
          className="signupInput"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Enter Password"
          onChange={handleChange}
          required
          autoComplete="off"
          className="signupInput"
        />
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          placeholder="Enter Firstname"
          onChange={handleChange}
          required
          autoComplete="off"
          className="signupInput"
        />
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          placeholder="Enter Lastname"
          onChange={handleChange}
          required
          autoComplete="off"
          className="signupInput"
        />

        {renderError()}
      </form>
      <p className="signupRedirect">
        Already have an account?{" "}
        <a href="/" className="signupLinkToLogIn">
          Sign In
        </a>
      </p>
    </div>
  );
}

export default SignUp;
