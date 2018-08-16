import React, { Component } from 'react'
import './Countdown.css'

class Countdown extends Component {
  constructor() {
    super()
    this.state = { status: 'THREE' }
    this.updateStatus = this.updateStatus.bind(this)
    this.takePhoto = this.takePhoto.bind(this)
  }

  updateStatus(status) {
    this.setState({ status })
  }

  takePhoto() {
    const { onCountdown } = this.props
    onCountdown()
  }

  render() {
    const { status } = this.state

    switch (status) {
      case 'THREE': {
        setTimeout(() => this.updateStatus('TWO'), 500)
        break
      }
      case 'TWO': {
        setTimeout(() => this.updateStatus('ONE'), 500)
        break
      }
      case 'ONE': {
        setTimeout(() => this.updateStatus('FLASH'), 500)
        break
      }
      default: {
        setTimeout(() => this.takePhoto(), 500)
        break
      }
    }

    return (
      <div className="Countdown">
        {status !== 'FLASH' && (
          <h2 className="Countdown__number">
            {status === 'THREE' && '3'}
            {status === 'TWO' && '2'}
            {status === 'ONE' && '1!'}
          </h2>
        )}
        {status === 'FLASH' && <div className="Countdown__flash" />}
      </div>
    )
  }
}

export default Countdown
