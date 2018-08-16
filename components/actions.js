export const beginWaiting = () => ({ type: 'BEGIN_WAITING' })

export const beginTyping = () => ({ type: 'BEGIN_TYPING' })

export const beginCountdown = () => ({ type: 'BEGIN_COUNTDOWN' })

export const beginProcessing = () => ({ type: 'BEGIN_PROCESSING' })

export const submitFiller = filler => ({ type: 'SUBMIT_FILLER', payload: filler })
