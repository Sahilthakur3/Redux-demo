// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   Platform,
// } from "react-native";
// import { verticalScale } from "../../../Scaling_utils";
// import OTPInputView from "@twotalltotems/react-native-otp-input";
// import { CountDownText } from "react-native-countdown-timer-text";
// import { strings } from "../../Utility";
// import LoaderModel  from "../components/AppIntro/LoaderModel";
// //Imported Firebase Libraries
// import auth from "@react-native-firebase/auth";
// import { firebase } from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";

// const EditOtp = ({ route, navigation }) => {
//   const [confirm, setConfirm] = useState(null);
//   const [enteredNum, setenteredNum] = useState(route.params.formattedNumber);
//   const [isLoding, setIsLoading] = useState(false);
//   //ResendOtp-Button State
//   const [resendOtp, setresendOtp] = useState(true);

//   useEffect(() => {
//     updatePhoneNumber(route.params.formattedNumber);
//   }, []);

//   const CheckOtp = (number) => {
//     updatePhoneNumber(number);
//   };

//   async function updatePhoneNumber(number) {
//     try {
//       setIsLoading(true);
//       const confirmation = await auth().updatePhoneNumber(number);
//       if (confirmation) {
//         setIsLoading(false);
//         setresendOtp(true);
//         setConfirm(confirmation);
//       }
//     } catch (err) {
//       setIsLoading(false);
//       console.log("Check Exist Error2 - " + err.message);
//       console.log("error Code - " + err.code);
//       if (err.code === "missing-phone-number") {
//         showAlert("Sticky", "Missing Phone Number.");
//       } else if (err.code === "auth/invalid-phone-number") {
//         showAlert("Sticky", "Invalid Phone Number.");
//       } else if (err.code === "auth/quota-exceeded") {
//         showAlert("Sticky", "SMS quota exceeded.Please try again later.");
//       } else if (err.code === "auth/too-many-requests") {
//         showAlert(
//           "Sticky",
//           "We have blocked all requests from this device due to unusual activity. Try again later."
//         );
//       } else {
//         showAlert(
//           "Sticky",
//           "Unexpected Error Occured. Please contact support."
//         );
//       }
//     }
//   }
//   //Conformation Code form Firebase Function
//   async function confirmCode(code) {
//     if (!firebase.auth().currentUser || firebase.auth().currentUser == null) {
//       setIsLoading(true);
//       confirm
//         .confirm(code)
//         .then((user) => {
//           CheckUser();
//         })
//         .catch((error) => {
//           setIsLoading(false);
//           showAlert("TapChats", error.message);
//         });
//     } else {
//       CheckUser();
//     }
//   }

//   function CheckUser() {
//     const user = firebase.auth().currentUser;
//     firestore()
//       .collection("Users")
//       .where("uid", "==", user.uid)
//       .get()
//       .then((querySnapshot) => {
//         if (querySnapshot.size == 0) {
//           AddUserData();
//         } else {
//           // querySnapshot.forEach(doc => {

//           // });
//           setIsLoading(false);
//           navigation.navigate("TabBar");
//         }
//       });
//   }

//   //Adding User
//   function AddUserData() {
//     const user = firebase.auth().currentUser;
//     //var DD = UpdatedNumber;
//     firestore()
//       .collection("Users")
//       .doc(user.uid)
//       .set({
//         phoneNumber: route.params.number,
//         uid: user.uid,
//         callingCode: route.params.code,
//         countryCode: route.params.countryCode,
//         formattedNumber: route.params.formattedNumber,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//         login_type: "PhoneNumber",
//         Status: "Active",
//         Device: Platform.OS === "ios" ? "iPhone" : "Android",
//       })
//       .then(() => {
//         navigation.navigate("UserName");
//       });
//   }
//   const showAlert = (title, msg) => {
//     Alert.alert(
//       title,
//       msg,
//       [
//         {
//           text: "Ok",
//           style: "cancel",
//         },
//       ],
//       {
//         cancelable: true,
//       }
//     );
//   };

//   //Resend Otp Function
//   function OtpResendTimer() {
//     //setenableResendBut(true);
//     setresendOtp(false);
//   }
//   function RecivedOtp(code) {
//     confirmCode(code);
//   }

//   return (
//     <View style={styles.container}>
//       <View style={{ marginVertical: 40 }}>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "flex-start",
//             marginHorizontal: 20,
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => {
//               navigation.goBack();
//             }}
//             style={{ height: 25, width: 20, alignItems: "center" }}
//           >
//             <Image
//               source={require("../../assets/Images/Back.png")}
//               style={{ width: 13, height: 12 }}
//               resizeMode="stretch"
//             />
//           </TouchableOpacity>
//           <Text
//             style={{ color: "#7A7A7A", fontSize: 14, marginHorizontal: 110 }}
//           >
//             verification
//           </Text>
//         </View>
//       </View>
//       <View
//         style={{
//           marginHorizontal: 40,
//           alignItems: "center",
//         }}
//       >
//         <Text style={styles.text}>{strings.OtpText}</Text>
//         <Text style={styles.BoldText}>{enteredNum}</Text>
//       </View>
//       <Text style={styles.title}>{strings.EditOtpTitle}</Text>
//       <View style={{ alignItems: "center", justifyContent: "center" }}>
//         <OTPInputView
//           style={{ width: "50%", height: 60 }}
//           pinCount={6}
//           autoFocusOnLoad
//           codeInputFieldStyle={styles.underlineStyleBase}
//           codeInputHighlightStyle={styles.underlineStyleHighLighted}
//           onCodeFilled={(code) => {
//             RecivedOtp(code);
//           }}
//         />
//       </View>
//       {!isLoding ? (
//         <View>
//           <View style={{ alignItems: "center", paddingTop: 80 }}>
//             <TouchableOpacity
//               disabled={resendOtp}
//               onPress={() => {
//                 //if (resendOtp) {
//                 let Newnumber = "+" + route.params.code + route.params.number;
//                 CheckOtp(Newnumber);
//                 // }
//               }}
//               style={{ borderBottomColor: "#303C42", borderBottomWidth: 1 }}
//             >
//               <Text
//                 style={{
//                   color: "#000000",
//                   fontSize: 15,
//                   fontFamily: "BarlowSemiCondensed-Regular",
//                 }}
//               >
//                 {resendOtp ? (
//                   <CountDownText
//                     style={styles.cd}
//                     countType="date"
//                     auto={true}
//                     afterEnd={() => {
//                       OtpResendTimer();
//                     }}
//                     timeLeft={60}
//                     step={-1}
//                     intervalText={(date, hour, min, sec) =>
//                       strings.SendNewCode + " " + min + ":" + sec
//                     }
//                   />
//                 ) : null}
//                 {resendOtp ? "" : "Send New Code"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : null}
//       {/* <View style={{alignItems: 'center'}}>
//         <TouchableOpacity
//               disabled={resendOtp}
//               onPress={() => {
//               //if (resendOtp) {
//               let Newnumber = '+' + route.params.code + route.params.number;
//               CheckOtp(Newnumber);
//               // }
//                 }}
//           // onPress={() => {
//           //   navigation.navigate('UserName');
//           // }}
//           style={styles.button}>
//           <Text style={styles.Buttontext}>{strings.phoneInputButton}</Text>
//         </TouchableOpacity>
//       </View> */}

// {isLoding ? <LoaderModel /> : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FAFAFA",
//     flex: 1,
//   },
//   borderStyleHighLighted: {
//     borderColor: "#948791",
//   },
//   button: {
//     width: 320,
//     height: 40,
//     backgroundColor: "#F2F2F2",
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   Buttontext: {
//     color: "#DCDCDC",
//     fontWeight: "bold",
//     fontFamily: "BarlowSemiCondensed-Regular",
//     fontSize: 14,
//     textAlign: "center",
//   },
//   text: {
//     color: "#000000",
//     fontSize: 14,
//     textAlign: "center",
//     fontFamily: "BarlowSemiCondensed-Regular",
//   },
//   title: {
//     color: "#303C42",
//     textAlign: "center",
//     marginHorizontal: 0,
//     fontFamily: "BarlowSemiCondensed-Regular",
//     fontSize: 28,
//     paddingTop: 30,
//   },
//   BoldText: {
//     color: "#000000",
//     fontSize: 15,
//     fontWeight: "bold",
//     fontFamily: "BarlowSemiCondensed-ExtraLight",
//     textAlign: "center",
//   },
//   underlineStyleBase: {
//     width: 15,
//     height: 45,
//     borderWidth: 0,
//     borderBottomWidth: 2,
//     color: "#303C42",
//     fontFamily: "BarlowSemiCondensed-Bold",
//     fontSize: 20,
//   },
//   underlineStyleHighLighted: {
//     borderColor: "#948791",
//   },
//   cd: {
//     fontFamily: "BarlowSemiCondensed-Regular",
//   },
// });
// export default EditOtp;


import React, { useState, useEffect } from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet,ScrollView,  Alert,Platform, DeviceEventEmitter} from 'react-native';
import { verticalScale } from '../../../Scaling_utils';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as Progress from 'react-native-progress';
import DefaultPreference from 'react-native-default-preference';
import { CountDownText } from 'react-native-countdown-timer-text';
import {strings} from '../../Utility';
//import LoaderModel from '../../components/AppIntro/LoaderModel';
import LoaderModel from '../components/AppIntro/LoaderModel';
//Imported Firebase Libraries
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const EditOtp = ({route, navigation}) => {

  const [confirm, setConfirm] = useState(null);
  const [enteredNum, setenteredNum] = useState(route.params.formattedNumber);
  const [isLoding, setIsLoading] = useState(false);
  //ResendOtp-Button State
  const [resendOtp, setresendOtp] = useState(true);


  useEffect(() => {
    signInWithPhoneNumber(route.params.formattedNumber);
  }, []);

  const CheckOtp = (number) => {
    signInWithPhoneNumber(number);
  }

  async function signInWithPhoneNumber(number) {
    try {
      setIsLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(number);
      if (confirmation) {
        setIsLoading(false);
        setresendOtp(true);
        setConfirm(confirmation);
      }
    } catch (err) {
      setIsLoading(false);
      console.log('Check Exist Error2 - ' + err.message);
      console.log('error Code - ' + err.code);
      if (err.code === 'missing-phone-number') {
        showAlert('Sticky', 'Missing Phone Number.')
      } else if (err.code === 'auth/invalid-phone-number') {
        showAlert('Sticky', 'Invalid Phone Number.')
      } else if (err.code === 'auth/quota-exceeded') {
        showAlert('Sticky', 'SMS quota exceeded.Please try again later.')
      }
      else if (err.code === 'auth/too-many-requests') {
        showAlert('Sticky', 'We have blocked all requests from this device due to unusual activity. Try again later.')
      } else {
        showAlert('Sticky', 'Unexpected Error Occured. Please contact support.')
      }
    }
  }
  //Conformation Code form Firebase Function
  async function confirmCode(code) {
    setIsLoading(true);
    confirm
      .confirm(code)
      .then(user => {
        console.log('Checking User');
        CheckUser();
      })
      .catch(error => {
        setIsLoading(false);
        showAlert('Sticky', error.message)
      });
    
  }



  function CheckUser() {
    const user = firebase.auth().currentUser;
    console.log('User',user);
    firestore()
      .collection('Users')
      .where('uid', '==', user.uid)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size == 0) {
          console.log('No User');
        } else {
          
        }
      });
  }

  //Adding User
  function AddUserData() {
    const user = firebase.auth().currentUser;
    //var DD = UpdatedNumber;
    firestore()
      .collection('Users')
      .doc(user.uid)
      .update({
        phoneNumber: route.params.number,
        uid: user.uid,
        callingCode: route.params.code,
        countryCode: route.params.countryCode,
        formattedNumber: route.params.formattedNumber,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        login_type: 'PhoneNumber',
        Status: 'Active',
        Device: Platform.OS === 'ios' ? 'iPhone' :  'Android'
      })
      .then(() => {
        navigation.navigate('ProfileTab');
      });
  }
  const showAlert = (title, msg) => {
    Alert.alert(
      title,
      msg,
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  }

 //Resend Otp Function
 function OtpResendTimer() {
  //setenableResendBut(true);
  setresendOtp(false);
}
function RecivedOtp(code) {
  confirmCode(code);
}

  return (
      <View style={styles.container}>
      <View style={{marginVertical: 40}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{height: 35, width: 35, alignItems: 'center',justifyContent:"center"}}>
            <Image
              source={require('../../assets/Images/Back.png')}
              style={{ width: 23, height: 23, }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <Text style={{color: '#7A7A7A', fontSize: 14, marginVertical: 5}}>
            {strings.ProgressBarTitle}
          </Text>
          <TouchableOpacity
             onPress={()=>navigation.navigate("Info")}
            style={{height: 35, width: 35, alignItems: 'center',justifyContent:"center"}}>
            <Image
              source={require('../../assets/Images/infoicon.png')}
              style={{ width: 23, height: 23, }}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Progress.Bar
            progress={0.5}
            width={150}
            color={'#7A7A7A'}
            height={1}
            borderWidth={0.38}
          />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 40,
          alignItems: 'center',
        }}>
        <Text style={styles.text}>{strings.OtpText}</Text>
        <Text style={styles.BoldText}>{enteredNum}</Text>
      </View>
      <Text style={styles.title}>{strings.OtpTitle}</Text>
      <View style={{alignItems: 'center', justifyContent: 'center',}}>
        <OTPInputView
          style={{width: '50%', height: 60}}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
          RecivedOtp(code);
          }}
        />
      </View>
      {!isLoding ? <View>
      <View style={{alignItems: 'center', paddingTop: 80, }}>
        <TouchableOpacity
        disabled={resendOtp}
        onPress={() => {
          //if (resendOtp) {
            let Newnumber = '+' + route.params.code + route.params.number;
            CheckOtp(Newnumber);
         // }
        }}
  
          style={{borderBottomColor: '#303C42', borderBottomWidth: 1}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 15,
              fontFamily: 'BarlowSemiCondensed-Regular',
            }}>
            {resendOtp ? <CountDownText
              style={styles.cd}
              countType="date"
              auto={true}
              afterEnd={() => {
              OtpResendTimer()
              }}
              timeLeft={60}
              step={-1}
              intervalText={(date, hour, min, sec) =>
              strings.SendNewCode+ ' '
              + min + ':' + sec
              }
              />: null}
            {resendOtp ? '' : strings.SendNewOtp} 
          </Text>
        </TouchableOpacity>
      </View>
      </View> : null }
      {/* <View style={{alignItems: 'center'}}>
        <TouchableOpacity
              disabled={resendOtp}
              onPress={() => {
              //if (resendOtp) {
              let Newnumber = '+' + route.params.code + route.params.number;
              CheckOtp(Newnumber);
              // }
                }}
          // onPress={() => {
          //   navigation.navigate('UserName');
          // }}
          style={styles.button}>
          <Text style={styles.Buttontext}>{strings.phoneInputButton}</Text>
        </TouchableOpacity>
      </View> */}
      {isLoding ? <LoaderModel /> : null}
      </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  borderStyleHighLighted: {
    borderColor: '#948791',
  },
  button: {
    width: 320,
    height: 40,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  Buttontext: {
    color: '#DCDCDC',
    fontWeight: 'bold',
    fontFamily: 'BarlowSemiCondensed-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'BarlowSemiCondensed-Regular',
  },
  title: {
    color: '#303C42',
    textAlign: 'center',
    marginHorizontal: 0,
    fontFamily: 'BarlowSemiCondensed-Regular',
    fontSize: 28,
  paddingTop:30
  },
  BoldText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'BarlowSemiCondensed-ExtraLight',
    textAlign: 'center',
  },
  underlineStyleBase: {
    width: 15,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: '#303C42',
    fontFamily: 'BarlowSemiCondensed-Bold',
    fontSize: 20,
  },
  underlineStyleHighLighted: {
    borderColor: '#948791',
  },
  cd: {
    fontFamily: 'BarlowSemiCondensed-Regular',
  },
});
export default EditOtp;
