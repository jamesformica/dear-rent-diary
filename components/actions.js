export const beginWaiting = () => ({ type: 'BEGIN_WAITING' })

export const beginTyping = () => ({ type: 'BEGIN_TYPING' })

export const beginCountdown = () => ({ type: 'BEGIN_COUNTDOWN' })

export const beginProcessing = image => ({ type: 'BEGIN_PROCESSING', payload: image })

export const submitFiller = filler => ({ type: 'SUBMIT_FILLER', payload: filler })
