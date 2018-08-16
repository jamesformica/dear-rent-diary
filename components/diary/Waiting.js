import React from 'react'
import { connect } from 'react-redux'

import { beginTyping } from '../actions'
import './Waiting.css'

const Waiting = ({ onBeginTyping }) => (
  <div className="Waiting">
    <h2 className="Waiting__title">Begin next diary entry...</h2>
    <button className="Waiting__button" type="button" onClick={onBeginTyping}>
      START
    </button>
  </div>
)

const mapDispatchToProps = { onBeginTyping: beginTyping }

export default connect(null, mapDispatchToProps)(Waiting)
