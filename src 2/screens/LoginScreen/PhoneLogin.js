import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,ScrollView
} from 'react-native';
import {verticalScale} from '../../../Scaling_utils';
import * as Progress from 'react-native-progress';
import PhoneInput from 'react-native-phone-number-input';
import * as RNLocalize from 'react-native-localize';

import {strings} from '../../../Utility';
import Ripple from 'react-native-material-ripple';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const PhoneLogin = ({navigation, route}) => {

  var type = route.params.type;
  const [accepted, setaccepted] = useState(false);
  const [PhoneValidation,setPhoneValidation] = useState(false);
  const [phoneNumber, setphoneNumber] = useState('');
  const [locCountryCode, setlocCountryCode] = useState('');
  const [formattedphonevalue, setformattedphonevalue] = useState('');
  //Refrence Variables
  const phoneInput = useRef();

  useEffect(() => {
    var LocData = [];
    LocData = RNLocalize.getLocales();
    setlocCountryCode(LocData[0].countryCode);
  }, [1]);

  const updatePhonenumber = (number) => {
    setphoneNumber(number);
    setPhoneValidation(false);
    if (number.length >= 11) {
      setPhoneValidation(true);
    } 
  }
    //Check Number if Valid or Not function
    const CheckNumber =() => {
 
 let CallingCode = '+' + phoneInput.current?.getCallingCode();
      if (phoneNumber.length >= 8 && phoneNumber.length < 11) {
        navigation.navigate('OtpScreen', {
          number: phoneNumber,
          code: CallingCode,
          formattedNumber: formattedphonevalue,
          countryCode: phoneInput.current?.getCountryCode(),
          type: type
        });
      } else {

       // setPhoneValidation(true);
      }
    }

  return (
    <ScrollView style={styles.container}>
        <View style={{paddingTop:40}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LoginScreen");
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
          <View style={{alignItems: 'center'}}>
            <Progress.Bar
              progress={0.25}
              width={150}
              color={'#7A7A7A'}
              height={1}
              borderWidth={0.38}
            />
          </View>
        </View>
        <View
          style={{
            paddingTop:20,
            paddingBottom:100,
            marginHorizontal: 40,
            alignItems: 'center',
          }}>
          <Text style={styles.text}>
            {strings.PhoneInputTopText}
            <Text style={styles.BoldText}> {strings.PhoneInputTopText2}</Text>
          </Text>
        </View>
        <Text style={styles.title}>{strings.PhoneInputTitle}</Text>
        <View
          style={{
            borderRadius: 30,
            height: 70,
            alignItems: 'center',
            bottom: 20,
          }}>
          <PhoneInput
            ref={phoneInput}
            autoFocus={true}
            placeholder={'Phone Number'}
            defaultCode={RNLocalize.getLocales()[0].countryCode}
            countryPickerButtonStyle={{backgroundColor: '#FAFAFA'}}
            onChangeText={text => updatePhonenumber(text)}
            onChangeFormattedText={text => {
              setformattedphonevalue(text);
            }}
            layout="first"
            selectionColor={'#979797'}
            codeTextStyle={{
              color: '#303C42',
              fontFamily: 'BarlowSemiCondensed-Bold',
              fontSize: 20,
            }}
            textInputStyle={{
              fontFamily: 'BarlowSemiCondensed-Medium',
              fontSize: 20,
              letterSpacing: 3,
              backgroundColor: '#FAFAFA',
              color: '#303C42',
            }}
          
          />
        </View>

        <View style={{marginTop: 20}}>
          <View style={{marginHorizontal: 60}}>
            <Text
              style={{
                color: '#000000',
                fontWeight: '400',
                fontSize: 15,
              }}>
              {strings.PhoneInputBottomText}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => {
                 setaccepted(!accepted)
            }}>
                <Image
                  source={accepted ? require('../../../assets/Images/selection.png') : require('../../../assets/Images/radioButton.png')}
                  style={{width: 18, height: 18}}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '400',
                  fontSize: 15,
                  fontFamily: 'BarlowSemiCondensed-Light',
                }}> {strings.PhoneInputBottomText2}
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '300',
                  fontSize: 15,
                  fontFamily: 'BarlowSemiCondensed-MediumItalic',
                }}>{strings.PhoneInputBottomText3}
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '600',
                  fontSize: 15,
                  fontFamily: 'BarlowSemiCondensed-MediumItalic',
                }}> {strings.Logo}
              </Text>
            </View>
          </View>
        </View>

        <View style={{alignItems: 'center', marginVertical: 15}}>
          <Ripple
            disabled ={!accepted}
            onPress={() => {
              CheckNumber();
            }}
            style={{
              width: 320,
              height: 40,
              justifyContent: 'center',
              backgroundColor: (accepted) ? '#303C42' : '#F2F2F2',
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
          </Ripple>
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
    fontFamily: 'BarlowSemiCondensed-Regular',
    fontSize: 28,
    bottom: 30,
  },
  text: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'BarlowSemiCondensed-Regular',
    marginHorizontal: 60,
  },
  BoldText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'BarlowSemiCondensed-ExtraLight',
    textAlign: 'center',
    bottom: 10,
  },
  inputView: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    width: 319,
    height: 60,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },

  TextInput: {
    color: 'black',
    fontSize: 16,
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
export default PhoneLogin;
