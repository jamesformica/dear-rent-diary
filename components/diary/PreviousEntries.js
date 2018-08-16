import React, { Component, Fragment } from 'react'
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
        {previous.map(p => (
          <Fragment>
            <DiaryEntry entry={p} key={p.dateTime} />
            <div className="Previous__gallery">
              {p.images.map((image, i) => (
                <img className="Previous__image" src={image} key={i.toString()} alt="someones face" />
              ))}
            </div>
          </Fragment>
        ))}
        <div ref={(el) => { this.el = el }} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  previous: state.previous,
})

export default connect(mapStateToProps)(PreviousEntries)
