import { FontAwesome } from '@expo/vector-icons';
import { MapObject } from '@/app';
import { tileImages } from '@/utils/tileImages';
import {
  View,
  Text,
  Pressable,
  FlatList,
  Modal,
  StyleSheet,
  Image,
  ImageURISource,
  Platform,
} from 'react-native';
import uuid from 'react-native-uuid';
import { useState } from 'react';

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
  const handleSelectMapObject = (mapObjectImg: ImageURISource) => {
    const mapObject = {
      imageUri: mapObjectImg.uri || '',
      x: x,
      y: 0,
    };
    setX(x + 50);
    setMapObjects({ ...mapObjects, [uuid.v4().toString()]: mapObject });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
      }}
      statusBarTranslucent={true}
    >
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <Pressable style={styles.closeButton} onPress={() => setIsModalVisible(!isModalVisible)}>
            <FontAwesome name="close" size={24} color="black" />
          </Pressable>
          <Text style={styles.modalTitle}>Select Map Object</Text>
        </View>
        <FlatList
          data={tileImages}
          keyExtractor={(_, index) => index.toString()}
          numColumns={10}
          renderItem={({ item }: { item: ImageURISource }) => (
            <Pressable onPress={() => handleSelectMapObject(item)}>
              <Image
                source={item}
                style={{ width: 50, height: 50, margin: 5 }}
                resizeMode="contain"
              />
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 'auto',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      },
    }),
  },

  modalHeader: {
    width: '100%',
    position: 'relative',
  },

  modalTitle: {
    flex: 1,
    fontSize: 24,
    marginTop: 15,
    marginBottom: 30,
    textAlign: 'center',
  },

  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
