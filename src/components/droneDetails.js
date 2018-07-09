import React from 'react'
import Map from './Map'

class DroneDetails extends React.Component {
  changeDateFormat = (date) => {
    if (date !== undefined) {
      let dateobj = date.split('-')
      let y = dateobj[0]
      let m = dateobj[1]
      let d = dateobj[2].slice(0,2)
      let datestr = m +'/'+ d +'/'+y
      return datestr
    }
  }

  renderDetails = () => {
    let drone = this.props.drone
    console.log(this.props.drone)


    if (drone.country !== undefined) {
      return (
        <div>
          <h1>Country: {drone.country}</h1>
          <p>Date: {this.changeDateFormat(drone.date)}</p>
          {drone.location !== "" ? <p>Province: {drone.location}</p> : null}
          <p>Narrative: {drone.narrative}</p>
          {drone.deaths !== "" ? <p>Deaths: {drone.deaths}</p> : null}
          {drone.civilians !== "" ? <p>Civilian Deaths: {drone.civilians}</p> : null}
          {drone.children !== "" ? <p>Children Deaths: {drone.children}</p> : null}
          {drone.bij_link !== "" ? <div><a href={drone.bij_link} alt="link"> Link </a><br/><br/></div> : null}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderDetails()}
        <Map lat={this.props.drone.lat} lon={this.props.drone.lon} />
      </div>

    )
  }
}

export default DroneDetails;
