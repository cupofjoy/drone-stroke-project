import React, { Component } from 'react'
import DroneDetails from '../components/droneDetails'
import DroneForm from '../components/droneForm'

export default class DroneView extends Component {
  render() {
    return (
      <div>
        <DroneDetails drone={this.props.drone}/>
        <DroneForm />
      </div>
    )
  }
}
