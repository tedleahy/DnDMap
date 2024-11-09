import GridOverlay from '@/components/GridOverlay';
import MapObjectSelectorModal from '@/components/MapObjectSelectorModal';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { config } from '@tamagui/config/v3';
import { createTamagui, TamaguiProvider } from 'tamagui';
import { MapObject } from '@/utils/types';

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

  useEffect(() => console.log(mapObjects), [mapObjects]);

  const renderMapObjects = () =>
    Object.entries(mapObjects).map(([id, mapObject]) => (
      <Image
        key={`map-${id}`}
        source={mapObject.imageReference}
        style={{
          width: 50,
          height: 50,
          position: 'absolute',
          left: mapObject.x,
          top: mapObject.y,
        }}
      />
    ));

  return (
    <TamaguiProvider config={tamaguiConfig}>
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
