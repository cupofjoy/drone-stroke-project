import React from 'react'

class DroneList extends React.Component {
  changeDateFormat = (date) => {
    let dateobj = date.split('-')
    let y = dateobj[0]
    let m = dateobj[1]
    let d = dateobj[2].slice(0,2)
    let datestr = m +'/'+ d +'/'+y
    return datestr
  }

  mapDroneData = () => {
    let droneData = this.props.data.strike

    if (droneData !== undefined) {
      return droneData.map((droneObj) => {
        // return <DroneDetails key={droneObj.number} country={droneObj.country} date={droneObj.date} description={droneObj.narrative} onClick={this.props.handleClick}/>
        return (
          <div key={droneObj.number} onClick={(event) => {this.props.handleClick(event, droneObj)}}>
            <p>Country: {droneObj.country} <br/> Date: {this.changeDateFormat(droneObj.date)}</p>
          </div>
        )
      })
    }

  }

  render() {
    return (
      <div className="list">
        {this.mapDroneData()}
      </div>
    )
  }
}

export default DroneList;
