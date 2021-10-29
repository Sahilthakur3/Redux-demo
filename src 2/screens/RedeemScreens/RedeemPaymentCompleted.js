
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { strings } from "../../../Utility";
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DefaultPreference from 'react-native-default-preference';

const RedeemPaymentCompleted = ({ navigation, route }) => {

  const [number, setnumber] = useState(route.params.PhNumber)
  const [money, setmoney] = useState(route.params.Money)
  const text = parseInt(money) / 75
  const Total = parseInt(money) + text
  return (
    <View style={styles.container}>
      <View style={styles.TopHeaderContainer}>
        <TouchableOpacity style={{ justifyContent: "center" }}
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
          {strings.PurchaseOverview}
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
            <View style={{
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: 150
            }}>
              <Text style={{
                fontSize: 15,
                fontWeight: "400",
                fontFamily: "BarlowSemiCondensed-Regular",
              }}>{strings.OverViewText1}</Text>
              <View style={{
                flexDirection: "row"
              }}>
                <Text style={{
                  fontSize: 17,
                  fontWeight: "600",
                  fontFamily: "BarlowSemiCondensed-Regular",

                }}>
                  {number}
                </Text>
                <Text style={{
                  fontSize: 15,
                  fontWeight: "400",
                  fontFamily: "BarlowSemiCondensed-Regular",
                }}> via MobilePay</Text>
              </View>

              <Text style={styles.CradText}>{strings.AmountPaidOut} {money} kr.</Text>

            </View>

          </View>
        </View>
      </View>


      <View style={{ alignItems: "center", paddingBottom: 40 }}>

        <TouchableOpacity
          style={styles.ButtonView2}
          onPress={() => navigation.navigate("RedeemCardOverview")}
        >
          <Text style={{
            color: "#f5f5f5"
          }}>
            {strings.BackToOverView}
          </Text>
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
    height: 40
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
    marginTop: -230
  },
  CradText: {
    color: "#000000",
    fontSize: 17,
    fontFamily: "BarlowSemiCondensed-MediumItalic",
    marginVertical: 3,
    fontWeight: "600"
  },
});

export default RedeemPaymentCompleted;

