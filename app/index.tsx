import GridOverlay from '@/components/GridOverlay';
import MapObjectSelectorModal from '@/components/MapObjectSelectorModal';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { config } from '@tamagui/config/v3';
import { createTamagui, TamaguiProvider } from 'tamagui';
import { MapObject } from '@/utils/types';
import DraggableMapObject from '@/components/DraggableMapObject';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const tamaguiConfig = createTamagui(config);

interface Map {
  name: string;
  backgroundColor: string;
}

export default function Index() {
  const [map, setMap] = useState<Map | null>({
    name: 'Test Map',
    backgroundColor: '#94ad6c',
  });
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [mapObjects, setMapObjects] = useState<Record<string, MapObject>>({});

  const handleMapObjectDragEnd = useCallback((id: string, x: number, y: number) => {
    setMapObjects((mapObjects) => ({
      ...mapObjects,
      [id]: { ...mapObjects[id], x, y },
    }));
  }, []);

  const renderMapObjects = () =>
    Object.entries(mapObjects).map(([id, mapObject]) => (
      <DraggableMapObject
        key={id}
        id={id}
        mapObject={mapObject}
        onDragEnd={handleMapObjectDragEnd}
      />
    ));

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <GestureHandlerRootView>
        <View style={[styles.mapContainer, { backgroundColor: map?.backgroundColor || 'white' }]}>
          <GridOverlay />

          {renderMapObjects()}

          <MapObjectSelectorModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            mapObjects={mapObjects}
            setMapObjects={setMapObjects}
          />
        </View>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
