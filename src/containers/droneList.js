import React from 'react'
import '../App.css'

class DroneList extends React.Component {

  changeDateFormat = (date) => {
    let dateobj = date.split('-')
    let y = dateobj[0]
    let m = dateobj[1]
    let d = dateobj[2].slice(0,2)
    let datestr = m +'.'+ d +'.'+y
    return datestr
  }

  mapDroneData = () => {
    let droneData = this.props.data

    if (droneData !== undefined) {
      return droneData.map((droneObj) => {
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
        <h3>Drone Strike List</h3>
        <form><input type="text" value={this.props.searchTerm} placeholder="Search by Country or Year" onChange={(event) => {this.props.handleChange(event)}}></input></form>
        <select
          value={(event) => {this.props.selectedValue(event)}}
          onChange={(event) => {this.props.handleSelectChange(event)}}
        >
          <option value="date">Date</option>
          <option value="country">Country</option>
          <option value="deaths">Deaths</option>
        </select>
        {this.mapDroneData()}
      </div>
    )
  }
}

export default DroneList;
