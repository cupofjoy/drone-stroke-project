import React from 'react'

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
    let url = `https://maps.googleapis.com/maps/api/staticmap?center=${drone.lat},${drone.lon}&markers=color:blue%7Clabel:S%${drone.lat},${drone.lon}&zoom=12&size=600x300&maptype=roadmap&key=AIzaSyAM6nPv-8KXjv2kWD486CXAqA8p6DC3ZJY`
    console.log(drone.bij_link)

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
          {drone.lon !== "" ? <img src={url} width="450" height="300" onClick="swap();" id="my-image-id" /> : null}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderDetails()}
      </div>

    )
  }
}

export default DroneDetails;
