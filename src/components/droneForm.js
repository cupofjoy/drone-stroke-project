import React, { Component } from 'react'

export default class DroneForm extends Component {
  render() {
    return (
      <form onChange={(event) => {this.props.handleChange(event, event.target.value)}} onSubmit={(event) => {this.props.handleSubmit(event, event.target.value)}}>
        Country:<input type="text" name="country" autoComplete='country-name'></input><br/>
        Date: <input type="date" name="date" /><br/>
        Province:<input type="text" name="province"/><br/>
        Narrative: <input type="text" name="narrative" /><br/>
        Deaths: <input type="text" name="deaths" /><br />
        <input type="submit" />
      </form>
    )
  }
}
