import React, { Fragment } from 'react'
import Typist from 'react-typist'
import moment from 'moment'

import './DiaryEntry.css'

const getKey = text => `${text}-${moment().format('X')}`

const processText = (text) => {
  const fullStop = text.indexOf('.')
  if (fullStop >= 0) {
    return (
      <span>
        {text.substr(0, fullStop + 1)}
        <Typist.Delay ms={1500} />
        {text.substr(fullStop + 1)}
      </span>
    )
  }
  return text
}

const getDateTime = text => (
  <span className="DiaryEntry__date" key={getKey(text)}>{text}<br /></span>
)

const getIntroText = () => (
  <span className="Diary__text" key={getKey('dear')}>Dear diary, </span>
)

const getBasicText = text => (
  <span className="Diary__text" key={getKey(text)}>{processText(text)}</span>
)

const getEmotionText = (text, emotion) => (
  <span className={`Diary__text-${emotion}`} key={getKey(text)}>{text}</span>
)

const getProcessed = (entry) => {
  if (entry.fillers.length === 0) return ''

  const texts = [
    getDateTime(entry.dateTime),
    getIntroText(),
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
    texts.push(getIntroText())
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
    getIntroText(),
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

          <Typist
            key={next.key}
            className="DiaryEntry__typist"
            avgTypingDelay={80}
            onTypingDone={onTypingDone}
          >
            {next.elements}
          </Typist>
        </Fragment>
      )}
    </div>
  )
}

export default DiaryEntry
