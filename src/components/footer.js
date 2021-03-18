import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faHome, faEnvelope, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../styles/footer.css";

export default function footer() {
  return (
    <footer
      className="white-text page-footer font-small pt-4"
      style={{ backgroundColor: "#1d2f47" }}
    >

      <div className="container text-center text-md-left">
        <div id="go-top">
          <button className="smoothscroll" title="Back to Top" onClick={() => window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })}>
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        </div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
              Contact Us
            </h5>
            <p>
              <FontAwesomeIcon icon={faHome} className="mr-3" />
              NITK, Surathkal, Karnataka, India- 575025
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="mr-3" />{" "}
              <span className="f-link">
                <a
                  href="mailto:web_enthusiasts_club@nitk.edu.in"
                  style={{ color: "#52c5c2", textDecoration: "none" }}
                >
                  web_enthusiasts_club@nitk.edu.in
                </a>
              </span>
            </p>
            <p>Faculty Advisor: Professor Sowmya Kamath S</p>
          </div>

          <hr className="clearfix w-100 d-md-none" />

          <div className="col-md-6 mx-auto">
            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
              About Us
            </h5>
            <p>
              A group of passionate computer science students helping the
              community of NITK
            </p>
          </div>
        </div>
        <hr />

        <div className="row pb-3">
          <div className="col-md-12">
            <div className="mb-5 text-center">
              <a href="https://www.facebook.com/web.club.nitk/">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  size="lg"
                  className="mr-4 footer-link"
                />
              </a>
              <a href="https://www.linkedin.com/school/web-enthusiasts-club-nitk/">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  size="lg"
                  className="mr-4 footer-link"
                />
              </a>
              <a href="https://www.instagram.com/wecnitk/">
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="lg"
                  className="mr-4 footer-link"
                />
              </a>
              <a href="https://www.github.com/WebClub-NITK">
                <FontAwesomeIcon
                  icon={faGithub}
                  size="lg"
                  className="footer-link"
                />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
