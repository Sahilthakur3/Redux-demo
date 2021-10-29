import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { strings } from "../../../Utility";
import { moderateScale, verticalScale } from "../../../Scaling_utils";


const LoginScreen = ({ navigation }) => {
  const Logo = () => {
    return (
      <View style={{ alignItems: "center",paddingTop:20}}>
        <Image
          source={require("../../../assets/Images/Logo.png")}
          style={{ width: 60, height: 18 }}
          resizeMode="contain"
        />
      </View>
    );
  };
  return (
    <ImageBackground style={styles.container}>
      <Logo/>
      <View style={{ paddingTop:100, justifyContent:'center'}}>
        <Image
          style={{
            height: verticalScale(160),
            width: "100%",
            resizeMode: "cover",
            justifyContent: "center"
          }}
          source={require("../LoginScreen/login.png")}
        />
        <View style={{ paddingTop:30}}>
        <Text
          style={{
            fontSize: 26,
            color: "#F5F5F5",
            textAlign: "center",
            marginHorizontal: 30,
            fontWeight: "bold",
            fontFamily: "BarlowSemiCondensed-Regular",
          }}>
          {strings.createUserScreenTitle}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#F5F5F5",
            textAlign: "center",
            paddingHorizontal:30
          }}>
          {strings.createUserScreenText}
          <Text style={{ fontWeight: "800" }}>{strings.stiicky}</Text>
          {strings.createUserScreenText2}
        </Text>
      </View>
      </View>
      <View style={{ alignItems: "center" , paddingTop:40}}>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text style={styles.text}>{strings.alreadyCreatedTitle}</Text>
          <View>
            <TouchableOpacity onPress={() => {
            navigation.navigate("PhoneLogin",{type:'login'});
          }}>
            
              <Text style={styles.BoldText}> {strings.Login} </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("PhoneLogin",{type:'create'});
          }}>
          <Text style={styles.text}>{strings.CreateUserButton}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32B9AF",
    justifyContent: 'space-around',
  },
  text: {
    color: "#F5F5F5",
    fontSize: 14,
    textAlign: "center",
  },
  BoldText: {
    color: "#F5F5F5",
    fontSize: 15,
    fontWeight: "500",
  },
  title: {
    fontSize: 22,
    color: "#F5F5F5",
    textAlign: "center",
  },
  button: {
    width: 301,
    height: 40,
    backgroundColor: "#303C42",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
export default LoginScreen;
