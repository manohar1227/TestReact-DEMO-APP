import { Link } from "react-router-dom";
import React from "react";
import "./TopNavbar1.css";
import LoginButton from "./LoginButton";

function TopNavbar() {
  return (
    <nav className="top-navbar">
      <div>
        <ul id="topnav">
          {/* <li>
            <Link to="/Tab">Tab1</Link>
          </li>
          <li>
            <Link to="/Tab2">Tab2</Link>
          </li>
          <li>
            <Link to="/Tab3">Tab3</Link>
          </li> */}
          <LoginButton />
        </ul>
      </div>
    </nav>
  );
}
export default TopNavbar;
