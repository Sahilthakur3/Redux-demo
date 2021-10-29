import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { strings } from "../../Utility";
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import DefaultPreference from 'react-native-default-preference';

const EditMail = ({ navigation }) => {
  const [activate, setactivate] = useState(true);
  const [Email, setEmail] = useState('');
  const [email, setemail] = useState("")
  const [allemail, setallemail] = useState("")
  // const [showEmail, setshowEmail] = useState('');


  useEffect(() => {
    getdata()
  }, []);
  function getdata() {
    const user = firebase.auth().currentUser;
    firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setEmail(documentSnapshot.data().Email)
        }
      })
  }

  //Adding User
  const AddUserEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(Email) === false) {
      alert("Email is Not Correct")
    }
    else {
      const user = firebase.auth().currentUser;
      firestore()
        .collection('Users')
        .doc(user.uid)
        .update({
          Email: Email,
        })
        .then(() => {
          navigation.goBack()
          console.log("email updated")
        });
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginVertical: 40 }}>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
              <Image
                source={require("../../assets/Images/Back.png")}
                style={{ width: 23, height: 23, }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <Text
              style={{ color: "#7A7A7A", fontSize: 14, marginHorizontal: 110 }}
            >
              {strings.EditMailTitle}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 40,
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>{strings.EditMailText}</Text>
        </View>
        <Text style={styles.title}>{strings.EditMailInputTitle}</Text>

        <View style={{ alignItems: "center" }}>
          <View style={styles.inputView}>
            <TextInput
              onChangeText={(text) => {
                setactivate(text.length > 0)
                setEmail(text);
              }}
              value={Email}
              style={styles.TextInput}
              placeholderTextColor="#7A7A7A"
              autoFocus={true}
              selectionColor={"#979797"}
            />
          </View>
        </View>

        <View style={{ alignItems: "center", paddingTop: 30 }}></View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            disabled={!activate}
            onPress={() => {
              AddUserEmail()
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
              {strings.Save}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    marginHorizontal: 40,
    fontFamily: "BarlowSemiCondensed-Regular",
    fontSize: 30,
    paddingTop: 40,
  },
  inputView: {
    width: 320,
    height: 70,
    justifyContent: "center",
    borderRadius: 6,
    fontWeight: "600",
    marginHorizontal: 0,
    fontFamily: "BarlowSemiCondensed-Medium",
  },
  TextInput: {
    color: "#303C42",
    fontSize: 20,
    textAlign: "center",
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

  button: {
    alignItems: "center",
    marginTop: 30,
    width: 319,
    height: 58,
    backgroundColor: "#0F6EFF",
    justifyContent: "center",
    borderRadius: 12,
  },
});
export default EditMail;
