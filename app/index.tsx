import GridOverlay from '@/components/GridOverlay';
import MapObjectSelectorModal from '@/components/MapObjectSelectorModal';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Map {
  name: string;
  backgroundColor: string;
}

export default function Index() {
  const [map, setMap] = useState<Map | null>({
    name: 'Test Map',
    backgroundColor: '#94ad6c',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={[styles.mapContainer, { backgroundColor: map?.backgroundColor || 'white' }]}>
      <GridOverlay />

      <MapObjectSelectorModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
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
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
