import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import Shop from "./components/Shop";
import About from "./components/About";
import Contact from "./components/Contact";
import TopNavbar from "./components/TopNavbar";
import RctTable from "./components/RctTable";
import Tab from "./components/Tab";

// import Table1 from "./components/Table1";

/* The `App` function is a React component that returns JSX code. In this case, it returns a `<div>`
element with the class name "App" and a `<Navbar>` component inside it. This code represents the
structure and content of the main component of the application. */
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopNavbar />

        <div className="left-section">
          {/* <div className="split left"> */}
          <Navbar />
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/blog" exact Component={Blogs} />
            <Route path="/shop" exact Component={Shop} />
            <Route path="/about" exact Component={About} />
            <Route path="/contact" exact Component={Contact} />
          </Routes>
        </div>
        <div className="right-section">
          {/* <div className="split right"> */}
          <Tab />
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
