import React from 'react'
import '../App.css'
import DroneListItem from '../components/droneListItem'

class DroneList extends React.Component {

  mapDroneData = () => {
    let droneData = this.props.data
    if (droneData !== undefined) {
      return droneData.map((droneObj) => {
        return (
          <DroneListItem drone={droneObj} handleClick={this.props.handleClick}/>
        )
      })
    }

  }

  render() {
    return (
      <div className="list">
        <h3 className="drone-strike-list-title">   Drone Strike List  </h3>
        <form className="search">
          <input
            type="text"
            value={this.props.searchTerm}
            placeholder="Search Country/Year"
            onChange={(event) => {this.props.handleChange(event)}} />
        </form>
        <select className="sort"
          value={this.props.dropDownValue}
          onChange={(event) => {this.props.handleSelectChange(event)}}
        >
          <option value="all">All</option>
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
