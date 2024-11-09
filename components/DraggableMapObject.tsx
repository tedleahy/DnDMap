import { MapObject } from '@/utils/types';
import { Image } from 'expo-image';
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';

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
  const translateX = useSharedValue(mapObject.x);
  const translateY = useSharedValue(mapObject.y);

  const drag = Gesture.Pan()
    .onChange((event: GestUpdateEvent) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onFinalize(() => {
      runOnJS(onDragEnd)(id, translateX.value, translateY.value);
    });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        style={{ transform: [{ translateX: translateX }, { translateY: translateY }] }}
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
