import React from "react";
import "../../styles/eventCard.css";
const ReactMarkdown = require('react-markdown');

export default function EventCard(props) {
  const imageUrl = `url(${props.image})`;
  return (
    <article className={"EventCard mix " + props.classs}>
      <div className="thumb" style={{ backgroundImage: imageUrl }} />
      <div className="infos">
        <div>
        <h2 className="title">
          <span className="ellipss">{props.title}</span>
          <span className="time">{props.time}</span>
        </h2>
        <h3 className="detail">{props.date}</h3>
        <h3 className="detail"> {props.venue}</h3>
        <p className="txt">{<ReactMarkdown children={props.description} />}</p>
        </div>
        {props.extras && <a className="details" target="_blank" href={props.extras} rel="noreferrer noopener">More Info</a>}
      </div>
    </article>
  );
}

