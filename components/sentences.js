import random from 'lodash/random'


const emotion = () => null
const process = sentence => sentence

const sentences = [
  process`Today I woke up feeling ${emotion}.`,
  process`I just met my landlord for the first time, he seems like a ${emotion} type of guy.`,
  process`Whenever I see my roommate's face, I feel so ${emotion} inside.`,
]

export const getParagraph = () => {
  const pool = [...sentences]
  const numberOfSentences = random(2, 3)
  const result = []

  for (let i = 0; i < numberOfSentences; i += 1) {
    const randomIndex = random(pool.length - 1)
    const sentence = [...pool.splice(randomIndex, 1)[0]]

    if (result.length > 0) {
      // concat the first chunk to the end of the last one
      const last = result[result.length - 1]
      result[result.length - 1] = `${last} ${sentence.splice(0, 1)[0]}`
    }

    for (let j = 0; j < sentence.length; j += 1) {
      // add the rest as individual chunks
      result.push(sentence[j])
    }
  }

  return result
}

export default sentences
