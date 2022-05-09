import { AppState, initialAppState } from '@app/state/appState'

export type Schema = Pick<AppState, 'session' | 'timer'> & {}

export type SchemaKey = keyof Schema

export const initialData: Schema = {
  session: initialAppState.session,
  timer: initialAppState.timer,
}
