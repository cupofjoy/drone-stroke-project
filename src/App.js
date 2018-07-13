import React, { Component } from 'react';
import './App.css';

import DroneList from './containers/droneList'
import DroneView from './containers/droneView'
// import { Link, Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      filteredData: [],
      searchTerm: "",
      currentDrone: {},
      dropDownValue: "",
      newDrone: {
        country: "",
        date: "",
        province: "",
        narrative: "",
        deaths: "",
        injuries: ""
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
      this.setState({data: dataBody, filteredData: dataBody})
    })
  }

  pushToDatabase = (data) => {
    const databaseURL = "http://localhost:4000/api/v1/drones"
    console.log(data.strike)
    let droneArr = data.strike
    if (droneArr.length > 0) {
      for (let i = 0; i < droneArr.length; i++) {
        let drone = droneArr[i]

        let config =  {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'Data-type':'application/json',
          },
          body: JSON.stringify(drone)
        }

        fetch(databaseURL, config)
          .then( r=> r.json() )
          .then( d => console.log(d) )
      }
    }
  }

  handleClick = (event, droneObj) => {
    console.log("droneObj", droneObj);
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
    // event.preventDefault();
    this.postData();
  }

  postData = () => {
    let databaseURL = "http://localhost:4000/api/v1/drones"

    let config = {
      body: JSON.stringify(this.state.newDrone),
      headers: {"Content-Type": "application/json"},
      method: "POST"
    }

    fetch(databaseURL, config).then(r => r.json()).then(this.setState({
      data: [this.state.newDrone, ...this.state.data]
    }))
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
    console.log('term', event.target.value);
    this.setState({dropDownValue: sortTerm})

    if (sortTerm === 'country') {
      sortedData.sort(function(a, b) {
        return a.country.localeCompare(b.country)
      })
      this.setState({filteredData: sortedData})
    } else if (sortTerm === 'date') {
      sortedData.sort(function(a, b) {
        return (a.date.split("-")[0]).localeCompare(b.date.split("-")[0])
      })
      this.setState({filteredData: sortedData})
    } else if (sortTerm === 'deaths') {
      sortedData.sort(function(a, b) {
        if (a.deaths.includes("-")) {
          let newA = a.deaths.split("-")[0]
          if (b.deaths.includes("-")) {
            let newB = b.deaths.split("-")[0]
            return newA.localeCompare(newB)
          } else {
            return newA.localeCompare(b.deaths)
          }
        } else if (b.deaths.includes("-")) {
          let newB = b.deaths.split("-")[0]
          if (a.deaths.includes("-")) {
            let newA = a.deaths.split("-")[0]
            return newA.localeCompare(newB)
          } else {
            return a.deaths.localeCompare(newB)
          }
        } else {
          return a.deaths.localeCompare(b.deaths)
        }
      })
      this.setState({filteredData: sortedData})
    } else {
      this.setState({filteredData: this.state.data})
    } 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Drone Strikes</h1>
        </header>
        <div className="body">
          {
            this.state.data.length > 0 ?
              <div className="list-container">
                <DroneList
                  searchTerm={this.state.searchTerm}
                  dropDownValue={this.state.dropDownValue}
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
      </div>
    );
  }
}

export default App;
