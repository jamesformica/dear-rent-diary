import React, { Component, Fragment } from 'react'
import Webcam from 'react-webcam'
import { connect } from 'react-redux'

import Countdown from './Countdown'
import { beginProcessing, beginCountdown, submitFiller } from '../actions'
import { analyse } from './webcamHelpers'
import './WebcamController.css'

const videoConstraints = {
  facingMode: 'user',
  width: 400,
  height: 400,
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
    const { onBeginCountdown, onBeginProcessing, onSubmitFiller } = this.props

    onBeginProcessing(imageSrc)
    analyse(imageSrc, onSubmitFiller, onBeginCountdown)
  }

  render() {
    const { status, image } = this.props

    return (
      <Fragment>
        <div className="Webcam__polaroid">
          <Webcam
            audio={false}
            ref={this.setRef}
            width={400}
            height={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />

          {!!image && (
            <img className="Webcam__image" src={image} alt="emotion" />
          )}
        </div>

        {status === 'COUNTDOWN' && (
          <Countdown onCountdown={this.capture} />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  image: state.image,
  status: state.status,
  lastImage: state.image,
})

const mapDispatchToProps = {
  onBeginCountdown: beginCountdown,
  onBeginProcessing: beginProcessing,
  onSubmitFiller: submitFiller,
}

export default connect(mapStateToProps, mapDispatchToProps)(WebcamController)
