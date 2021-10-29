import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { strings } from "../../../Utility";
import * as Progress from "react-native-progress";
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserName = ({ navigation }) => {
  const [activate, setactivate] = useState(false);
  const [FullName, setFullName] = useState('');

  //Adding User
  function AddUserName() {
    const user = firebase.auth().currentUser;
    firestore()
      .collection('Users')
      .doc(user.uid)
      .update({
        Name: FullName,
      })
      .then(() => {
        navigation.navigate('UserEmail');
      });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginVertical: 30 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{height: 35, width: 35, alignItems: 'center',justifyContent:"center"}}>
            <Image
              source={require("../../../assets/Images/Back.png")}
              style={{ width: 23, height: 23, }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <Text style={{ color: "#7A7A7A", fontSize: 14, marginVertical: 5 }}>
            {strings.ProgressBarTitle}
          </Text>
          <TouchableOpacity
            onPress={()=>navigation.navigate("Info")}
            style={{height: 35, width: 35, alignItems: 'center',justifyContent:"center"}}>
            <Image
              source={require("../../../assets/Images/infoicon.png")}
              style={{ width: 23, height: 23, }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Progress.Bar
            progress={0.75}
            width={150}
            color={"#7A7A7A"}
            height={1}
            borderWidth={0.38}
          />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 40,
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>{strings.usernameText}</Text>
      </View>
      <Text style={styles.title}>{strings.usernameTitle}</Text>
      <View style={{ alignItems: "center" }}>
        <View style={styles.inputView}>
          <TextInput
            onChangeText={(text) => {
              setactivate(text.length > 0);
              setFullName(text)
            }}
            style={styles.TextInput}
            autoFocus={true}
            selectionColor={"#979797"}
                 // value={FullName}
              // onChangeText={text => setFullName(text)}
          />
        </View>
      </View>
      <View style={{ alignItems: "center", paddingBottom: 30 }}>
        <TouchableOpacity
          style={{ borderBottomColor: "#303C42", borderBottomWidth: 1 }}
        >
          <Text style={{ color: "#000000", fontSize: 15 }}>
            {strings.Fillinlater}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          disabled={!activate}
          onPress={() => {
            AddUserName()
          }}
          style={{
            width: 320,
            height: 45,
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
        </TouchableOpacity>
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
    marginHorizontal: 60,
    fontFamily: "BarlowSemiCondensed-Regular",
    fontSize: 28,
    paddingTop: 40,
  },
  text: {
    color: "#000000",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "BarlowSemiCondensed-ExtraLight",
    marginHorizontal: 30,
  },
  BoldText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "BarlowSemiCondensed-ExtraLight",
  },
  inputView: {
    width: 320,
    height: 70,
    justifyContent: "center",
    borderRadius: 6,
    fontWeight: "600",
    marginHorizontal: 60,
    fontFamily: "BarlowSemiCondensed-Medium",
  },
  TextInput: {
    color: "#303C42",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    marginTop: 0,
    width: 319,
    height: 58,
    backgroundColor: "#0F6EFF",
    borderRadius: 12,
  },
});
export default UserName;
