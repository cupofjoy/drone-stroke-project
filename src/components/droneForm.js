import React from 'react'

const DroneForm = (props) => {
  return (
    <form onChange={(event) => {props.handleChange(event, event.target.value)}} onSubmit={(event) => {props.handleSubmit(event, event.target.value)}}>
      <h1>Add New Info</h1>
      <p>Country: <input type="text" name="country" autoComplete='country-name'></input><br/></p>
      <p>Date: <input type="date" name="date" /><br/></p>
      <p>Province: <input type="text" name="province"/><br/></p>
      <p>Narrative: <label><textarea name="narrative"></textarea></label><br/></p>
      <p>Deaths: <input type="text" name="deaths" /><br /></p>
      <p>Injuries: <input type="text" name="injuries" /><br /></p>
      <input type="submit" />
    </form>
  )
}

export default DroneForm
