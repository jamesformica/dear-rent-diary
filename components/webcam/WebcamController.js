import React, { Component, Fragment } from 'react'
import Webcam from 'react-webcam'
import { connect } from 'react-redux'

import Countdown from './Countdown'
import { beginProcessing, submitFiller } from '../actions'
import { analyse } from './webcamHelpers'

const videoConstraints = {
  facingMode: 'user',
}

class WebcamController extends Component {
  constructor() {
    super()
    this.setRef = this.setRef.bind(this)
    this.capture = this.capture.bind(this)
  }

  setRef(webcam) {
    this.webCamElement = webcam
  }

  capture() {
    const imageSrc = this.webCamElement.getScreenshot()
    const { onBeginProcessing, onSubmitFiller } = this.props

    analyse(imageSrc, onBeginProcessing, onSubmitFiller)
  }

  render() {
    const { status } = this.props

    return (
      <Fragment>
        <Webcam
          audio={false}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          style={{ transform: 'scaleX(-1)' }}
        />

        {status === 'COUNTDOWN' && (
          <Countdown onCountdown={this.capture} />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  status: state.status,
})

const mapDispatchToProps = {
  onBeginProcessing: beginProcessing,
  onSubmitFiller: submitFiller,
}

export default connect(mapStateToProps, mapDispatchToProps)(WebcamController)
