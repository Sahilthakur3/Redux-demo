import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  LogBox,
} from 'react-native';
import { strings } from '../../../Utility';
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from "react-native-responsive-fontsize";
import { useIsFocused } from '@react-navigation/native';

const AddMoneyScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();


  const [money, setmoney] = useState('');
  const [edit, setedit] = useState(route.params.edit);

  useEffect(() => {
    console.log('route editmoney', route.params.data);

    if (isFocused) {
      setedit(route.params.edit)
      setmoney(route.params.data.Amount)
    }
  }, [isFocused]);
  function AddMoney() {

    let obj = route.params.data
    obj.Amount = money
    obj.Voucherindex = 0
    console.log('add money', obj);
    edit ? navigation.navigate('UserCards3', { data: obj, add: route.params.add }) : navigation.navigate('UserCards3', { data: obj, add: true });
  }
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={{ paddingTop: 40, }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          {!edit ? <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditVideo");
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
            marginVertical: 5,
            marginLeft: edit ? RFValue(120) : RFValue(1)
          }}>
            {strings.AddMoneyScreenProgressBarTitle}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Info")}
            style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
            <Image
              source={require('../../../assets/Images/infoicon.png')}
              style={{ width: 23, height: 23, }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', }}>
          <Progress.Bar
            progress={0.75}
            width={150}
            color={'#7A7A7A'}
            height={1}
            borderWidth={0.18}
          />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 40,
          alignItems: 'center', paddingTop: 30
        }}>
        <Text style={styles.text}>{strings.AddMoneyScreenText}
          <Text style={styles.text2}>{strings.stiicky}</Text>
          <Text style={styles.text}>{strings.AddMoneyScreenText2}</Text>
        </Text>


      </View>
      <View style={{ alignItems: 'center' }}>

        <Text style={styles.title}>{strings.AddMoneyValue}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
          <TextInput
            onChangeText={(text) => {
              setmoney(text);
            }}
            value={money}
            style={styles.TextInput2}
            selectionColor={'#979797'}
            autoFocus={true}
            keyboardType={'numeric'}
            maxLength={5}

          />
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

          <Text style={{ color: "#303C42", fontWeight: "600", fontSize: 25, textAlign: 'center' }}>{strings.Kr}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', paddingTop: 60, }}>

        <TouchableOpacity
          //disabled={!money}
          onPress={() => AddMoney()}
          style={{
            width: 320,
            height: 45,
            justifyContent: 'center',
            backgroundColor: money ? "#303C42" : "#F2F2F2",
            borderRadius: 20,
            marginVertical: 10
          }}>
          <Text
            style={{
              color: '#DCDCDC',
              fontWeight: 'bold',
              fontFamily: 'BarlowSemiCondensed-Medium',
              fontSize: 14,
              textAlign: 'center',
            }}>
            {/* {strings.AddMoneyScreenButtonText2} */}
            {edit ? strings.update : money ? strings.Continue : strings.ContinueWithoutMoney}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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
    fontSize: 28, paddingTop: 40
  },
  text: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'BarlowSemiCondensed-ExtraLight',
    marginHorizontal: 55,
  },
  text2: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'BarlowSemiCondensed-ExtraLight',
    fontWeight: '700'
  },
  TextInput2: {
    color: '#303C42',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    width: 80,height:30

  },

});
export default AddMoneyScreen