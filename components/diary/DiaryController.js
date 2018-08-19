import React from 'react'
import { connect } from 'react-redux'
import 'react-typist/dist/Typist.css'

import Waiting from './Waiting'
import DiaryEntry from './DiaryEntry'
import { beginCountdown, beginWaiting } from '../actions'
import './DiaryController.css'

const onFinishTyping = (current, onBeginCountdown, onBeginWaiting) => () => {
  if (current.fillers.length + 1 >= current.sentences.length) {
    setTimeout(onBeginWaiting, 3000)
  } else {
    onBeginCountdown()
  }
}

const DiaryController = ({ status, current, onBeginCountdown, onBeginWaiting }) => {
  const onTypingDone = onFinishTyping(current, onBeginCountdown, onBeginWaiting)

  return (
    <div className="Current">
      {status === 'WAITING' && <Waiting />}
      {status !== 'WAITING' && <DiaryEntry entry={current} onTypingDone={onTypingDone} />}
    </div>
  )
}

const mapStateToProps = state => ({
  status: state.status,
  current: state.current,
})

const mapDispatchToProps = {
  onBeginCountdown: beginCountdown,
  onBeginWaiting: beginWaiting,
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaryController)
