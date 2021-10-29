import React, { useState, useEffect, useRef } from "react";
import { CachedImage } from '@georstat/react-native-image-cache';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


import {
  View,
  Text,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
  Alert,
  Button,
  Modal
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { strings } from "../../../Utility";
//Imported Firebase Libraries
import { firebase } from "@react-native-firebase/auth";
import DefaultPreference from "react-native-default-preference";
import VersionInfo from "react-native-version-info";
import ImagePicker from "react-native-image-crop-picker";
import { Avatar } from "react-native-paper";




const ProfileTab = ({ navigation, route }) => {

  function loadingImage() {
    return (
      <View>
        <Image style={{ height: 70, width: 70, borderRadius: 45 }} source={require("../../../assets/Images/dummyImg.png")}></Image>
      </View>
    )
  }
  const [MobileNumber, setmobilenumber] = useState("")
  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [img, setimg] = useState("")
  const [modalVisible, setModalVisible] = useState(false);


  function ModalEnable() {
    setModalVisible(true)
  }
  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user == null) {
      return
    }
    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setname(documentSnapshot.data().Name)
          setmobilenumber(documentSnapshot.data().formattedNumber)
          setemail(documentSnapshot.data().Email)
          setimg(documentSnapshot.data().ImagePath)
        }
      })
    return unsubscribe;
  }, []);

  const reference = storage().ref("black-t-shirt-sm.png");
  const [images, setimage] = useState("");

  const SelectPhotos = async () => {

    ImagePicker.openPicker({
      cropping: true,
    }).then((image) => {
      setModalVisible(false)
      setimg(image.path);
      const user = firebase.auth().currentUser;
      const reference = storage().ref(`Users/${user.uid}/${user.uid}_image.png`)
      const task = reference.putFile(image.path);
      task.on('state_changed', taskSnapshot => {
      });
      task.then(async () => {
        const link = (await reference.getDownloadURL()).toString()
        firestore()
          .collection('Users')
          .doc(user.uid)
          .update({
            ImagePath: link
          })
      });

    })
  };



  // image function 



  //Logout Functions
  const LogOutOpenAlert = () => {
    Alert.alert("Log out", "Are you sure want to log out ?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => LogOutUser() },
    ]);
  };
  LogOutUser = async () => {
    try {
      await firebase.auth().signOut();
      //DefaultPreference.set("LoggedStatus", "no").then(function () {
      DeviceEventEmitter.emit("UserLogin", {
        login: false,
        route: "LoginScreen",
      });
      // });
    } catch (e) {
      console.log(e, "User Logout");
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAwareScrollView>
        <View style={{ alignItems: "center", paddingTop: 60 }}>


          <TouchableOpacity
            onPress={async () => {
              ModalEnable()

            }}>
            {/* <CachedImage

              borderRadius={45}
              source={img}
              //loadingImageComponent={loadingImage}
              style={{ height: 70, width: 70, }}

            ></CachedImage> */}
            <Image style={{
              backgroundColor: "#E2E2E2",
              height: 100,
              width: 100,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 60
            }} source={img ? { uri: img } : require("../../../assets/Images/Defaultimg.png")} ></Image>



          </TouchableOpacity>
        </View>
        <Text style={{
          textAlign: "center",
          marginVertical: 5,
          fontSize: 14,
          fontFamily: "BarlowSemiCondensed-Regular",
        }}>
          {strings.Edit}
        </Text>
        <View style={{ marginLeft: 30, marginVertical: 10 }}>
          <Text style={{
            color: "#303C42",
            fontSize: 20,
            fontWeight: "600",
            fontFamily: "BarlowSemiCondensed-Regular",
          }}>
            {strings.Profile}
          </Text>
        </View>
        <View style={{
          //alignItems: "center"
        }}>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditName");
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 18,
              borderBottomColor: "#E2E2E2",
              backgroundColor: "#F2F2F2",
              borderBottomWidth: 0.5,
              width: "100%",
              backgroundColor: "#F2F2F2",
              //marginLeft:30
            }}
          >
            <Text
              style={{
                marginLeft: 30,
                color: "#000000",
                fontSize: 14,
                fontFamily: "BarlowSemiCondensed-Regular",
                // fontWeight:"400"
              }}
            >
              {strings.Name}
            </Text>
            <Image
              source={require("../../../assets/Images/ProfileLeftButton.png")}
              style={{ width: 7.5, height: 15, marginRight: 15 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditMobile");
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 18,
              borderBottomColor: "#E2E2E2",
              backgroundColor: "#F2F2F2",
              borderBottomWidth: 0.5,
              width: "100%",
            }}
          >
            <Text
              style={{
                marginHorizontal: 30,
                color: "#000000",
                fontSize: 14,
                fontFamily: "BarlowSemiCondensed-Regular",
              }}
            >
              {strings.MobileNumber}
            </Text>
            <View style={{
              flexDirection: "row"
            }}>
              <Text style={{
                color: "#32B9AF",
                fontSize: 14,
                marginRight: 15,
                fontFamily: "BarlowSemiCondensed-Regular",
              }}>
                {MobileNumber}
              </Text>
              <Image
                source={require("../../../assets/Images/ProfileLeftButton.png")}
                style={{ width: 7.5, height: 15, marginRight: 15 }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditMail");
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 18,
              borderBottomColor: "#E2E2E2",
              backgroundColor: "#F2F2F2",
              borderBottomWidth: 0.5,
              width: "100%",
            }}
          >
            <Text
              style={{
                marginHorizontal: 30,
                color: "#000000",
                fontSize: 14,
                fontFamily: "BarlowSemiCondensed-Regular",
              }}
            >
              {strings.Email}
              {/* {enteredEmail} */}
            </Text>
            <View style={{
              flexDirection: "row",
              alignItems: "center"
            }}>

              <Text style={{
                color: "#32B9AF",
                fontSize: 14,
                marginRight: 15,
                fontFamily: "BarlowSemiCondensed-Regular",
                textAlign: "right"
              }}>
                {email}
              </Text>
              <Image
                source={require("../../../assets/Images/ProfileLeftButton.png")}
                style={{ width: 7.5, height: 15, marginRight: 15 }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PaymentFromProfile")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 18,
              borderBottomColor: "#E2E2E2",
              backgroundColor: "#F2F2F2",
              borderBottomWidth: 0.5,
              width: "100%",
            }}
          >
            <Text
              style={{
                marginHorizontal: 30,
                color: "#000000",
                fontSize: 14,
                fontFamily: "BarlowSemiCondensed-Regular",
              }}
            >
              {strings.PaymentProfiel}
            </Text>
            <Image
              source={require("../../../assets/Images/ProfileLeftButton.png")}
              style={{ width: 7.5, height: 15, marginHorizontal: 15 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 18,
              borderBottomColor: "#E2E2E2",
              backgroundColor: "#F2F2F2",
              borderBottomWidth: 0.5,
              width: "100%",
            }}
          >
            <Text
              style={{
                marginHorizontal: 30,
                color: "#000000",
                fontSize: 14,
                fontFamily: "BarlowSemiCondensed-Regular",
              }}
            >
              {strings.notification}
            </Text>
            <Image
              source={require("../../../assets/Images/ProfileLeftButton.png")}
              style={{ width: 7.5, height: 15, marginHorizontal: 15 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 30,
            marginVertical: 10,
            paddingVertical: 6,
          }}
        >
          <Text style={{
            color: "#303C42",
            fontSize: 20,
            fontWeight: "600",
            fontFamily: "BarlowSemiCondensed-Regular",
          }}>
            {strings.About}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Term");
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 18,
              borderBottomColor: "#E2E2E2",
              backgroundColor: "#F2F2F2",
              borderBottomWidth: 0.5,
              width: "100%",
            }}
          >
            <Text
              style={{
                marginHorizontal: 30,
                color: "#000000",
                fontSize: 15,
                fontFamily: "BarlowSemiCondensed-Regular",
              }}
            >
              {strings.ProfileConditions}
            </Text>
            <Image
              source={require("../../../assets/Images/ProfileLeftButton.png")}
              style={{ width: 7.5, height: 15, marginHorizontal: 15 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PrivacyPolicy");
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 18,
              borderBottomColor: "#E2E2E2",
              backgroundColor: "#F2F2F2",
              borderBottomWidth: 0.5,
              width: "100%",
            }}
          >
            <Text
              style={{
                marginHorizontal: 30,
                color: "#000000",
                fontSize: 15,
                fontFamily: "BarlowSemiCondensed-Regular",
              }}
            >
              {strings.ProfilePrivacy}
            </Text>
            <Image
              source={require("../../../assets/Images/ProfileLeftButton.png")}
              style={{ width: 7.5, height: 15, marginHorizontal: 15 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              LogOutOpenAlert();
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 18,
              borderBottomColor: "#E2E2E2",
              backgroundColor: "#F2F2F2",
              borderBottomWidth: 0.5,
              width: "100%",
            }}
          >
            <Text
              style={{
                marginHorizontal: 30,
                color: "#000000",
                fontSize: 15,
                fontFamily: "BarlowSemiCondensed-Regular",
              }}
            >
              {strings.logout}
            </Text>
            <Image
              source={require("../../../assets/Images/ProfileLeftButton.png")}
              style={{ width: 7.5, height: 15, marginHorizontal: 15 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >

          <Text style={{
            color: "#000000",
            fontSize: 15,
            marginBottom: 100,
            fontFamily: "BarlowSemiCondensed-Regular",
          }}>
            Version{" "}
            {VersionInfo.appVersion + " (" + VersionInfo.buildVersion + ")"}
          </Text>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={{
            flex: 1,
            justifyContent: "center",
            //backgroundColor:"tranparent"
          }}>


            <View style={{
              height: 150,
              width: 250,
              alignSelf: "center",
              backgroundColor: "grey",
              borderRadius: 15,
              justifyContent: "space-evenly"
            }}>

              <TouchableOpacity style={{
                alignSelf: "center",
                // marginTop:25
              }}>
                <Text style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 18,
                  fontFamily: "BarlowSemiCondensed-Regular",
                }}>
                  {strings.OpenCamera}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => SelectPhotos()}
                style={{
                  alignSelf: "center",
                  //marginTop:15
                }}>
                <Text style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 18,
                  fontFamily: "BarlowSemiCondensed-Regular",
                }}>
                  {strings.ChooseFromGallary}
                </Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => setModalVisible(false)} style={{
                  alignSelf: "center",
                  // marginTop:15
                }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 18,
                    fontFamily: "BarlowSemiCondensed-Regular",
                  }}
                  onPress={() => setModalVisible(false)}>
                  {strings.cancel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ProfileTab;
