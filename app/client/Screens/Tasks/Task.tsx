import React, {useState} from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, SafeAreaView, Pressable, Button } from 'react-native';
import { FAB } from 'react-native-paper';
import Modal from 'react-native-modal';


const Task = () => {
  const bgImage = require('../../../assets/blue-gradient.png');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
    <View style={styles.container}>
      <Text style={styles.header} >Tasks</Text>
      <View>
      <FAB
    style={styles.fab}
    small
    color='blue'
    icon="plus"
    onPress={toggleModal}
    />
     <Modal isVisible={isModalVisible}>
          <View style={{flex: 1}}>
            <Text>Hello!</Text>

            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </Modal>
      </View>
      <View style={styles.textAreaContainer} >
        <View style={styles.textArea}>

        </View>
      {/* </View>
      <View style={styles.textAreaContainer}>
      <View style={styles.textArea}>

      </View>
      </View>
      <View style={styles.textAreaContainer}>
        <View style={styles.textArea}>

        </View> */}
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
  },
  textAreaContainer: {
    backgroundColor: '#FAFAFA',
    borderColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
    opacity: 0.2
  },
  textArea: {
    height: 200,
    width: 100,
    justifyContent: 'flex-start'
  },
  header: {
    textAlign: 'center',
    color: '#9ee7ff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Task;