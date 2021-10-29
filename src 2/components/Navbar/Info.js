// Imported Libraries

import React, { useState, useEffect, useRef } from 'react';
import { strings } from "../../../Utility";
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Animated,
  Alert,
  Text, Image, TouchableOpacity
} from 'react-native';
import { scale, moderateScale, verticalScale } from '../../../Scaling_utils';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';

//Dimensions
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const screenheight = Dimensions.get('screen').height;

function Info({ navigation }) {
  return (
    <View style={{
      flex: 1
    }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          paddingTop: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
          <Image
            source={require("../../../assets/Images/Back.png")}
            style={{ width: 23, height: 23, }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Text style={{ color: "#7A7A7A", fontSize: 14, marginVertical: 7 }}>
          {strings.info}
        </Text>
        <TouchableOpacity
          onPress={() => { }}
          style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
          
        </TouchableOpacity>
      </View>

      <WebView style={{
        marginTop: 0
      }} source={{ uri: "https://www.google.co.in/" }}>

      </WebView>
    </View>

  );
}
const styles = StyleSheet.create({
  CHeading1: {
    fontFamily: 'SFProDisplay-SemiBold',
    fontSize: verticalScale(28),

  },

  CHeading2: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: verticalScale(10),
    color: '#8F92A1',
    paddingBottom: 2,
  },
  container: {
    height: screenheight,
    paddingBottom: 20,

  },
});

export default Info;
