import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { justifyContent, paddingTop } from "styled-system";
import { strings } from "../../../Utility";

const ActivationScr = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#32B9AF" ,
    justifyContent:'space-between'
    }}>

      <View>
      <View style={{flexDirection:'row',justifyContent:"space-between", paddingTop:50,marginHorizontal:20}}>
        <View></View>
      <View></View>
        <TouchableOpacity
         onPress={()=>{
          navigation.navigate('TabBar')
       }}
        >
          <Image
            source={require("../../../assets/Images/cross.png")}
            style={{ width: 30, height: 25, bottom: 5 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      </View>
      <View>
      <TouchableOpacity
      style={{bottom: 10}}
       onPress={()=>{
        navigation.navigate('TabBar')
    }}>
        <Image
          source={require("../../../assets/Images/pic3.png")}
          style={{ width: 260, height: 210, marginLeft: -7, bottom: 20 }}
          resizeMode="contain"
        />
        <View>
          <Text
            style={{
              textAlign: "center",
              bottom: 77,
              marginHorizontal: 50,
              color: "#FFFFFF",
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: "BarlowSemiCondensed-Bold",
            }}
          >
   {strings.ActivationScrText}
          </Text>
          <Text
            style={{
              textAlign: "center",
              bottom: 80,
              marginHorizontal: 90,
              color: "#FFFFFF",
              fontSize: 20,
              fontFamily: "BarlowSemiCondensed-Regular",
            }}
          >
            Put on your{" "}
            <Text
              style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}
            >{strings.Logo}</Text> {strings.ActivationScrText2}</Text>
        </View>
      </TouchableOpacity>
      </View>
      <TouchableOpacity 
       onPress={()=>{
        navigation.navigate('TabBar')
    }}
      style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/Images/pic2.png")}
          style={{ width: "100%", height: 130, bottom: 95 }}
          resizeMode="contain"
        />
        <Text
          style={{
            textAlign: "center",
            bottom: 100,
            marginHorizontal: 50,
            color: "#FFFFFF",
            fontSize: 25,
            fontWeight: "bold",
            fontFamily: "BarlowSemiCondensed-Bold",
          }}
        >
     {strings.ActivationScrText3}
        </Text>
        <Text
          style={{
            textAlign: "center",
            bottom: 100,
            marginHorizontal: 70,
            color: "#FFFFFF",
            fontSize: 20,
            fontFamily: "BarlowSemiCondensed-Regular",
          }}>
          {strings.ActivationScrText4}
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}> {strings.Logo}</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
       onPress={()=>{
        navigation.navigate('TabBar')
    }}
      style={{}}>
        <Image
          source={require("../../../assets/Images/pic.png")}
          style={{
            width: 235,
            height: 150,
            bottom: 90,
            marginLeft: 150,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            textAlign: "center",
            bottom: 140,
            marginHorizontal: 50,
            color: "#FFFFFF",
            fontSize: 25,
            fontWeight: "bold",
            fontFamily: "BarlowSemiCondensed-Bold",
          }}>{strings.ActivationScrText5}</Text><Text
          style={{
            textAlign: "center",
            bottom: 140,
            marginHorizontal: 55,
            color: "#FFFFFF",
            fontSize: 20,
            fontFamily: "BarlowSemiCondensed-Regular",
          }}>
          {strings.ActivationScrText5}
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}> {strings.Logo} </Text>{strings.ActivationScrText6}</Text>
      </TouchableOpacity> 
    </View>
  );
};

export default ActivationScr;
