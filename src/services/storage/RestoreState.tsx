import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { restore as restoreSession } from '@app/state/sessionState'
import { restore as restoreTimer } from '@app/state/timerState'

import { read } from './storage'

export const RestoreState = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    async function restorePersistedState() {
      const [maybeSession, maybeTimer] = await Promise.all([
        read({
          key: 'session',
        }),
        read({
          key: 'timer',
        }),
      ])

      if (maybeSession) dispatch(restoreSession(maybeSession))
      if (maybeTimer) dispatch(restoreTimer(maybeTimer))
    }

    restorePersistedState()
  }, [])

  return null
}
