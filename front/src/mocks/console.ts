type LogFunction = (message?: any, ...optionalParams: any[]) => void

// Hide uncontrolled errors
const originalConsoleError = console.error.bind(console.error)
const newConsoleError: LogFunction = (message, ...params) => {
  const hiddenErrors: RegExp[] = [
    /^Error: Could not parse CSS stylesheet/, // Actual version of jsdom cant parse some generated css by styled-components
  ]

  if (hiddenErrors.some((error) => error.test(message))) {
    return
  }

  originalConsoleError(message, ...params)
}

export function mockConsoleError() {
  console.error = newConsoleError
}

export function unmockConsoleError() {
  console.error = originalConsoleError
}
