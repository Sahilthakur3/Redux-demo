// Imported Libraries

import React, {useState, useEffect, useRef} from 'react';
import { strings } from "../../../Utility";
import { WebView } from 'react-native-webview';
import {
  StyleSheet,
  View,
  Dimensions,
  
  Text,Image,TouchableOpacity
} from 'react-native';
import {scale, moderateScale, verticalScale} from '../../../Scaling_utils';



//Dimensions
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const screenheight = Dimensions.get('screen').height;
//TermCondition
function Term({navigation}) {
  //ref
 

  return (
    <View style={{ flex:1}}>
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
            navigation.navigate("ProfileTab");
          }}
          style={{height: 35, width: 35, alignItems: 'center',justifyContent:"center"}}>
          <Image
            source={require("../../../assets/Images/Back.png")}
            style={{ width: 23, height: 23, }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Text style={{ color: "#7A7A7A", fontSize: 14, marginVertical: 7 }}>
        {strings.ProfileConditions}
        </Text>
        <TouchableOpacity
          onPress={() => { }}
          style={{height: 35, width: 35, alignItems: 'center',justifyContent:"center"}}>
          
        </TouchableOpacity>
      </View>
    <WebView source={{uri : "https://policies.google.com/terms?hl=en-US"}}>

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

export default Term;
