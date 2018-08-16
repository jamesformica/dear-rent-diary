import random from 'lodash/random'

const emotion = () => null
const process = sentence => sentence

const sentences = [
  process`Today I woke up feeling ${emotion} just like every other day.`,
  process`I just met my landlord for the first time, he seems like a ${emotion} type of guy.`,
  process`Whenever I see my roommate's face, I feel ${emotion} inside.`,
  process`I feel ${emotion} when my roomates leave their dishes on the sink.`,
  process`I was ${emotion} when I found out I was gonna lose my bond.`,
  process`I was ${emotion} when I found out I was gonna get my bond back.`,
  process`When my best friend came over I was ${emotion} to see them again.`,
  process`I was ${emotion} when my dog took a shit on the carpet.`,
  process`I totally felt ${emotion} when our rent price got hiked 10%.`,
  process`I got ${emotion} when I saw the mould growing in the corner of the room.`,
  process`I was totally ${emotion} when my roommates ate my food in the fridge.`,
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
