import React, { Component } from 'react'

export default class DroneForm extends Component {
  render() {
    return (
      <form>
        Country:<input type="text" name="country"></input><br/>
        Province:<input type="text" name="province"/><br/>
        Narrative: <input type="text" name="narrative" /><br/>
      </form>
    )
  }
}
