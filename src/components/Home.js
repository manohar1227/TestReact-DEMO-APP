import React from "react";
import "./Home.css";
const Home = () => {
  return (
    <div className="form-container">
      <h1>Login</h1>
      <form>
        <div>
          <label>
            Username:
            <input type="name" />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" />
          </label>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Home;
