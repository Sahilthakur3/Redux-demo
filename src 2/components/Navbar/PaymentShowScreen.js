import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import * as RNLocalize from "react-native-localize";
import { strings } from "../../../Utility";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PaymentShowScreen = ({ navigation }) => {

  const [activate, setactivate] = useState(false);

  useEffect(() => {
    var LocData = [];
    LocData = RNLocalize.getLocales();
    setlocCountryCode(LocData[0].countryCode);
  }, [1]);

  const [selectedCard, setselectedCard] = useState(true);

  const ButtonClick = (give) => {
    setselectedCard(give ? true : false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.TopHeaderContainer}>
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
          <Text style={{ color: "#7A7A7A", fontSize: 14, marginVertical: 5 }}>
            {strings.PaymentShowScreenTopText}
          </Text>
          <TouchableOpacity
             onPress={()=>navigation.navigate("Info")}
            style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
            <Image
              source={require("../../../assets/Images/infoicon.png")}
              style={{ width: 23, height: 23, }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 40,
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>{strings.PaymentShowScreenText}</Text>
        </View>
        <Text style={styles.title}>{strings.EditMobileNumberText2}</Text>
        <View
          style={{
            borderRadius: 30,
            height: 70,
            alignItems: "center",
          }}
        >
          <View style={styles.inputView}>
            <TextInput
              onChangeText={(text) => {
                setactivate(text.length > 0);
              }}
              style={styles.TextInput}
              autoFocus={true}
              selectionColor={"#979797"}
            />
          </View>
        </View>

        <View style={{ paddingTop: 40 }}>
          <View style={{ marginHorizontal: 60 }}></View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              disabled={!activate}
              onPress={() => { }}
              style={{
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: activate ? "#4A66FF" : "#F2F2F2",
                borderRadius: 20,
                justifyContent: "center",
                marginVertical: 20,
                paddingHorizontal: 70,
                paddingVertical: 9,
              }}
              onPress={() => {
                navigation.navigate("ReceiptScreen");
              }}
            >
              <View>
                <Text style={styles.Buttontext}>
                  {strings.PaymentScreenShowButoon}
                </Text>
              </View>
              <View>
                <Image
                  source={require("../../../assets/Images/payLogo.png")}
                  style={{ width: 21, height: 22, marginHorizontal: 2 }}
                  resizeMode="stretch"
                />
              </View>
              <View>
                <Text style={styles.Buttontext2}>
                  {strings.PaymentScreenMobilePay}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonView2}
              onPress={() => {
                // navigation.navigate('PaymentActivate')
              }}
            >
              <View>
                <Text style={styles.Buttontext2}>
                  {strings.PaymentShowScreenButtonText}
                </Text>
              </View>
              <View>
                {/* <Image
                source={require('../../../assets/Images/appleLogo.png')}
                style={{width: 15, height: 18, marginHorizontal: 4}}
                resizeMode="stretch"
              /> */}
              </View>
              <View>
                {/* <Text style={styles.Buttontext}>{strings.Pay}</Text> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  TopHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingTop: 50,
  },
  ButtonView2: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#303C42",
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 115,
    paddingVertical: 9,
  },
  Buttontext: {
    textAlign: "center",
    color: "#F5F5F5",
    fontSize: 20,
    fontFamily: "BarlowSemiCondensed-Regular",
  },
  Buttontext2: {
    textAlign: "center",
    color: "#F5F5F5",
    fontWeight: "500",
    fontSize: 20,
    fontFamily: "BarlowSemiCondensed-Regular",
  },
  title: {
    color: "#303C42",
    textAlign: "center",
    fontFamily: "BarlowSemiCondensed-Regular",
    fontSize: 28,
  },
  text: {
    color: "#000000",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "BarlowSemiCondensed-Regular",
    marginHorizontal: 85,
    paddingTop: 30,
    paddingBottom: 40,
  },
  inputView: {
    width: 320,
    height: 70,
    justifyContent: "center",
    borderRadius: 6,
    fontWeight: "600",
    marginHorizontal: 60,
  },
  TextInput: {
    color: "#303C42",
    fontSize: 35,
    textAlign: "center",
    fontFamily: "BarlowSemiCondensed-Regular",
  },
});

export default PaymentShowScreen;
