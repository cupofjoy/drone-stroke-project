import React from 'react'
import DroneDetails from '../components/droneDetails'
import DroneForm from '../components/droneForm'
import '../App.css'

const DroneView = (props) => {
  return (
    <div>
      <div className="drone-details">
        <DroneDetails drone={props.drone}/>
      </div>
      <div className="drone-form">
        <DroneForm handleChange={props.handleFormChange} handleSubmit={props.handleFormSubmit}/>
      </div>
    </div>
  )
}

export default DroneView
