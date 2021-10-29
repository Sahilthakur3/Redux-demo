import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,ScrollView,DeviceEventEmitter
} from 'react-native';
import {strings} from '../../../Utility';
import * as Progress from 'react-native-progress';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DefaultPreference from 'react-native-default-preference';




const UserEmail = ({navigation}) => {
  const [activate, setactivate] = useState(false);
  const [Email, setEmail] = useState('');

//Adding User
const AddUserEmail = ()  =>{
  const user = firebase.auth().currentUser;
  firestore()
    .collection('Users')
    .doc(user.uid)
    .update({
      Email: Email,
    })
    .then(() => {
      //DefaultPreference.set('LoggedStatus', 'yes').then(function () {
        DeviceEventEmitter.emit('UserLogin', { login: true });
      //});
    });
}
  return (
    <ScrollView style={styles.container}>
      <View style={{marginVertical: 35}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:20}}>
        <TouchableOpacity 
            onPress={()=>{
              navigation.goBack();
            }}
            style={{height: 35, width: 35, alignItems: 'center',justifyContent:"center"}}>
              <Image
              source={require('../../../assets/Images/Back.png')}
              style={{ width: 23, height: 23, }}
              resizeMode="stretch"
            />
            </TouchableOpacity>
            <Text style={{color: '#7A7A7A', fontSize: 14, marginVertical: 5}}>
            {strings.ProgressBarTitle}
          </Text>
        <TouchableOpacity 
             onPress={()=>navigation.navigate("Info")}
            style={{height: 35, width: 35, alignItems: 'center',justifyContent:"center"}}>
              <Image
              source={require('../../../assets/Images/infoicon.png')}
              style={{ width: 23, height: 23, }}
              resizeMode="stretch"
            />
            </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center',}}>
          
          <Progress.Bar
            progress={1}
            width={150}
            color={'#7A7A7A'}
            height={1}
            borderWidth={0.38}
          />
        </View>
      </View>
          <Text style={styles.text}>{strings.EmailText}</Text>
        <Text style={styles.title}>{strings.useremailTitle}</Text>

        <View style={{alignItems: 'center'}}>
          <View style={styles.inputView}>
            <TextInput
                  onChangeText={(text) => {
                    setactivate(text.length > 0);
                    setEmail(text)
                  }}
              style={styles.TextInput}
              autoFocus={true}
              placeholderTextColor="#7A7A7A"
              selectionColor={'#979797'}
              keyboardType={'email-address'}
              // value={Email}
              // onChangeText={text => setEmail(text)}
            />
          </View>
        </View>

        <View style={{alignItems: 'center', marginTop: 60, bottom: 30}}>
          <TouchableOpacity  style={{borderBottomColor: '#303C42', borderBottomWidth: 1}}>
            <Text style={{color: '#000000', fontSize: 15}}>{strings.Fillinlater}</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
              disabled={!activate}
              onPress={() => {
                AddUserEmail()
              }}
            style={{
              width: 320,
              height: 45,
              justifyContent: 'center',
              backgroundColor: activate ? "#303C42" : "#F2F2F2",
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: '#DCDCDC',
                fontWeight: 'bold',
                fontFamily: 'BarlowSemiCondensed-Regular',
                fontSize: 14,
                textAlign: 'center',
              }}>
         {strings.phoneInputButton}
            </Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  title: {
    color: '#303C42',
    textAlign: 'center',
    marginHorizontal: 40,
    fontFamily: 'BarlowSemiCondensed-Regular',
    fontSize: 28,paddingTop:30
  },
  inputView: {
    width: 320,
    height: 70,
    justifyContent: 'center',
    borderRadius: 6,
    fontWeight:'600',
    fontFamily:'BarlowSemiCondensed-Medium'
  },
  TextInput: {
    color: '#303C42',
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'BarlowSemiCondensed-ExtraLight',
    marginHorizontal: 95,bottom:20
  },
  button: {
    alignItems: 'center',
    width: 319,
    height: 58,
    backgroundColor: '#0F6EFF',
    justifyContent: 'center',
    borderRadius: 12,
  },
});
export default UserEmail;
