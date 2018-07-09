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
    let droneData = this.props.data

    if (droneData !== undefined) {
      return droneData.map((droneObj) => {
        // return <DroneDetails key={droneObj.number} country={droneObj.country} date={droneObj.date} description={droneObj.narrative} onClick={this.props.handleClick}/>
        return (
          <div onClick={(event) => {this.props.handleClick(event, droneObj)}}>
            <p><strong>Country:</strong> {droneObj.country} <br/> <strong>Date:</strong> {this.changeDateFormat(droneObj.date)}</p>
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
