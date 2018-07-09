import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import data from './data.js'
import DroneList from './containers/droneList'
import DroneView from './containers/droneView'

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      currentDrone: {},
      newDrone: {
        country: null,
        date: null,
        province: null,
        narrative: null,
        deaths: null
      }
    }
  }

  componentDidMount() {
    const URL = 'https://api.dronestre.am/data'

    fetch(URL)
      .then(r => r.json())
      // .then(data => {this.pushToDatabase(data)})
      .then(d => this.setState({data: d.strike}, () => {console.log(this.state.data)}))
  }

  pushToDatabase = (data) => {
    const databaseURL = "http://localhost:4000/api/v1/drones"
    if (data.length > 0) {
      for (let i = 0; i < 1; i++) {
        let drone = data[i]
        let body = {
          country: drone.country,
          location: drone.town,
          strike_date: drone.date,
          narrative: drone.narrative,
          province: drone.location,
          total_deaths: drone.deaths,
          civilian_deaths: drone.civilians,
          child_deaths: drone.children,
          injuries: drone.injuries,
          twitter_id: drone.tweet_id,
          bureau_id: drone.bureau_id,
          bureau_summary: drone.bij_summary_short,
          link: drone.bij_link,
          target: drone.target,
          longitude: drone.lon,
          latitude: drone.lat,
          names: drone.names
        }
        console.log("body", body)

        let config =  {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'Data-type':'application/json',
          },
          body: JSON.stringify(body)
        }

        fetch(databaseURL, config)
          .then( r=> r.json() )
          .then( d => console.log(d) )
      }
    }
  }

  handleClick = (event, droneObj) => {
    this.setState({currentDrone: droneObj})
  }

  handleFormChange = (event, value) => {
    this.setState({newDrone: {
      ...this.state.newDrone,
      [event.target.name]: value
    }})
  }

  handleFormSubmit = (event, value) => {
    event.preventDefault();
    this.setState({
      // data: Object.assign({}, this.state.data, this.state.newDrone)},
      data: [...this.state.data, this.state.newDrone],
    }, () => console.log("newState", this.state.data))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"></h1>
        </header>
        <div className="list-container">
          <DroneList data={this.state.data} handleClick={this.handleClick}/>
        </div>
        <div className="view-container">
          <DroneView drone={this.state.currentDrone} handleFormChange={this.handleFormChange} handleFormSubmit={this.handleFormSubmit}/>
        </div>
      </div>
    );
  }
}

export default App;
