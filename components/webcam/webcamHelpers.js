import reduce from 'lodash/reduce'
import maxBy from 'lodash/maxBy'
import sample from 'lodash/sample'

import * as emotionFillers from '../fillers'

const API_ENDPOINT = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion'

export const makeBlob = (dataURL) => {
  const BASE64_MARKER = ';base64,'
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    const parts = dataURL.split(',')
    const contentType = parts[0].split(':')[1]
    const raw = decodeURIComponent(parts[1])
    return new global.Blob([raw], { type: contentType })
  }
  const parts = dataURL.split(BASE64_MARKER)
  const contentType = parts[0].split(':')[1]
  const raw = global.window.atob(parts[1])
  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new global.Blob([uInt8Array], { type: contentType })
}

const getHighestEmotion = (emotions) => {
  const scores = reduce(emotions, (result, value, key) => {
    result.push({ emotion: key, score: value })
    return result
  }, [])

  return maxBy(scores, 'score')
}

const getFiller = (emotion) => {
  return sample(emotionFillers[emotion.emotion])
}

const getAdjective = (emotion) => {
  if (emotion.score < 0.5) return ''
  return sample(emotionFillers.adjectives)
}

export const analyse = (imageSrc, onSubmitFiller) => {
  global.fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': '1f64020895e54cf781fd2ea0af205500',
    },
    body: makeBlob(imageSrc),
  }).then(response => (
    response.json()
  )).then((response) => {
    const emotions = response[0].faceAttributes.emotion
    const highestEmotion = getHighestEmotion(emotions)
    const filler = getFiller(highestEmotion)
    const adjective = getAdjective(highestEmotion)

    const finalFiller = `${adjective ? `${adjective} ` : ''}${filler}`
    onSubmitFiller({ ...highestEmotion, filler: finalFiller })
  })
}
