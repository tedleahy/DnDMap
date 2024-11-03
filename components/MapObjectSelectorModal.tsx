import { tileImages } from '@/utils/tileImages';
import { View, Text, Pressable, FlatList, Modal, StyleSheet, Image } from 'react-native';

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MapObjectSelectorModal({ isModalVisible, setIsModalVisible }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        alert('Modal has been closed.');
        setIsModalVisible(!isModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Map Objects</Text>
          <Pressable style={styles.button} onPress={() => setIsModalVisible(!isModalVisible)}>
            x
          </Pressable>

          <FlatList
            data={tileImages}
            renderItem={({ item }) => (
              <Image
                source={item}
                style={{ width: 50, height: 50, margin: 5 }}
                resizeMode="contain"
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            numColumns={10}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  modalTitle: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
});
