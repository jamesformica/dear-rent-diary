import React, { Component } from 'react'
import { connect } from 'react-redux'

import DiaryEntry from './DiaryEntry'
import './PreviousEntries.css'

class PreviousEntries extends Component {
  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { previous } = this.props

    return (
      <div className="Previous">
        {previous.map(p => <DiaryEntry entry={p} key={p.dateTime} />)}
        <div ref={(el) => { this.el = el }} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  previous: state.previous,
})

export default connect(mapStateToProps)(PreviousEntries)
