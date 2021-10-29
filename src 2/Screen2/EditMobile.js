import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import * as RNLocalize from "react-native-localize";
import { strings } from "../../Utility";
import Ripple from "react-native-material-ripple";
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

const EditMobile = ({ navigation, route }) => {
  const [accepted, setaccepted] = useState(false);
  const [PhoneValidation, setPhoneValidation] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
  const [locCountryCode, setlocCountryCode] = useState("");
  const [formattedphonevalue, setformattedphonevalue] = useState("");
  const [callingCode, setcallingCode] = useState(null);
  
  
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
          setphoneNumber(documentSnapshot.data().phoneNumber)
          setcallingCode(documentSnapshot.data().callingCode)
          setlocCountryCode(documentSnapshot.data().countryCode)
        }
      })
  }

  //Button Input Active
  const [activate, setactivate] = useState(false);

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
  };
  //Check Number if Valid or Not function
  const CheckNumber = () => {
    let CallingCode = "+" + phoneInput.current?.getCallingCode();
    if (phoneNumber.length >= 8 && phoneNumber.length < 11) {
      navigation.navigate("EditOtp", {
        number: phoneNumber,
        code: CallingCode,
        formattedNumber: formattedphonevalue,
        countryCode: phoneInput.current?.getCountryCode(),
      });
    } else {
      // setPhoneValidation(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingTop: 40 }}>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
            <Image
              source={require("../../assets/Images/Back.png")}
              style={{ width: 23, height: 23, }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <Text
            style={{
              color: "#7A7A7A",
              fontSize: 14,
              textAlign: "center",
              marginHorizontal: 70,
            }}
          >
            {strings.EditMobileNumberTitle}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 40,
          alignItems: "center",
        }}
      ></View>
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 100,
          marginHorizontal: 40,
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>
          <Text style={styles.text}>{strings.EditMobileNumberText}</Text>
        </Text>
      </View>
      <Text style={styles.title}>{strings.EditMobileNumberText2}</Text>
      <View
        style={{
          borderRadius: 30,
          height: 70,
          alignItems: "center",
          bottom: 20,
        }}
      >
        <PhoneInput
          value={phoneNumber}
          ref={phoneInput}
          autoFocus={true}
          placeholder={"Phone Number"}
          defaultCode={locCountryCode}
          countryPickerButtonStyle={{ backgroundColor: "#FAFAFA" }}
          onChangeText={(text) => {
            setactivate(text.length > 0), updatePhonenumber(text);
          }}
          onChangeFormattedText={(text) => {
            setformattedphonevalue(text);
          }}
          layout="first"
          selectionColor={"#979797"}
          codeTextStyle={{
            color: "#303C42",
            fontFamily: "BarlowSemiCondensed-Bold",
            fontSize: 20,
          }}
          textInputStyle={{
            fontFamily: "BarlowSemiCondensed-Medium",
            fontSize: 20,
            letterSpacing: 3,
            backgroundColor: "#FAFAFA",
            color: "#303C42",
          }}
        />
      </View>
      <View style={{ alignItems: "center", marginVertical: 15 }}>
        <Ripple
          // disabled={!activate}
          onPress={() => {
            CheckNumber();
          }}
          style={{
            width: 320,
            height: 40,
            justifyContent: "center",
            backgroundColor: activate ? "#303C42" : "#F2F2F2",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "#DCDCDC",
              fontWeight: "bold",
              fontFamily: "BarlowSemiCondensed-Regular",
              fontSize: 14,
              textAlign: "center",
            }}
          >
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
    backgroundColor: "#FAFAFA",
  },
  title: {
    color: "#303C42",
    textAlign: "center",
    fontFamily: "BarlowSemiCondensed-Regular",
    fontSize: 28,
    bottom: 30,
  },
  text: {
    color: "#000000",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "BarlowSemiCondensed-Regular",
    marginHorizontal: 60,
  },
  BoldText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "BarlowSemiCondensed-ExtraLight",
    textAlign: "center",
    bottom: 10,
  },
  inputView: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    width: 319,
    height: 60,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },

  TextInput: {
    color: "black",
    fontSize: 16,
  },
  button: {
    alignItems: "center",
    marginTop: 30,
    width: 319,
    height: 58,
    backgroundColor: "#0F6EFF",
    borderRadius: 12,
  },
});
export default EditMobile;
