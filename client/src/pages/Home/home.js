import React from "react";
import "./home.css"
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlineQuestionMark } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiBriefcase } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";


function Home() {
  return (
    <div className="container">
      <div className="left">
        <ul>
          <li>
            <Link to="/" className="link">
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
      <div className="middle">
        <ul>
          <li>
            <div className="text-box">
              <p><Link to="#">Article name</Link> by <Link to="#">Author name</Link></p>
              <h1>The title name example article heading</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

              <div className="post-meta">
                <BsCalendarDate /> 19/10/25
                <AiFillLike /> 3641
                <FaComment /> 89078
              </div>
            </div>
            <div className="img-box">
              <img src="./image.png" alt="Article thumbnail" />
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div className="text-box">
              <p><Link to="#">Article name</Link> by <Link to="#">Author name</Link></p>
              <h1>The title name example article heading</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

              <div className="post-meta">
                <BsCalendarDate /> 19/10/25
                <AiFillLike /> 3641
                <FaComment />
              </div>
            </div>
            <div className="img-box">
              <img src="./image.png" alt="Article thumbnail" />
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div className="text-box">
              <p><Link to="#">Article name</Link> by <Link to="#">Author name</Link></p>
              <h1>The title name example article heading</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

              <div className="post-meta">
                <BsCalendarDate /> 19/10/25
                <AiFillLike /> 3641
                <FaComment />
              </div>
            </div>
            <div className="img-box">
              <img src="./image.png" alt="Article thumbnail" />
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div className="text-box">
              <p><Link to="#">Article name</Link> by <Link to="#">Author name</Link></p>
              <h1>The title name example article heading</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

              <div className="post-meta">
                <BsCalendarDate /> 19/10/25
                <AiFillLike /> 3641
                <FaComment />
              </div>
            </div>
            <div className="img-box">
              <img src="./image.png" alt="Article thumbnail" />
            </div>
          </li>
        </ul>
      </div>
      <div className="right">
        <div className="buttons">
          <h2>Recommended Topics</h2>
          <div>
          <button>ajdjfhalj</button>
          <button>dajkdlhbas</button>
          <button>dfajkd</button>
          <button>sfjasdjkhfchaydslbs</button>
          <button>ajdjfhalj</button>
          <button>dajkdlhbas</button>
          <button>dfajkd</button>
          <button>sfjasdjkhfchaydslbs</button>
          </div>
        </div>

        <div className="saved-blogs">
          <h1>You saved those to read later</h1>
          <ul>
            <li>
              <p>you saved this to read</p>
              <h1>this is title of article</h1>
              <p>some short description of article</p>
              <p>when you added this</p>
            </li>
            <li>
              <p>you saved this to read</p>
              <h1>this is title of article</h1>
              <p>some short description of article</p>
              <p>when you added this</p>
            </li>
            <li>
              <p>you saved this to read</p>
              <h1>this is title of article</h1>
              <p>some short description of article</p>
              <p>when you added this</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
