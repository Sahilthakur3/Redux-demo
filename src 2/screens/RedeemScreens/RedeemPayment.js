import React, { useState } from "react";
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DefaultPreference from 'react-native-default-preference';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { strings } from '../../../Utility';
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from "react-native-responsive-fontsize";


const ReedemPayment = ({ navigation,route }) => {
  const [PhoneNumber, setPhoneNumber] = useState("");

  function Transfermoney() {
    //DefaultPreference.set('number', PhoneNumber).then(function () {
    //})
    navigation.navigate('RedeemPaymentCompleted',{PhNumber : PhoneNumber, Money : route.params.Money});
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RedeemCardOverview")
            }}
            style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
            <Image
              source={require('../../../assets/Images/Back.png')}
              style={{ width: 23, height: 23, }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <Text style={{ color: '#7A7A7A', fontSize: 14, marginVertical: 5 }}>
            {strings.CashGift}
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

      </View>
      <View
        style={{
          marginHorizontal: 40,
          alignItems: 'center', paddingTop: 30
        }}>
        <Text style={styles.text}>{strings.RedeemPaymentText1}

        </Text>


      </View>
      <View style={{
        alignItems: 'center',
        marginTop: RFValue(40)
      }}>

        <Text style={styles.title}>{strings.EditMobileNumberText2}</Text>
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
              setPhoneNumber(text);
            }}
            style={styles.TextInput2}
            selectionColor={'#979797'}
            autoFocus={true}
            keyboardType={'numeric'}
            maxLength={11}

          />
        </View>


      </View>
      <View style={{ alignItems: 'center', paddingTop: 60, }}>
        <TouchableOpacity
          disabled={!PhoneNumber}
          onPress={() => Transfermoney()}
          style={{
            width: 320,
            height: 45,
            justifyContent: 'center',
            backgroundColor: PhoneNumber ? "#4A66FF" : "#F2F2F2",
            borderRadius: 20,
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center"
          }}>
          <View>
            <Text style={{
              textAlign: "center",
              color: PhoneNumber ? "#F5F5F5" : "#dcdcdc",
              fontSize: 20,
              fontFamily: "BarlowSemiCondensed-Regular",

            }}>
              {strings.PaymentScreenPayWith}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../assets/Images/payLogo.png")}
              style={{
                width: 21, height: 22, marginHorizontal: 2,
                tintColor: PhoneNumber ? "#F5F5F5" : "#dcdcdc",
              }}
              resizeMode="stretch"
            />
          </View>
          <View>
            <Text style={{
              textAlign: "center",
              color: PhoneNumber ? "#F5F5F5" : "#dcdcdc",
              fontSize: 20,
              fontFamily: "BarlowSemiCondensed-Regular",
            }}>
              {strings.PaymentScreenMobilePay}
            </Text>
          </View>
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
    fontWeight: "400",
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
    fontSize: 40,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: "600",
    height: 50,
    width: 290,
    fontFamily: "BarlowSemiCondensed-Regular"

  },

});
export default ReedemPayment;


