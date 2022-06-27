import './Die.css'
import { Component } from 'react'

class Die extends Component {
render() {
  return (
    <div className='die'>
      <span>{this.props.state}</span>
      <span>{this.props.city}</span>
      <span>{this.props.population}</span>
    </div>
  )
}
}

export default Die