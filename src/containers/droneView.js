import React, { Component } from 'react'
import DroneDetails from '../components/droneDetails'
import DroneForm from '../components/droneForm'
import '../App.css'

export default class DroneView extends Component {
  render() {
    return (
      <div>
        <div className="drone-details">
          <DroneDetails drone={this.props.drone}/>
        </div>
        <div className="drone-form">
          <DroneForm handleChange={this.props.handleFormChange} handleSubmit={this.props.handleFormSubmit}/>
        </div>
      </div>
    )
  }
}
