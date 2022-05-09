import { type PropsWithChildren } from 'react'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from '@emotion/react'

import { theme } from '@app/style/theme'

const AppProviders = ({ children }: PropsWithChildren<{}>) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

const customRender: typeof render = (ui, options) =>
  render(ui, { wrapper: AppProviders, ...options })

export * from '@testing-library/react-native'
export { customRender as render }
