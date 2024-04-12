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
        <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s-a+9ed4bd(-73.9897624,40.7400173),pin-s-b+000(-73.9897754,40.7400121),path-5+f44-0.5(c%60twF~brbM@B)/auto/500x300?access_token=pk.eyJ1IjoiamxvcGV6MDAwMSIsImEiOiJjbHVxM3hpNzUyaDF3MmlwNTdweXo2eTV4In0.TjcOANL_eRtpoaDXWQpWPg" alt="run"/>
      </div>
    </div>
  );
}

export default Login;