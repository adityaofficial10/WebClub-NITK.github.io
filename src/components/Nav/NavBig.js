import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import imgUrl from "../../assets/images/webclub-logo-blue.png";
import "../../styles/nav.css";

const Nav = (props) => {
  // Helper function  to combine classes
  function classList(...classes) {
    return classes.filter((item) => !!item).join(" ");
  }

  const history = useHistory();
  const imageUrl = `url(${imgUrl})`;
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;

  // Code to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > window.innerHeight - 700;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Styles to add on scroll

  let divStyle;
  if (props.transp === "false") {
    divStyle = {
      background: "white",
      color: "#1490e4",
    };
  } else {
    divStyle = {
      transition: "0.5s ease",
      backgroundColor: navBackground ? "white" : "transparent",
      color: navBackground ? "#1490e4" : "#b3d3f6",
    };
  }

  let linkStyle;
  if (props.transp === "false") {
    linkStyle = {
      color: "#1490e4",
    };
  } else {
    linkStyle = {
      transition: "0.5s ease",
      color: navBackground ? "#1490e4" : "#b3d3f6",
    };
  }

  return (
    <div
      className={classList(
        "nav",
        props.sticky === "true" && "nav-sticky",
        props.sticky === "false" && "nav-fixed"
      )}
      style={divStyle}
    >
      <div className="nav-container">
        <div className="clubLogo" style={{ cursor: "pointer" }} onClick={() => history.push('/')}>
          <span className="logo" style={{ backgroundImage: imageUrl }} />
          <h1 style={{ marginTop: 10 }}>WebClub</h1>
        </div>
        <div className="links">
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Link to="/events" style={linkStyle}>
            Events
          </Link>
          <Link to="/members" style={linkStyle}>
            Team
          </Link>
          {/* <Link to="/timeline" style={linkStyle}>
            Timeline
          </Link> */}
          {/* <Link to="/blog" style={linkStyle}>
            Blogs
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Nav;
