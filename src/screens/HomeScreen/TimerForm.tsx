import styled from '@emotion/native'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import { Slider, Button, Typography, ButtonGroup } from '@app/components'
import { type TimerFormData, defaultTimerFormData } from '@app/models'
import type { AppState } from '@app/state/store'
import { configureSession } from '@app/state/sessionState'

const Root = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`

const Field = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

type TimerFormProps = {
  onTimerSaved?: () => unknown
}

export const TimerForm = ({ onTimerSaved }: TimerFormProps) => {
  const dispatch = useDispatch()
  const initialData = useSelector(
    ({ session }: AppState) => session.configuration,
  )

  const { control, handleSubmit } = useForm<TimerFormData>({
    defaultValues: initialData,
  })

  const saveTimer = (data: TimerFormData) => {
    dispatch(configureSession(data))
    onTimerSaved?.()
  }

  return (
    <Root>
      <Field>
        <Typography>Focus timer</Typography>
        <Controller
          control={control}
          name="focusTimer"
          render={({ field: { onChange, value } }) => (
            <>
              <Typography>{value}</Typography>
              <Slider
                initialValue={defaultTimerFormData.focusTimer}
                min={10}
                max={60}
                onValueUpdated={onChange}
              />
            </>
          )}
        />
      </Field>
      <Field>
        <Typography>Short break timer</Typography>
        <Controller
          control={control}
          name="shortBreakTimer"
          render={({ field: { onChange, value } }) => (
            <>
              <Typography>{value}</Typography>
              <Slider
                initialValue={defaultTimerFormData.shortBreakTimer}
                min={0}
                max={60}
                onValueUpdated={onChange}
              />
            </>
          )}
        />
      </Field>
      <Field>
        <Typography>Long break timer</Typography>
        <Controller
          control={control}
          name="longBreakTimer"
          render={({ field: { onChange, value } }) => (
            <>
              <Typography>{value}</Typography>
              <Slider
                initialValue={defaultTimerFormData.longBreakTimer}
                min={0}
                max={60}
                onValueUpdated={onChange}
              />
            </>
          )}
        />
      </Field>
      <Field>
        <Typography>Rounds</Typography>
        <Controller
          control={control}
          name="rounds"
          render={({ field: { onChange, value } }) => (
            <ButtonGroup<number>
              choices={[1, 2, 3, 4, 5]}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Field>
      <Button label="Save" onPress={handleSubmit(saveTimer)} />
    </Root>
  )
}
