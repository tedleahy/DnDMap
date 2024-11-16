import { MapObject } from '@/utils/types';
import { useEffect } from 'react';
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

type Props = {
  id: string;
  mapObject: MapObject;
  onDragEnd: (id: string, x: number, y: number) => void;
};

// type alias to avoid clogging up the main code with this big fat type
type GestUpdateEvent = GestureUpdateEvent<
  PanGestureHandlerEventPayload & PanGestureChangeEventPayload
>;

export default function DraggableMapObject({ id, mapObject, onDragEnd }: Props) {
  const isDragging = useSharedValue(false);
  const translation = useSharedValue({ x: 0, y: 0 });

  useEffect(() => {
    translation.value = { x: 0, y: 0 };
  }, [mapObject.x, mapObject.y]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translation.value.x },
      { translateY: translation.value.y },
    ],
    zIndex: isDragging.value ? 1 : 0,
  }));

  const drag = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
    })
    .onChange((event: GestUpdateEvent) => {
      translation.value = {
        x: translation.value.x + event.changeX,
        y: translation.value.y + event.changeY,
      };
    })
    .onFinalize(() => {
      isDragging.value = false;
      const finalX = mapObject.x + translation.value.x;
      const finalY = mapObject.y + translation.value.y;
      runOnJS(onDragEnd)(id, finalX, finalY);
    });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: mapObject.x,
            top: mapObject.y,
          },
          animatedStyles,
        ]}
      >
        <Animated.Image
          key={`map-${id}`}
          source={mapObject.imageReference}
          resizeMode="contain"
          style={{
            width: 50,
            height: 50,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
}
