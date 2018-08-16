import random from 'lodash/random'

const emotion = () => null
const process = sentence => sentence

const sentences = [
  process`Today I woke up feeling ${emotion} just like every other day.`,
  process`I just met my landlord for the first time, he seems like a ${emotion} type of guy.`,
  process`Whenever I see my landlords face, I feel ${emotion} inside.`,
  process`My roomates left their dishes on the sink again, they make me feel ${emotion}.`,
  process`I just found out I'm gonna lose my bond, now I am ${emotion}.`,
  process`I just found out I'm gonna get my bond back, which makes me feel ${emotion}.`,
  process`When my best friend came over I was ${emotion} to see them again.`,
  process`My stupid dog took a poop on the carpet which made me feel ${emotion}.`,
  process`Our rent price got hiked 10%, now I feel ${emotion} which is just what I needed.`,
  process`I saw mould growing in the corner of the room, which is just great, now I am ${emotion}.`,
  process`Just perfect! One of my roommates ate my food in the fridge, and now I'm ${emotion}.`,
  process`Well, my rental application just got rejected which has made me feel ${emotion}.`,
  process`They wont allow Mr Snuggles as a pet! I'm ${emotion} and so is Mr Snuggles.`,
  process`I keep getting locked into long contracts which makes me feel ${emotion}.`,
  process`The Jones' upstairs won't shut up! I feel ${emotion} that I don't have as much fun as them.`,
  process`There's an odd smell coming from the bathroom which makes me feel ${emotion}.`,
  process`My roommate forgot to pay the power bill so I'm ${emotion} and sitting in the dark.`,
  process`Wooo my rental application got accepted!!! I am ${emotion} right now.`,
  process`Current mood: ${emotion}, thanks to the water not working anymore.`,
]

export const getParagraph = () => {
  const pool = [...sentences]
  const numberOfSentences = random(3, 4)
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
