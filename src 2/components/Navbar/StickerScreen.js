import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { strings } from "../../../Utility";

const StickerScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          marginVertical: 40,
          flexDirection: "row",
          justifyContent: "flex-end",
          marginHorizontal: 20,
        }}
      >
        <Image
          source={require("../../../assets/Images/infoicon.png")}
          style={{ width: 23, height: 23, }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={{ marginVertical: 200 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              color: "#303C42",
              fontSize: 25,
              fontWeight: "500",
              textAlign: "center",
              fontFamily: "BarlowSemiCondensed-Regular",
            }}
          >
     {strings.StickerScreenText2}
          </Text>
        </View>

        <View style={{ marginHorizontal: 1 }}>
          <Text
            style={{
              color: "#303C42",
              fontSize: 40,
              fontWeight: "600",
              textAlign: "center",
              fontFamily: "BarlowSemiCondensed-Bold",
              marginVertical: 5,
            }}
          >
            {strings.FREEDELIVERY}
          </Text>
          <Text
            style={{
              color: "#303C42",
              fontSize: 25,
              fontFamily: "BarlowSemiCondensed-Regular",
              marginTop: 0,
              marginHorizontal: 5,
              textAlign: "center",
              marginHorizontal: 60,
              marginVertical: 10,
            }}
          >
           {strings.StickerScreenText}
            <Text
              style={{
                color: "#303C42",
                fontSize: 25,
                fontWeight: "600",
                fontFamily: "BarlowSemiCondensed-Regular",
                marginTop: 0,
              }}> {strings.Logo}
            </Text>
           {strings.Gifttags}
          </Text>
        </View>

        <View style={{ alignItems: "center", marginTop: 250 }}>
          <TouchableOpacity
            style={{
              width: 321,
              height: 40,
              backgroundColor: "#32B9AF",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 0,
            }}>
            <Text style={{ color: "#F5F5F5", fontWeight: "500", fontSize: 16 }}>
            {strings.Gotoshop}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 321,
              height: 40,
              backgroundColor: "#303C42",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
            }}>
            <Text style={{ color: "#F5F5F5", fontWeight: "500", fontSize: 16 }}>
            {strings.Continue}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StickerScreen;
