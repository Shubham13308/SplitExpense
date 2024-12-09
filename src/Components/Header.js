import React from "react";
import "../Css/Header.css";

const Header = () => {
  
  const currentDate = new Date().toLocaleDateString();

  return (
    <header className="header-container">
      <div className="logo">
        <a href="#">Split The Money</a>
      </div>
      <div className="logo">
        <a href="#">{currentDate}</a> 
      </div>
      <div className="menu-icon">
        <i className="fas fa-bars"></i>
      </div>
    </header>
  );
};

export default Header;
