import React from 'react'
import moment from 'moment'

import WebcamController from '../webcam/WebcamController'
import leather from './dark_leather.png'
import './Webcam.css'

const Webcam = () => (
  <div className="Webcam" style={{ background: `url('${leather}')` }}>
    <div className="Webcam__paper">
      <span className="Webcam__paper-number">{moment().add(1, 'days').format('Do MMM')}</span>
      <WebcamController />
    </div>
  </div>
)

export default Webcam
