import React, { Fragment } from 'react'
import Typist from 'react-typist'
import moment from 'moment'

import './DiaryEntry.css'

const getKey = text => `${text}-${moment().format('X')}`

const getDateTime = text => (
  <span className="DiaryEntry__date" key={getKey(text)}>{text}</span>
)

const getBasicText = text => (
  <span className="Diary__text" key={getKey(text)}>{text}</span>
)

const getEmotionText = (text, emotion) => (
  <span className={`Diary__text-${emotion}`} key={getKey(text)}>{text}</span>
)

const getProcessed = (entry) => {
  if (entry.fillers.length === 0) return ''

  const texts = [
    getDateTime(entry.dateTime),
  ]

  for (let i = 0; i < entry.fillers.length; i += 1) {
    texts.push(getBasicText(entry.sentences[i]))

    if (i + 1 < entry.fillers.length) {
      const filler = entry.fillers[i]
      texts.push(getEmotionText(filler.filler, filler.emotion))
    }
  }

  return texts
}

const getNextSentence = (entry) => {
  const texts = []

  if (entry.fillers.length === 0) {
    texts.push(getDateTime(entry.dateTime))
  } else {
    const filler = entry.fillers[entry.fillers.length - 1]
    texts.push(getEmotionText(filler.filler, filler.emotion))
  }

  const key = entry.sentences[entry.fillers.length]
  texts.push(getBasicText(key))

  return { elements: texts, key }
}

const getCompletedSentence = (entry) => {
  const texts = [
    getDateTime(entry.dateTime),
  ]

  for (let i = 0; i < entry.sentences.length; i += 1) {
    texts.push(getBasicText(entry.sentences[i]))

    if (entry.fillers[i]) {
      const filler = entry.fillers[i]
      texts.push(getEmotionText(filler.filler, filler.emotion))
    }
  }

  return texts
}

const DiaryEntry = ({ entry, onTypingDone }) => {
  const completed = !onTypingDone
  const next = getNextSentence(entry)

  return (
    <div className={`DiaryEntry${completed ? '-completed' : ''}`}>
      {completed && getCompletedSentence(entry)}

      {!completed && (
        <Fragment>
          {getProcessed(entry)}

          <Typist key={next.key} onTypingDone={onTypingDone}>
            {next.elements}
          </Typist>
        </Fragment>
      )}
    </div>
  )
}

export default DiaryEntry
