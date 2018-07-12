import React from 'react'
import Map from './Map'
import '../App.css'

class DroneDetails extends React.Component {
  changeDateFormat = (date) => {
    if (date !== undefined) {
      let dateobj = date.split('-')
      let y = dateobj[0]
      let m = dateobj[1]
      let d = dateobj[2].slice(0,2)
      let datestr = m +'.'+ d +'.'+y
      return datestr
    }
  }

  renderDetails = () => {
    let drone = this.props.drone
    // console.log("droneDetail", this.props.drone)

    if (drone.country !== undefined) {
      return (
        <div>
          <h1>Drone Strike Details</h1>
            <h3>Country: {drone.country} | <strong>Date:</strong> {this.changeDateFormat(drone.date)} </h3>
          {drone.location !== "" ? <p><strong>Province:</strong> {drone.location}</p> : null}
          <p><strong>Narrative: </strong>{drone.narrative}</p>
          {drone.deaths !== "" ? <p><strong>Deaths:</strong> {drone.deaths}</p> : null}
          {drone.injuries !== "" ? <p><strong>Injuries:</strong> {drone.injuries}</p> : null}
          {drone.civilians !== "" ? <p><strong>Civilians:</strong> {drone.civilians}</p> : null}
          {drone.children !== "" ? <p><strong>Children:</strong> {drone.children}</p> : null}
          {drone.bij_link !== "" ? <div><a href={drone.bij_link} alt="link"> Link </a><br/><br/></div> : null}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderDetails()}
        {this.props.drone.lat !== undefined ? <Map className="map" lat={this.props.drone.lat} lon={this.props.drone.lon} /> : null}
      </div>

    )
  }
}

export default DroneDetails;
