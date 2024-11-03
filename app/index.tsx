import GridOverlay from '@/components/GridOverlay';
import { useState } from 'react';
import { Text, View } from 'react-native';

interface Map {
  name: string;
  backgroundColor: string;
}

export default function Index() {
  const [map, setMap] = useState<Map | null>({
    name: 'Test Map',
    backgroundColor: '#94ad6c',
  });

  return (
    <View
      style={{ backgroundColor: map?.backgroundColor || 'white', width: '100%', height: '100%' }}
    >
      <GridOverlay />
    </View>
  );
}
