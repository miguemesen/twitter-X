import React from "react";
import "./Sidebar.scss";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";
import { getUserInformation } from "./utils";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const {user_id} = getUserInformation();
  const navigate = useNavigate()
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo-item">
          <a href="/" className="logo-item-nav-link">
            <div>
            <FaXTwitter className="icon"/>
            </div>
            <span className="link-text logo-text">Twitter</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">
            <div>
              <FaHome className="icon" />
            </div>
            <span className="link-text">Home</span>
          </a>
        </li>
        <li className="nav-item">
          <a onClick={() => navigate(`/profile/${user_id}`)} className="nav-link">
            <div>
              <FaUser className="icon"/>
            </div>
            <span className="link-text">Profile</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/messages" className="nav-link">
            <div>
              <FaMessage className="icon"/>
            </div>
            <span className="link-text">Messages</span>
          </a>
        </li>
        <li className="nav-item" onClick={() => localStorage.clear()}>
          <a href="/login" className="nav-link" >
            <div>
              <RiLogoutBoxRLine className="icon" />
            </div>
            <span className="link-text">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
