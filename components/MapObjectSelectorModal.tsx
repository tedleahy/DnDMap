import { MapObject } from '@/utils/types';
import { tileImages } from '@/utils/tileImages';
import { Pressable, Image } from 'react-native';
import uuid from 'react-native-uuid';
import { useState } from 'react';
import { X, Plus } from '@tamagui/lucide-icons';
import { Adapt, Button, Dialog, Sheet, Unspaced, XStack } from 'tamagui';

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mapObjects: Record<string, MapObject>;
  setMapObjects: React.Dispatch<React.SetStateAction<Record<string, MapObject>>>;
};

export default function MapObjectSelectorModal({
  isModalVisible,
  setIsModalVisible,
  mapObjects,
  setMapObjects,
}: Props) {
  const [x, setX] = useState(0);
  const handleSelectMapObject = (id: string, mapObject: MapObject) => {
    setX(x + 50);
    setMapObjects({ ...mapObjects, [id]: mapObject });
  };

  return (
    <Dialog modal open={isModalVisible} onOpenChange={() => setIsModalVisible(!isModalVisible)}>
      <Dialog.Trigger asChild>
        <Button
          position="absolute"
          bottom="$8"
          right="$8"
          backgroundColor={'#F194FF'}
          color={'white'}
          circular
          size={50}
          icon={Plus}
        />
      </Dialog.Trigger>

      <Adapt when="md" platform="touch">
        <Sheet
          animation="medium"
          zIndex={200000}
          modal
          dismissOnSnapToBottom
          portalProps={{ style: { width: '70%' } }}
        >
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            width="50%"
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: 0, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
          width="70%"
        >
          <Dialog.Title>Select Map Objects</Dialog.Title>

          <XStack gap="$2" flexWrap="wrap">
            {tileImages.map((tileImage) => {
              const id = uuid.v4().toString();
              const mapObject = {
                imageReference: tileImage,
                x: x,
                y: 0,
              };
              return (
                <Pressable
                  key={`selector-${id}`}
                  onPress={() => handleSelectMapObject(id, mapObject)}
                >
                  <Image
                    source={tileImage}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </Pressable>
              );
            })}
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
