const usersRejectErrors = ['User rejected', 'User denied']

export const getExpectedError = (message) => {
  const isUserDeniedErrors = usersRejectErrors.find(expectedError =>
    message.includes(expectedError)
  )

  if (isUserDeniedErrors) {
    return 'You declined an action in your wallet'
  }

  return message
}

export const errorParser = (message) => {
  try {
    const [, errorParsedText] = message.match(/message":"(.+)"/)

    if (!errorParsedText) {
      return getExpectedError(message)
    }
    return errorParsedText
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Error parser error: ', err.message)
    return getExpectedError(message)
  }
}
