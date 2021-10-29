import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
  ,  Alert,
} from "react-native";
import messaging from '@react-native-firebase/messaging';
import DefaultPreference from 'react-native-default-preference';
import {FCMToken, strings} from '../../../Utility';
const NotificationScreen = ({ navigation , route}) => {
  

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      ///DefaultPreference.set('notificationPermission', 'given').then(function () { });
      getFcmToken()
      navigation.navigate('LoginScreen');
    }
    // else
    // {
    //   DefaultPreference.set('notificationPermission', 'notgiven').then(function () { });
    // }
  }
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      DefaultPreference.set('token', fcmToken).then(function () { });
    } else {
      console.log("Failed", "No token received");
    }
  }
  
  useEffect(() => {

    DefaultPreference.set('notificationOpen', 'Yes').then(function () { });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  });

  return (
    <>
<SafeAreaView>
  
      
        <View style={styles.Container}>
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <Text style={styles.Heading}>
              {strings.SendNotifications}
            </Text>
          </View>

          <View style={{ padding: 20 }}>
            <View style={styles.AlertContainer}>
              <View style={{ paddingVertical: 10 }}>
                <Text style={{ textAlign: "center" }}>
                  {strings.TurnOnNotification}
                </Text>
              </View>

              <View style={{ paddingVertical: 20 }}>
                <Text style={{ textAlign: "center" }}>
                  {strings.neverMissNotification}
                </Text>
                <Text style={{ textAlign: "center" }}>
                 {strings.LatestUpdates}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
              
                <View style={styles.alertBox1}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('SignIn', {
                    type: route.params.type,
                  });
                }}>
                  <Text style={styles.alertText}>{strings.NotNow}</Text>

                </TouchableOpacity>
                </View>
              
                <View style={styles.alertBox2}>
                <TouchableOpacity onPress={() => {
                  requestUserPermission()
                }}>
                  <Text style={styles.alertText}>{strings.OK}</Text>
                  </TouchableOpacity>
                </View>
               
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                 <View style={{height:20,width:20,backgroundColor:'transparent'}}>

                 </View>
                 <View style={{paddingHorizontal:50,paddingVertical:6}}>
                   <Text style={{fontSize:30}}>☝🏽</Text>
                 </View>
               </View>
          </View>

          {/* < TouchableOpacity
                onPress={() => {
                  navigation.navigate("OtpScreen");
                }}style={{ paddingHorizontal: 40, paddingVertical: 30 }}>
            <View style={styles.btnStyle}>
              <View 
                style={{
                  paddingVertical: 10,
                }}
              >
                <Text style={styles.btnText}>Yes Please</Text>
             </View>
            </View>
            </TouchableOpacity>
            <View style={{ paddingVertical: 20 }}>
              <Text style={styles.textLast}>Not right now, maybe later</Text>
            </View> */}
            
        </View>
        </SafeAreaView>     
    </>
  );
};

const styles = StyleSheet.create({

  Container: {
   // marginTop:100,
    justifyContent: "center",
    margin: 0,
    width: "100%",
    height: '100%',
    paddingHorizontal:20,
    alignSelf:'center',
    
  },
  Heading: {
    color: "#BCB8B8",
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 20,
  },
  AlertContainer: {
    borderRadius: 2,
    justifyContent: "center",
    borderColor: "#D8D8D8",
    borderWidth: 2,
  },
  alertBox1: {
    flex: 1,
    flexShrink: 0,
    paddingVertical: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#D8D8D8",
    borderBottomColor: "transparent",
    borderWidth: 2,
  },
  alertBox2: {
    flex: 1,
    flexShrink: 0,
    paddingVertical: 10,
    borderLeftColor: "#D8D8D8",
    borderRightColor: "transparent",
    borderTopColor: "#D8D8D8",
    borderBottomColor: "transparent",
    borderWidth: 2,
  },
  alertText: {
    color: "#0084FF",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
  },
  textLast: {
    color: "#D8D8D8",
    textAlign: "center",
    fontSize: 16,
  },
  btnStyle: {
    
    backgroundColor: "green",
    borderRadius: 26,
    backgroundColor: "green",
    justifyContent: "center",
  },
});

export default NotificationScreen;
