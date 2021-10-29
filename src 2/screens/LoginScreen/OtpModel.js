import React, {useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { strings } from '../../../Utility';

const OtpModel = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1, marginTop: 50}}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={isModalVisible}
      backdropColor={"#7A7A7A"}
      >
        <View style={{flex: 1, marginTop: 100, alignItems: 'center'}}>
          <View
            style={{
              width: '95%',
              height: '30%',
              borderRadius: 20,
              backgroundColor: '#FAFAFA',
            }}>
                <View style={{alignItems:'center',marginVertical:20}}>
                    <Text style={{color:'#000000',fontSize:14}}>{strings.OtpModelText}</Text>
                    <Text style={{color:'#000000',fontSize:20,marginTop:4,letterSpacing:3}}>+45 31 18 00 19</Text>
                    <Text style={{color:'#000000',fontSize:14,marginTop:4}}>{strings.OtpModelText2}</Text>
                    <Text style={{color:'#AAAAAA',fontSize:20,marginTop:20}}>{strings.OtpModelText3}</Text>
                </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <View>
                <TouchableOpacity
                  style={{
                    width: 140,
                    height: 40,
                    backgroundColor: '#F2F2F2',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{color: '#303C42', fontWeight: '500', fontSize: 20}}>
                   {strings.OtpModelButton}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    width: 140,
                    height: 40,
                    backgroundColor: '#303C42',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{color: '#F5F5F5', fontWeight: '500', fontSize: 20}}>
                 {strings.OtpModelButton2}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};
export default OtpModel;
