import React from 'react'
import './sideBar.css'
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlineQuestionMark } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiBriefcase } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaGraduationCap, FaBuilding } from "react-icons/fa";

function SideBar() {

    

  return (
     <div className="left">
        <ul>
          <li>
            <Link to="/" className="link active-link">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/interview" className="link">
              <HiBriefcase /> Interview
            </Link>
          </li>
          <li>
            <Link to="/question" className="link">
              <MdOutlineQuestionMark /> Questions
            </Link>
          </li>
          <li>
            <Link to="/write" className="link">
              <FiEdit /> Write
            </Link>
          </li>
          <li>
            <Link to="/profile" className="link">
              <CgProfile /> Profile
            </Link>
          </li>
        </ul>
      </div>
  )
}

export default SideBar;