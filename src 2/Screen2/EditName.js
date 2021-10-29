import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput, ScrollView
} from 'react-native';
import { strings } from '../../Utility';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



const EditName = ({ navigation }) => {
  const [activate, setactivate] = useState(true);
  const [name, setname] = useState("")

  useEffect(() => {
    getdata()
  }, []);


  function getdata() {
    const user = firebase.auth().currentUser;
    firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setname(documentSnapshot.data().Name)
        }
      })
  }
  //Adding User
  function AddUserName() {
    const user = firebase.auth().currentUser;
    firestore()
      .collection('Users')
      .doc(user.uid)
      .update({
        Name: name,
      })
      .then(() => {
        navigation.goBack();
      });
  }

  return (
    <ScrollView style={styles.container}>

      <View style={{ marginVertical: 40 }}>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
            <Image
              source={require('../../assets/Images/Back.png')}
              style={{ width: 23, height: 23, }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <Text style={{ color: '#7A7A7A', fontSize: 14, marginHorizontal: 110 }}>
            {strings.ChangeNameEditName}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={styles.text}>{strings.ChangeNameEditNameText}</Text>
      </View>
      <Text style={styles.title}>{strings.usernameTitle}</Text>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.inputView}>
          <TextInput
            onChangeText={(text) => {
              setactivate(text.length > 0)
              setname(text)
            }}
            value={name}
            style={styles.TextInput}
            autoFocus={true}
            selectionColor={'#979797'}
          />
        </View>
      </View>
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <TouchableOpacity
          disabled={!activate}
          onPress={() => {
            AddUserName()
          }}
          style={{
            width: 320,
            height: 45,
            justifyContent: 'center',
            justifyContent: "center",
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
            {strings.Save}
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
    marginHorizontal: 60,
    fontFamily: 'BarlowSemiCondensed-Regular',
    fontSize: 30, paddingTop: 50
  },
  text: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'BarlowSemiCondensed-ExtraLight',
    marginHorizontal: 30,
  },
  BoldText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'BarlowSemiCondensed-ExtraLight',
  },
  inputView: {
    width: 320,
    height: 70,
    justifyContent: 'center',
    borderRadius: 6,
    fontWeight: '600',
    marginHorizontal: 60,
    fontFamily: 'BarlowSemiCondensed-Medium',
  },
  TextInput: {
    color: '#303C42',
    fontSize: 20,
    textAlign: 'center',
  },
});
export default EditName;
