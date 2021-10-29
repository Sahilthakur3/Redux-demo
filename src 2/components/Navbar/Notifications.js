import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { strings } from '../../../Utility';

export default function Notifications({ navigation }) {
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
          }}
        >
          {strings.notification}
        </Text>
      </View>


    </View>
  )
}
