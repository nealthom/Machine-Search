import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const [results, setResults] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/users/login", {
        email,
        password
      });
      setResults(response.data.user.name);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleLogin = event => {
    event.preventDefault();
    getResults();
  };
  return (
    <div className="header">
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Login</span>
          <span className="heading-primary--sub">My Friend </span>
        </h1>
        <form onSubmit={handleLogin} className="form">
          <div className="form__group">
            <input
              className="form__input"
              type="email"
              onChange={event => setEmail(event.target.value)}
              placeholder="email"
              id="email"
              required
            />
            <label for="email">Email address</label>
          </div>

          <div className="form__group">
            <input
              className="form__input"
              type="password"
              onChange={event => setPassword(event.target.value)}
              placeholder="password"
              id="password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button type="submit" className="btn btn--green">
            Login
          </button>
        </form>

        {loading ? <div>Loading results...</div> : <h1>{results}</h1>}
      </div>
    </div>
  );
}
