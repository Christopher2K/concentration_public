import { useCallback } from 'react'
import {
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  interpolate,
  runOnJS,
} from 'react-native-reanimated'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import styled from '@emotion/native'
import throttle from 'lodash/throttle'

import { Button } from './Button'

const SIZE = '30px'
const PADDING = '10px'
const THICKNESS = '4px'
const DURATION = 200

const Root = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const SliderRoot = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  height: ${SIZE};
  flex: 1;
  padding: 0 ${PADDING};
`

const Background = styled.Pressable`
  width: 100%;
  height: ${THICKNESS};
  border-radius: 999px;
  background-color: #f0f0f0;
`

const Filler = styled(Animated.View)`
  height: 100%;
  border-radius: 999px;
  background-color: #3483eb;
`

const Dot = styled(Animated.View)`
  position: absolute;
  top: 0;
  height: ${SIZE};
  width: ${SIZE};
  background-color: #fff;
  border-radius: 999px;
`
const dotShadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
}

type GestureHandlerContext = {
  startX?: number
}

type SliderProps = {
  initialValue: number
  min: number
  max: number
  onValueUpdated?: (value: number) => unknown
}

export const Slider = ({
  initialValue,
  max,
  min,
  onValueUpdated,
}: SliderProps) => {
  // Hooks
  const sliderSize = useSharedValue<number | null>(null)
  const duration = useSharedValue<number>(DURATION)
  const fillerSizeFactor = useSharedValue(
    interpolate(initialValue, [min, max], [0, 1]),
  )

  const fillerSizeFactorStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${fillerSizeFactor.value * 100}%`, {
        duration: duration.value,
      }),
    }
  }, [])

  const dotPositionStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(`${fillerSizeFactor.value * 100}%`, {
        duration: duration.value,
      }),
    }
  }, [])

  const throttledUpdatedValueCb = useCallback(
    throttle(
      (value: number) => {
        onValueUpdated?.(Math.ceil(interpolate(value, [0, 1], [min, max])))
      },
      60,
      {
        trailing: true,
      },
    ),
    [min, max, onValueUpdated],
  )

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureHandlerContext
  >({
    onStart: (_, ctx) => {
      if (sliderSize.value != null) {
        duration.value = 0
        ctx.startX = sliderSize.value * fillerSizeFactor.value
      }
    },
    onActive: ({ translationX }, ctx) => {
      if (sliderSize.value != null && ctx.startX != null) {
        const translation = ctx.startX + translationX

        if (translation <= 0) {
          fillerSizeFactor.value = 0
        } else if (translation >= sliderSize.value) {
          fillerSizeFactor.value = 1
        } else {
          fillerSizeFactor.value = translation / sliderSize.value
        }
        runOnJS(throttledUpdatedValueCb)(fillerSizeFactor.value)
      }
    },
    onEnd: () => (duration.value = DURATION),
  })

  // Callbacks
  const onSliderLayoutChanged = (event: LayoutChangeEvent) => {
    sliderSize.value = event.nativeEvent.layout.width
  }

  const onBarPressed = (event: GestureResponderEvent) => {
    if (sliderSize.value != null) {
      const newValue = event.nativeEvent.locationX / sliderSize.value
      fillerSizeFactor.value = newValue
      throttledUpdatedValueCb(newValue)
    }
  }

  const decrement = () => {
    const currentValue = Math.ceil(
      interpolate(fillerSizeFactor.value, [0, 1], [min, max]),
    )
    fillerSizeFactor.value = interpolate(currentValue - 1, [min, max], [0, 1])
    onValueUpdated?.(currentValue - 1)
  }

  const increment = () => {
    const currentValue = Math.ceil(
      interpolate(fillerSizeFactor.value, [0, 1], [min, max]),
    )
    fillerSizeFactor.value = interpolate(currentValue + 1, [min, max], [0, 1])
    onValueUpdated?.(currentValue + 1)
  }

  return (
    <Root>
      <Button label="-" onPress={decrement} />
      <SliderRoot>
        <Background
          onLayout={onSliderLayoutChanged}
          onPress={onBarPressed}
          hitSlop={{
            top: 10,
            bottom: 10,
          }}
        >
          <Filler style={fillerSizeFactorStyle} pointerEvents="none" />
        </Background>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Dot style={[dotShadowStyle, dotPositionStyle]} />
        </PanGestureHandler>
      </SliderRoot>
      <Button label="+" onPress={increment} />
    </Root>
  )
}
