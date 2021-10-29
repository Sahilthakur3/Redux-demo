import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modalbox';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class LoaderModel extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount = async () => {
    console.log('loader modal ####');
    this.refs.modalLoader.open();
  };

  render() {
    return (
      <Modal
        ref={'modalLoader'}
        position={'center'}
        transparent={true}
        style={styles.modalStyle}
        animationType={'none'}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <View style={styles.container2}>
          <ActivityIndicator
            animating={this.state.loading}
            size="large"
            color={"white"}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 80,
            }}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalStyle: {
    height: height / 4.5,
    width: width / 2,
    position: 'absolute',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});