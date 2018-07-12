import React from 'react'

const DroneForm = (props) => {
  return (
    <form
      onChange={(event) => {props.handleChange(event, event.target.value)}}
      onSubmit={(event) => {props.handleSubmit(event, event.target.value)}}
    >
      <h1>Add New Info</h1>
      <p>Country:<br/>
        <input
          type="text"
          value={props.newDrone.country}
          name="country"
          autoComplete='country-name'
        ></input><br/></p>
      <p>Date:<br/>
        <input
          type="date"
          value={props.newDrone.date}
          name="date"
        /><br/></p>
      <p>Province:<br/>
        <input
          type="text"
          value={props.newDrone.province}
          name="province"
        /><br/>
      </p>
      <p>Deaths:<br/>
        <input
          type="text"
          value={props.newDrone.deaths}
          name="deaths"
        /><br /></p>
      <p>Injuries:<br/>
        <input
          type="text"
          value={props.newDrone.injuries}
          name="injuries"
        /><br />
      </p>
      <p>Narrative:<br/>
        <label><textarea
          value={props.newDrone.narratice}
          name="narrative"></textarea>
        </label><br/>
      </p>
      <input type="submit" />
    </form>
  )
}

export default DroneForm
