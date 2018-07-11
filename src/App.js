import React, { Component } from 'react';
import './App.css';

import DroneList from './containers/droneList'
import DroneView from './containers/droneView'

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      filteredData: [],
      searchTerm: "",
      currentDrone: {},
      newDrone: {
        country: null,
        date: null,
        province: null,
        narrative: null,
        deaths: null,
        injuries: null
      },
    }
  }

  componentDidMount() {
    const URL = 'https://api.dronestre.am/data'
    const databaseURL = "http://localhost:4000/api/v1/drones"

    let apiRequest1 = fetch(URL)
      .then(r => r.json())

    let apiRequest2 = fetch(databaseURL)
      .then(r => r.json())

    let combinedData = {"apiRequest1":{}, "apiRequest2":{}};

    Promise.all([apiRequest1,apiRequest2]).then((values) => {
      combinedData["apiRequest1"] = values[0];
      combinedData["apiRequest2"] = values[1];
      let dataBody = [...combinedData.apiRequest2,  ...combinedData.apiRequest1.strike]
      // console.log("body", dataBody);
      this.setState({data: dataBody, filteredData: dataBody}, () => {console.log("state", this.state.data)})
    })
  }

  pushToDatabase = (data) => {
    const databaseURL = "http://localhost:4000/api/v1/drones"
    console.log(data.strike)
    let droneArr = data.strike
    if (droneArr.length > 0) {
      for (let i = 0; i < droneArr.length; i++) {
        let drone = droneArr[i]
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
    console.log("input", event.target.value)
    this.setState({newDrone: {
      ...this.state.newDrone,
      [event.target.name]: value
    }})
  }

  handleFormSubmit = (event, value) => {
    event.preventDefault();
    this.postData();
  }

  postData = () => {
    // console.log("newDrone", this.state.newDrone)
    let databaseURL = "http://localhost:4000/api/v1/drones"

    this.setState({
      data: [this.state.newDrone, ...this.state.data]
    })

    // console.log("body", body)
    let config = {
      body: JSON.stringify(this.state.newDrone),
      headers: {"Content-Type": "application/json"},
      method: "POST"
    }

    fetch(databaseURL, config).then(r => r.json()).then(this.componentDidMount())
  }

  handleSearchChange = (event) => {
    let filteredData = this.state.data.filter((drone) => {
      return drone.country.toLowerCase().includes(event.target.value) || drone.date.toLowerCase().includes(event.target.value)
    })

    this.setState({
      searchTerm: event.target.value.toLowerCase(),
      filteredData: filteredData
    })
  }

  handleSelectChange = (event) => {
    let sortTerm = event.target.value.toLowerCase()
    let sortedData = this.state.data.slice(0)
    // console.log('sortedData', sortedData)
    // console.log('term', sortTerm);

    if (sortTerm === 'country') {
      sortedData.sort(function(a, b) {
        return a.country - b.country
      })
      this.setState({filteredData: sortedData})
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Drone Strikes</h1>
        </header>
        {
          this.state.data.length > 0 ?
            <div className="list-container">
              <DroneList
                searchTerm={this.state.searchTerm}
                data={this.state.filteredData}
                handleClick={this.handleClick}
                handleChange={this.handleSearchChange}
                selectedValue={this.state.selectedValue}
                handleSelectChange={this.handleSelectChange}
              />
            </div>
          : null
        }
        {
          this.state.currentDrone.country !== undefined ?
            <div className="view-container">
              <DroneView
                drone={this.state.currentDrone}
                newDrone={this.state.newDrone}
                handleFormChange={this.handleFormChange}
                handleFormSubmit={this.handleFormSubmit}
                handleSelectChange={this.handleSelectChange}
              />
            </div>
          : null
        }
      </div>
    );
  }
}

export default App;
