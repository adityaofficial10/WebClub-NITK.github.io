import React from "react";
import EventCard from "./EventCard";
import YearNavigation from "./yearNavigation.js";
import Nav from "../Nav/Nav";
import eventsData from "../../assets/data/events.json";
import "../../styles/events.css";
import Helmet from "react-helmet";
import mixitup from 'mixitup';
import { eventsWorkSheetId } from './../../environment';
import SpreadSheetApi from '../../_services/spreadSheetApi';


class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsData:[]
    };
    this.getData();
  }

  async getData(){
    var finalArray = await SpreadSheetApi.getWorkSheetData(eventsWorkSheetId);
    this.setState({eventsData:finalArray});
  }

  componentDidMount(){
    var containerEl = document.querySelector('.eventsContainer');
    var mixer = mixitup(containerEl);
  }

  

  render() {

    const styles = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around"
    };
    return (
      

      <div>
      <Helmet>
        <title>Events - Web Club NITK</title>
      </Helmet>
      <div>
        <Nav sticky="true" transp="false" />
        <div className="EventDetails">
        <div className="events controls">
          <YearNavigation />
        </div>

        <div className="eventsContainer" style={styles}>
          {this.state.eventsData.map(value => {
            if (value.status == 0) {
              return (
                <EventCard
                  classs={"past"}
                  title={value.title}
                  date={value.date}
                  time={value.time}
                  venue={value.venue}
                  image={value.image}
                  description={value.description}
                />
              );
            } else {
              return (
                <EventCard
                  classs={"upcoming"}
                  title={value.title}
                  date={value.date}
                  time={value.time}
                  venue={value.venue}
                  image={value.image}
                  description={value.description}
                />
              );
            }
          })}
        </div>
        </div>
      </div>
    </div>
    );
  }
}



export default Event;
