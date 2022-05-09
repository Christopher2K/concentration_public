export enum SessionStep {
  focus = 'focus',
  shortBreak = 'short',
  longBreak = 'long',
}

export const getSessionStepName = (step: SessionStep) => {
  switch (step) {
    case SessionStep.focus:
      return 'Focus timer'
    case SessionStep.shortBreak:
      return 'Short break timer'
    case SessionStep.longBreak:
      return 'Long break timer'
  }
}
