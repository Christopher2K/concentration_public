import {
  render,
  fireEvent,
  act,
  waitFor,
  waitForElementToBeRemoved,
} from '@app/test'

import { TimerScreen } from '@app/screens/TimerScreen'

describe('Screen | <TimerScreen />', () => {
  it('should be in the startable state on mount', async () => {
    const { getByTestId } = render(<TimerScreen initialTimerDuration={10} />)
    const playButton = getByTestId('Timer.button.play')
    expect(playButton).toBeDefined()
  })

  it('should display pause and stop when pressing play', async () => {
    const { getByTestId, queryByTestId } = render(
      <TimerScreen initialTimerDuration={10} />,
    )
    const playButton = getByTestId('Timer.button.play')

    fireEvent.press(playButton)

    const pauseButton = queryByTestId('Timer.button.pause')
    const stopButton = queryByTestId('Timer.button.stop')

    expect(pauseButton).not.toBeNull()
    expect(stopButton).not.toBeNull()
  })

  it('it should display play when pressing stop', async () => {
    const { getByTestId, queryByTestId } = render(
      <TimerScreen initialTimerDuration={10} />,
    )

    fireEvent.press(getByTestId('Timer.button.play'))
    fireEvent.press(getByTestId('Timer.button.stop'))

    await waitFor(() => expect(queryByTestId('Timer.button.play')).toBeTruthy())
    await waitFor(() => expect(queryByTestId('Timer.button.stop')).toBeNull())
    await waitFor(() => expect(queryByTestId('Timer.button.pause')).toBeNull())
  })

  it('should display play and stop when pressing pause', async () => {
    const { getByTestId, queryByTestId } = render(
      <TimerScreen initialTimerDuration={10} />,
    )

    fireEvent.press(getByTestId('Timer.button.play'))
    expect(queryByTestId('Timer.button.play')).toBeNull()

    fireEvent.press(getByTestId('Timer.button.pause'))

    await waitFor(() => expect(queryByTestId('Timer.button.play')).toBeTruthy())
    await waitFor(() => expect(queryByTestId('Timer.button.stop')).toBeTruthy())
    await waitFor(() => expect(queryByTestId('Timer.button.pause')).toBeNull())
  })

  it('should render the duration the component in mounted with', () => {
    const { getByTestId } = render(<TimerScreen initialTimerDuration={10} />)

    const initialText = getByTestId('Timer.counterText').children[0]

    expect(initialText).toBe('00:00:10')
  })

  it('should restore the initial text when pressing stop', async () => {
    jest.useFakeTimers('legacy')

    const { getByTestId } = render(<TimerScreen initialTimerDuration={10} />)

    const initialText = getByTestId('Timer.counterText').children[0]
    fireEvent.press(getByTestId('Timer.button.play'))

    act(() => {
      jest.advanceTimersByTime(9000)
    })

    fireEvent.press(getByTestId('Timer.button.pause'))
    const updatedText = getByTestId('Timer.counterText').children[0]
    expect(initialText).not.toBe(updatedText)

    fireEvent.press(getByTestId('Timer.button.stop'))

    const restoredText = getByTestId('Timer.counterText').children[0]
    expect(initialText).toBe(restoredText)
  })
})
