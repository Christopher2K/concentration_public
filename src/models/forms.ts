export type TimerFormData = {
  focusTimer: number
  shortBreakTimer: number
  longBreakTimer: number
  rounds: number
}

export const defaultTimerFormData: TimerFormData = {
  focusTimer: 60,
  shortBreakTimer: 5,
  longBreakTimer: 15,
  rounds: 1,
}
