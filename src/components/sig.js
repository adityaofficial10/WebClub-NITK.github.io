import React from "react";
import algoImg from "../assets/images/algo.png";
import devImg from "../assets/images/dev.jpg";
import intelligenceImg from "../assets/images/intelligence.png";
import systemsImg from "../assets/images/systems.png";
import "../styles/sig.css";

export default function SIG() {
  return (
    <section id="home-section">
      <h1 className="heading">Our SIG's</h1>
      <div className="container">
        <div className="row no-gutters sigs mb-3">
          <div
            className="col-lg-6 text-white showcase-img sig-img"
            style={{ backgroundImage: `url(${algoImg})` }}
          ></div>
          <div className="sig-details col-lg-6 order-lg-1  showcase-text">
            <h2>Algorithms Group</h2>
            <p className="lead mb-0">
              We are a group of coding enthusiasts whose aim is to promote
              Competitive Programming culture at NITK. As part of this mission,
              we conduct many workshops and contests related to CP. We also
              conduct sessions like Codebuddy as a bridge between junior-senior.
              This year we are starting a new mentorship program as part of the
              SIG to help students in the field of coding skills required to
              crack interviews for internships and placements
            </p>
          </div>
        </div>

        <div className="row no-gutters sigs mb-3">
          <div
            className="col-lg-6 order-lg-2 text-white showcase-img sig-img"
            style={{ backgroundImage: `url(${devImg})` }}
          ></div>
          <div className="sig-details col-lg-6 order-lg-1  showcase-text">
            <h2>Development Group (DSC)</h2>
            <p className="lead mb-0">
              We focus on helping students bridge the gap between theory and
              practice in software development. Students grow their knowledge in
              a peer-to-peer learning environment while building solutions to
              existing problems and helping the communities around through
              various projects and events. We have tried our hands on backend,
              frontend, mobile development and are now venturing into game
              development as well
            </p>
          </div>
        </div>

        <div className="row no-gutters sigs mb-3">
          <div
            className="col-lg-6 text-white showcase-img sig-img"
            style={{ backgroundImage: `url(${intelligenceImg})` }}
          ></div>
          <div className="sig-details col-lg-6 order-lg-1  showcase-text">
            <h2>Intelligence Group</h2>
            <p className="lead mb-0">
              We focus on understanding human intelligence and applying it to
              machines for the benefit of humanity. We explore the domains of
              Machine Learning (ML) and Artificial Intelligence (AI), focusing
              on both research and applications. We research topics in ML
              theory, Deep Learning, Reinforcement Learning, Data Science, etc.
              and their applications in simulated and real worlds. We are also
              interested in competitive ML, primarily participating in Kaggle
              contests and applying ML techniques for software products
            </p>
          </div>
        </div>

        <div className="row no-gutters sigs">
          <div
            className="col-lg-6 order-lg-2 text-white showcase-img sig-img"
            style={{ backgroundImage: `url(${systemsImg})` }}
          ></div>
          <div className="sig-details col-lg-6 order-lg-1  showcase-text">
            <h2>Systems & Security Group</h2>
            <p className="lead mb-0">
              We are group of motivated, passionate students who are interested
              in exploring the various avenues of computer systems . The Systems
              and Security SIG deals with a broad range of domains including
              Networks and Distributed Systems, Blockchains, Security, OS, DBMS
              and Architecture. We are enthusiastic about exploring large open
              source projects like the Linux kernel. Whether you're interested
              in Capture the Flag (CTF) security challenges or understanding how
              large systems like Netflix work, Systems and Security SIG is your
              go-to group at NITK
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
