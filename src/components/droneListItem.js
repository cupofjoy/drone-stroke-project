import React from 'react'
import '../App.css'

const DroneListItem = (props) => {
  const changeDateFormat = (date) => {
    let dateobj = date.split('-')
    let y = dateobj[0]
    let m = dateobj[1]
    let d = dateobj[2].slice(0,2)
    let datestr = m +'.'+ d +'.'+y
    return datestr
  }

  return (
    <div className="droneListItem" onClick={(event) => {props.handleClick(event, props.drone)}}>
      <p><strong>Country:</strong> {props.drone.country} | <strong>Date:</strong> {changeDateFormat(props.drone.date)}</p>
    </div>
  )
}

export default DroneListItem
