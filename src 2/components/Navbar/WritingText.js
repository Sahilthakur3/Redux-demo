import React, { useState, useEffect } from 'react';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import { strings } from '../../../Utility';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useIsFocused } from '@react-navigation/native';


const WritingText = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const [Texts, setText] = useState("")
  const [edit, setedit] = useState('');


  useEffect(() => {
    if (isFocused) {
      setedit(route.params.edit)
      setText(route.params.data.GreetingText)
      console.log("fhjf")
    }
  }, [isFocused]);

  function AddGreetingText() {
    let obj = route.params.data
    obj.GreetingText = Texts
    edit ? navigation.navigate('UserCards3', { data: obj,add:route.params.add }) : navigation.navigate('AddMoneyScreen', { data: obj, edit: false,BackGroundIndex: route.params.BackGroundIndex })

  }
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20, paddingTop: 40
        }}>
        {!edit ? <TouchableOpacity
          onPress={() => {
            navigation.navigate("VideoScreen");
          }}
          style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
          <Image
            source={require('../../../assets/Images/Back.png')}
            style={{ width: 23, height: 23, }}
            resizeMode="stretch"
          />
        </TouchableOpacity> : null}
        <Text style={{
          color: '#7A7A7A',
          fontSize: 14,
          marginLeft: edit ? RFValue(120) : 1

        }}>
          {strings.WritingScreenTitleTop}
        </Text>
        <TouchableOpacity
           onPress={()=>navigation.navigate("Info")}
          style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
          <Image
            source={require('../../../assets/Images/infoicon.png')}
            style={{ width: 23, height: 23, }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: 'center', paddingTop: 10, fontSize: 14, color: '#000000' }}>{strings.WritingScreenText}</Text>
      <View style={{
        alignSelf: 'center',
        paddingTop: 20,
        width: 320,
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        height: 230,
        marginTop: 10
      }}>
        <TextInput
          value={Texts}
          onChangeText={(text) => setText(text)}
          placeholder="Type here ..."
          placeholderTextColor="grey"
          style={{
            width: 300,
            //height: 230,
            // backgroundColor: '#F2F2F2',
            borderRadius: 20,
            marginLeft: 10


          }}
          selectionColor={'#979797'}
          multiline={true}
          marginHorizontal={80}

        />
      </View>
      <View style={{ alignItems: 'center', marginVertical: 15 }}>
        <TouchableOpacity
          disabled={!Texts}
          onPress={() => AddGreetingText()}
          style={{
            width: 321, height: 40,
            backgroundColor: Texts ? "#303C42" : "#F2F2F2",
            borderRadius: 20, justifyContent: 'center'
          }}
        >
          <Text style={{ textAlign: 'center', color: '#DCDCDC', fontWeight: '500', fontSize: 20 }}>

            {edit ? strings.update : strings.Save}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default WritingText;
