import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from '@emotion/native'

import { Button, Typography } from '@app/components'
import { type AppState } from '@app/state/appState'
import {
  pauseTimer,
  startTimer,
  stopTimer,
  resetCurrentTimer,
} from '@app/state/timerState'
import { resetSession } from '@app/state/sessionState'
import { getSessionStepName, TimerStatus } from '@app/models'
import { formatSeconds } from '@app/utils'

const Root = styled.SafeAreaView`
  ${({ theme }) => css`
    width: 100%;
    margin: 0 ${theme.spacing.m.toString()}px;
    flex: 1;
  `}
`

const TimerTopControlsWrapper = styled.View`
  height: 60px;
`

const TimerStateWrapper = styled.View`
  flex: 3;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`

const TimerControlWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-width: 1px;
  flex: 1;
`

export const TimerDashoard = () => {
  const dispatch = useDispatch()
  const currentTimerType = useSelector(
    ({ session }: AppState) => session.currentStep,
  )
  const timeLeft = useSelector(({ timer }: AppState) => timer.timeLeft)
  const status = useSelector(({ timer }: AppState) => timer.status)
  const timerIsResetable = useSelector(
    ({ timer }: AppState) =>
      (timer.timeLeft ?? 0) > 0 && timer.timeLeft !== timer.initialDuration,
  )

  const sessionIsDone = useSelector(({ session, timer }: AppState) => {
    const { currentRound, configuration, currentStep } = session
    const isLastRound = currentRound === configuration.rounds
    const isLastTimer = currentStep === undefined
    const isLastTimerCompleted = timer.status === TimerStatus.Completed

    return isLastRound && isLastTimer && isLastTimerCompleted
  })

  const showStart = !sessionIsDone && status != TimerStatus.Running
  const showStop =
    !sessionIsDone &&
    [TimerStatus.Running, TimerStatus.Paused, TimerStatus.Stopped].includes(
      status,
    )
  const showPause = !sessionIsDone && [TimerStatus.Running].includes(status)

  return (
    <Root>
      <TimerTopControlsWrapper>
        {timerIsResetable && (
          <Button
            label="Reset current timer"
            onPress={() => dispatch(resetCurrentTimer())}
          />
        )}
      </TimerTopControlsWrapper>
      <TimerStateWrapper>
        {!sessionIsDone && currentTimerType != undefined && (
          <>
            <Typography>{getSessionStepName(currentTimerType)}</Typography>
            {timeLeft != null && (
              <Typography>{formatSeconds(timeLeft)}</Typography>
            )}
          </>
        )}
        {sessionIsDone && (
          <Typography>
            Congratulations! Your pomodoro session is completed.
          </Typography>
        )}
      </TimerStateWrapper>
      <TimerControlWrapper>
        {sessionIsDone && (
          <Button
            label="End session"
            onPress={() => {
              dispatch(stopTimer())
              dispatch(resetSession())
            }}
          />
        )}
        {showStart && (
          <Button label="Start" onPress={() => dispatch(startTimer())} />
        )}
        {showPause && (
          <Button label="Pause" onPress={() => dispatch(pauseTimer())} />
        )}
        {showStop && (
          <Button
            label="Stop"
            onPress={() => {
              dispatch(stopTimer())
              dispatch(resetSession())
            }}
          />
        )}
      </TimerControlWrapper>
    </Root>
  )
}
