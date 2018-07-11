import React from 'react'

const DroneForm = (props) => {
  return (
    <form
      onChange={(event) => {props.handleChange(event, event.target.value)}}
      onSubmit={(event) => {props.handleSubmit(event, event.target.value)}}
    >
      <h1>Add New Info</h1>
      <p>Country:
        <input
          type="text"
          value={props.newDrone.country}
          name="country"
          autoComplete='country-name'
        ></input><br/></p>
      <p>Date:
        <input
          type="date"
          value={props.newDrone.date}
          name="date"
        /><br/></p>
      <p>Province:
        <input
          type="text"
          value={props.newDrone.province}
          name="province"
        /><br/>
      </p>
      <p>Deaths:
        <input
          type="text"
          value={props.newDrone.deaths}
          name="deaths"
        /><br /></p>
      <p>Injuries:
        <input
          type="text"
          value={props.newDrone.injuries}
          name="injuries"
        /><br />
      </p>
      <p>Narrative:
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
