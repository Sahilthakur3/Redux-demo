import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { strings } from '../../../Utility';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

export default function PaymentFromProfile({ navigation }) {
  const [MobileNumber, setmobilenumber] = useState("")
  useEffect(() => {
    getdata()
  }, [navigation]);

  function getdata() {
    const user = firebase.auth().currentUser;
    firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setmobilenumber(documentSnapshot.data().formattedNumber)
        }
      })
  }
  return (
    <View>

      <View
        style={{
          marginHorizontal: 20,
          flexDirection: "row",
          justifyContent: "flex-start",
          marginTop: RFValue(40)
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
          <Image
            source={require("../../../assets/Images/Back.png")}
            style={{ width: 23, height: 23, }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "#7A7A7A",
            fontSize: 14,
            textAlign: "center",
            marginHorizontal: 100,
            fontFamily: "BarlowSemiCondensed-Regular",
          }}
        >
          {strings.PaymentProfiel}
        </Text>
      </View>
      <Text style={{
        fontFamily: "BarlowSemiCondensed-Regular",
        fontSize: 20,
        fontWeight: "600",
        color: "#303c42",
        marginTop: 60,
        marginLeft: 20
      }}>
        {strings.PaymentGift}
      </Text>
      <Text style={{
        fontFamily: "BarlowSemiCondensed-Regular",
        fontSize: 14,
        fontWeight: "400",
        color: "black",
        marginTop: 5,
        marginLeft: 20
      }}>
        {strings.Mobilenumbertext}
      </Text>
      <TouchableOpacity style={{
        backgroundColor: "#E2E2E2", height: 40, alignContent: "center", marginTop: 30
      }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
          <View style={{
            justifyContent: "center",
            height: 40
          }}>
            <Text style={{
              fontFamily: "BarlowSemiCondensed-Regular",
              fontSize: 14,
              fontWeight: "400",
              color: "black",
              //marginTop:5,
              marginLeft: 20,
              textAlignVertical: "center",
              //height:40
            }}>
              {strings. MobilePay}
            </Text>

          </View>
          <View style={{
            justifyContent: "center",
            height: 40,
            flexDirection: "row",
            alignItems: "center"
          }}>
            <Text style={{ color: "#32B9AF", fontSize: 14, textAlignVertical: "center" }}>
              {MobileNumber}
            </Text>
            <Image
              source={require("../../../assets/Images/ProfileLeftButton.png")}
              style={{ width: 5.5, height: 10, marginHorizontal: 20 }}
              resizeMode="contain"
            />

          </View>

        </View>
      </TouchableOpacity>
      <Text style={{
        marginVertical: 20,
        marginLeft: 20
      }}>
        {strings.PaymentMethod}
      </Text>


    </View>
  )
}
