declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare module '@react-native-async-storage/async-storage/jest/async-storage-mock'

declare module 'react-devtools-core' {
  export function connectToDevTools(options: {
    host: string
    port: number
  }): void
}

declare module 'rn-flipper-async-storage-advanced' {
  export default () => null
}
