import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { strings } from "../../../Utility";


const PaymentScreen = ({ navigation, route }) => {


  const [money, setMoney] = useState(route.params.Money)
  const [accepted, setaccepted] = useState(false);
  function pay() {
    if (accepted == true) {
      navigation.navigate("PaymentCompleted",{...route.params})
    }
    else {
      alert("Please Accept term and condition")
    }
  }
  const text = parseInt(money) / 75
 
  const Total = parseInt(money) + text
  const Totalmoney = Total.toFixed(2)

  return (
    <View style={styles.container}>
      <View style={styles.TopHeaderContainer}>
        <TouchableOpacity style={{ justifyContent: "center" }}
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
          <Image
            source={require("../../../assets/Images/Back.png")}
            style={{ width: 23, height: 23, }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Text style={{ color: "#7A7A7A", fontSize: 14, marginVertical: 5 }}>
          {strings.WritingScreenTitleTop}
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
          alignItems: "center",
        }}
      >
        <View style={styles.box}>
          <View style={{ marginHorizontal: 30 }}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 40,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontWeight: "700",
                  fontSize: 18,
                  fontFamily: "BarlowSemiCondensed-MediumItalic",
                }}
              >
                {strings.Logo}{" "}
              </Text>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 18,
                  fontFamily: "BarlowSemiCondensed-LightItalic",
                }}
              >
                {strings.buyOverview}
              </Text>
            </View>
            <View>
              <Text style={styles.CradText}>{strings.PaymentScreenText1}</Text>
              <Text style={styles.CradText}>{strings.PaymentScreenText2}</Text>
              <Text style={styles.CradText}>{strings.PaymentScreenText3} {money} kr.</Text>
              <Text style={styles.CradText}>{strings.PaymentScreenText4}
                {text.toFixed(2)} kr.</Text>
            </View>
            <View style={{ marginVertical: 15 }}>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 18,
                  fontFamily: "BarlowSemiCondensed-Italic",
                  fontWeight: "600",
                }}
              >
                {strings.PaymentScreenText5} {Totalmoney} kr.
              </Text>
              <Text style={styles.CradText}>{strings.PaymentScreenText6}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{}}>
        <View style={{ marginHorizontal: 60 }}>
          <Text
            style={{
              color: "#000000",
              fontWeight: "400",
              fontSize: 15,
              fontFamily: "BarlowSemiCondensed-MediumItalic",
            }}
          >
            {strings.PaymentScreenText7}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setaccepted(!accepted);
              }}
            >
              <Image
                source={
                  accepted
                    ? require("../../../assets/Images/selection.png")
                    : require("../../../assets/Images/radioButton.png")
                }
                style={{ width: 22, height: 22 }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <Text
              style={{
                color: "#000000",
                fontWeight: "400",
                fontSize: 15,
                fontFamily: "BarlowSemiCondensed-MediumItalic",
              }}
            >
              {strings.PaymentScreenText8}
            </Text>
            <Text
              style={{
                color: "#000000",
                fontWeight: "300",
                fontSize: 15,
                fontFamily: "BarlowSemiCondensed-MediumItalic",
              }}
            >
              {strings.PaymentScreenText9}
            </Text>
            <Text
              style={{
                color: "#000000",
                fontWeight: "600",
                fontSize: 15,
                fontFamily: "BarlowSemiCondensed-MediumItalic",
              }}
            >
              {strings.Logo}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ alignItems: "center", paddingBottom: 40 }}>
        <TouchableOpacity
          style={styles.ButtonView}
          onPress={() => pay()}
        >
          <View>
            <Text style={styles.Buttontext}>
              {strings.PaymentScreenPayWith}
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
          onPress={() => pay()}
        >
          <View>
            <Text style={styles.Buttontext2}>
              {strings.PaymentScreenPayWith}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../assets/Images/appleLogo.png")}
              style={{ width: 15, height: 18, marginHorizontal: 4 }}
              resizeMode="stretch"
            />
          </View>
          <View>
            <Text style={styles.Buttontext}>{strings.Pay}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "space-between",
  },
  TopHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingTop: 40,
  },
  ButtonView: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#4A66FF",
    borderRadius: 20,
    justifyContent: "center",
    marginVertical: 20,
    paddingHorizontal: 70,
    paddingVertical: 9,
  },
  ButtonView2: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#303C42",
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 95,
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
  box: {
    width: 320,
    height: 270,
    backgroundColor: "white",
    borderRadius: 20,
  },
  CradText: {
    color: "#000000",
    fontSize: 15,
    fontFamily: "BarlowSemiCondensed-MediumItalic",
    marginVertical: 3,
  },
});

export default PaymentScreen;
