import GridOverlay from '@/components/GridOverlay';
import MapObjectSelectorModal from '@/components/MapObjectSelectorModal';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

interface Map {
  name: string;
  backgroundColor: string;
}

export interface MapObject {
  imageUri: string;
  x: number;
  y: number;
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
        key={id}
        source={{ uri: mapObject.imageUri }}
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
    <View style={[styles.mapContainer, { backgroundColor: map?.backgroundColor || 'white' }]}>
      <GridOverlay />

      {renderMapObjects()}

      <MapObjectSelectorModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        mapObjects={mapObjects}
        setMapObjects={setMapObjects}
      />

      <Pressable style={styles.floatingButton} onPress={() => setIsModalVisible(true)}>
        <Text style={{ fontSize: 30, color: 'white' }}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 50,
    bottom: 50,
    backgroundColor: '#F194FF',
    borderRadius: 30,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 4,
        shadowOpacity: 0.25,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      },
    }),
  },
});
