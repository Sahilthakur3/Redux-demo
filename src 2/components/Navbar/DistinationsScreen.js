import React, { useState, useEffect } from "react";
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DefaultPreference from 'react-native-default-preference';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput, ScrollView, LogBox
} from 'react-native';
import { strings } from '../../../Utility';
import * as Progress from 'react-native-progress';
import { RFValue } from "react-native-responsive-fontsize";




const DistinationsScreen = ({ navigation, route }) => {

  const isFocused = useIsFocused();
  const [ToName, setToName] = useState("");

  const [state, setState] = useState();
  const [FromName, setFromName] = useState("")
  const [edit, setedit] = useState('');



  useEffect(() => {

    LogBox.ignoreLogs(['Warning: ...']);
    if (isFocused) {
      if (route.params.edit == true) {
        setedit(true)
        setToName(route.params.data.To)
        setFromName(route.params.data.From)
      }
      else {
        DefaultPreference.get('name').then(function (value) {
          console.log(value)
          value == setFromName(value)
        });
      }
    }
  }, [isFocused]);



  function AddTofrom() {
    let obj = route.params.data
    function object() {

      obj.To = ToName
      obj.From = FromName
    }
    { edit ? object() : null }
    edit ? navigation.navigate('UserCards3', { data: obj,add:route.params.add }) : navigation.navigate("VideoScreen", { data: { To: ToName, From: FromName ,BackGroundIndex: route.params.BackGroundIndex} })

  }
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginVertical: 40, }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          {!edit ? <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }} style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
            <Image
              source={require('../../../assets/Images/Back.png')}
              style={{ width: 23, height: 23, }}
              resizeMode="contain"
            />
          </TouchableOpacity> : null}
          <Text style={{ color: '#7A7A7A', fontSize: 14, marginLeft: edit ? RFValue(130) : 1 }}>
            {strings.ToFrom}
          </Text>
          <TouchableOpacity 
          onPress={()=>navigation.navigate("Info")}
          style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
            <Image
              source={require('../../../assets/Images/infoicon.png')}
              style={{ width: 23, height: 23 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', }}>
          <Progress.Bar
            progress={0.25}
            width={150}
            color={'#7A7A7A'}
            height={1}
            borderWidth={0.18}
          />
        </View>
      </View>
      <View
        style={{
          bottom: 20,
          marginHorizontal: 40,
          alignItems: 'center',
        }}>
        <Text style={styles.text}>{strings.DestinationToptext}</Text>
      </View>
      <Text style={styles.titleTo}>{strings.DestinationTitle}</Text>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.inputView}>
          <TextInput
            value={ToName}
            onChangeText={(text) => {
              setToName(text);
            }}
            // onChangeText={(text)=>setToName1(text.length > 0)}
            style={styles.TextInput}
            placeholderTextColor="#7A7A7A"
            autoFocus={true}
            selectionColor={'#979797'}
          />
          {/* <Text style={{color:{color1}}}>{aa(),text}</Text> */}
        </View>
        <Text style={styles.title}>{strings.DestinationTitle2}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <View style={{ marginLeft: 25 }}>
          <TextInput
            value={FromName}
            onChangeText={(text) => {
              setFromName(text);
            }}
            style={styles.TextInput2}
            placeholderTextColor="#7A7A7A"
            autoFocus={false}
            //placeholder={FromName}
            selectionColor={'#979797'}
          />
        </View>

        <TouchableOpacity
          // disabled={!ToName}
          onPress={() => {
            //  navigation.navigate('AddMoneyScreen');
          }}
          style={{
            height: 28,
            width: 28,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/Images/EditButton.png')}
            style={{ width: 18, height: 18 }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', marginVertical: 25 }}>
        <TouchableOpacity
          //disabled={!ToName}
          onPress={() => AddTofrom()
          }
          style={{
            width: 320,
            height: 45,
            justifyContent: 'center',
            backgroundColor: ToName ? "#303C42" : "#F2F2F2",
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: '#DCDCDC',
              fontWeight: '500',
              fontFamily: 'BarlowSemiCondensed-Regular',
              fontSize: 14,
              textAlign: 'center',
            }}>
            {edit ? strings.update : ToName ? strings.Continue : strings.ContinueWithoutToname}
            {/* {strings.DestinationButton} */}
          </Text>
        </TouchableOpacity>
      </View>


    </ScrollView >
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
    fontFamily: 'BarlowSemiCondensed-Regular',
    fontSize: 28,
  },
  titleTo: {
    color: '#303C42',
    textAlign: 'center',
    marginHorizontal: 60,
    fontFamily: 'BarlowSemiCondensed-Regular',
    fontSize: 28, marginTop: 20

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
    alignItems: 'center',
    bottom: 10
  },
  TextInput2: {
    color: '#303C42',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',

  },
  button: {
    alignItems: 'center',
    marginTop: 30,
    width: 319,
    height: 58,
    backgroundColor: '#0F6EFF',
    borderRadius: 12,
  },
});
export default DistinationsScreen;