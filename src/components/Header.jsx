// Dependencies
import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Contact Us</Link>
          </li>
          <li className={'logout'}>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
      
    </header>
  );
};

export default Header;
