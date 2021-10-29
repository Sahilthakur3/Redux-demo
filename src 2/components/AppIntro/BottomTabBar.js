import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, HeaderBackground } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PrivacyPolicy from '../Navbar/PrivacyPolicy'
import Term from '../Navbar/Term'

//HomeTabBar
import HomeTab from "../../components/Navbar/HomeTab";
import GiftTab from "../../components/Navbar/GiftTab";
import ProfileTab from "../../components/Navbar/ProfileTab";
import StickerTab from "../../components/Navbar/StickerTab";
//OtherScreen
import SplashScreen from "../AppIntro/SplashScreen";
import ActivationScr from "../../components/Navbar/ActivationScr";
import StickerScreen from "../../components/Navbar/StickerScreen";
import AddMoneyScreen from "../../components/Navbar/AddMoneyScreen";
import PaymentShowScreen from "../../components/Navbar/PaymentShowScreen";

import UserCards3 from "../../components/Navbar/UserCards3";

import ReceiptScreen from "../../components/Navbar/ReceiptScreen";
import WritingText from "../../components/Navbar/WritingText";
import PaymentScreen from "../../components/Navbar/PaymentScreen";
import ActivationScreen from "../../components/Navbar/ActivationScreen";
import PaymentActivate from "../../components/Navbar/PaymentActivate";
import GiftSticker from "../../components/Navbar/GiftSticker";
import GiftSticker2 from "../../components/Navbar/GiftSticker2";

import DistinationsScreen from "../../components/Navbar/DistinationsScreen";

import SkipScreen from "../../components/Navbar/SkipScreen";



//ProfileTab

import EditName from "../../Screen2/EditName";
import EditMobile from "../../Screen2/EditMobile";
import EditOtp from "../../Screen2/EditOtp";
import EditMail from "../../Screen2/EditMail";
import Preview from "../Navbar/Preview";
import Preview2 from "../Navbar/Preview2";
import PaymentCompleted from "../Navbar/PaymentCompleted";
import Notifications from "../Navbar/Notifications";
import PaymentFromProfile from "../Navbar/PaymentFromProfile";

import VideoScreen from "../Navbar/VideoScreen";
import VideoEdit from "../Navbar/VideoEdit";
import CountDownScreen from "../../screens/RedeemScreens/CountDownScreen";
import Redeem from "../../screens/RedeemScreens/Redeem";
import GreetingVideo from "../../screens/RedeemScreens/GreetingVideo";
import RedeemCardOverview from "../../screens/RedeemScreens/RedeemCardOverview";
import RedeemPayment from "../../screens/RedeemScreens/RedeemPayment";
import RedeemPaymentCompleted from "../../screens/RedeemScreens/RedeemPaymentCompleted";
import VoucherScreen from "../Navbar/VoucherScreen";
import VoucherOverView from "../../screens/RedeemScreens/VoucherOverView";
import Info from "../Navbar/Info";



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabBar = ({ navigation }) => {
  const LoggedStack = () => {
    function left() {
      return (
        <View>
          <TouchableOpacity style={{ justifyContent: "center" }}
            onPress={() => navigation.navigate("Preview2")}
          //style={{ height: 25, width: 20, alignItems: "center" }}
          >
            <Image
              source={require("../../../assets/Images/Back.png")}
              style={{ width: 13, height: 12 }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
      )
    };
    return (
      <Stack.Navigator
        //initialRouteName={SplashScreen}
        screenOptions={{
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerShown: false,
        }}>
        <Stack.Screen
          name="TabBar"
          component={TabBar}
          options={{
            headerTintColor: "red",
            headerShown: false,
            gestureEnabled: false
            // headerTitle: ' hrll',
            // headerStyle: {backgroundColor:'red'},
            // headerTransparent: true,


          }}
        />
        <Stack.Screen
          name="ActivationScr"
          component={ActivationScr}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="StickerScreen"
          component={StickerScreen}
          options={{
            headerShown: true,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="DistinationsScreen"
          component={DistinationsScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="AddMoneyScreen"
          component={AddMoneyScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="PaymentShowScreen"
          component={PaymentShowScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="CountDown"
          component={CountDownScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        
       
        <Stack.Screen
          name="UserCards3"
          component={UserCards3}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="ReceiptScreen"
          component={ReceiptScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
       
        <Stack.Screen
          name="WritingText"
          component={WritingText}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="EditVideo"
          component={VideoEdit}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
            // headerLeft:left,
            // headerLeftContainerStyle:{marginLeft:20,},
            // title:"Regards",
            // headerTintColor:"grey",
            // headerStyle:{
            //   backgroundColor:"#F2F2F2",

            // },
            // headerTitleStyle:{color: "#7A7A7A", fontSize: 14,fontWeight:"500"}
          }}
        />
        <Stack.Screen
          name="ActivationScreen"
          component={ActivationScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="PaymentActivate"
          component={PaymentActivate}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />

        <Stack.Screen
          name="GiftSticker"
          component={GiftSticker}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />

        <Stack.Screen
          name="GiftSticker2"
          component={GiftSticker2}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
       

        
        
        
        <Stack.Screen
          name="VideoScreen"
          component={VideoScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />

        
        <Stack.Screen
          name="SkipScreen"
          component={SkipScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />

        <Stack.Screen
          name="EditName"
          component={EditName}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="EditMobile"
          component={EditMobile}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="EditMail"
          component={EditMail}
          options={{
            headerTransparent: true,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Redeem"
          component={Redeem}
          options={{
            headerTransparent: true,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="RedeemCardOverview"
          component={RedeemCardOverview}
          options={{
            headerTransparent: true,
            gestureEnabled: false
          }}
        />
         <Stack.Screen
          name="VoucherOverView"
          component={VoucherOverView}
          options={{
            headerTransparent: true,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Info"
          component={Info}
          options={{
            headerTransparent: true,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="VoucherScreen"
          component={VoucherScreen}
          options={{
            headerTransparent: true,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="RedeemPayment"
          component={RedeemPayment}
          options={{
            headerTransparent: true,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="RedeemPaymentCompleted"
          component={RedeemPaymentCompleted}
          options={{
            headerTransparent: true,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="GreetingVideo"
          component={GreetingVideo}
          options={{
            headerTransparent: true,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="EditOtp"
          component={EditOtp}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Term"
          component={Term}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Preview"
          component={Preview}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Preview2"
          component={Preview2}

          options={{
            //headerTintColor:"red",
            // headerLeft:aa,
            headerShown: false,
            gestureEnabled: false
            //  headerRight:aa,
            //  title:"fhg",
            // headerRight:"hgdhg",
            // headerLeftContainerStyle:{backgroundColor:"grey",marginTop:10},


          }}
        />
        <Stack.Screen
          name="PaymentCompleted"
          component={PaymentCompleted}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />

        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
       
        <Stack.Screen
          name="PaymentFromProfile"
          component={PaymentFromProfile}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
      </Stack.Navigator>
    );
  };

  //Supporting BottomTabS
  const TabBar = () => {
    return (
      <Tab.Navigator
        //initialRouteName={'Home'}

        tabBarOptions={{

          showLabel: false,
          headerShown: true,

          style: {
            position: "absolute",
            backgroundColor: "#FFFFFF",
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            height: 90,
            shadow: "2px 10px 30px",
          },
        }}
      >
        <Tab.Screen
          name="Home"

          // listeners={({ navigation }) => ({
          //   blur: () => navigation.setParams({ screen: HomeTab })
          // })}
          component={HomeTab}
          options={{ headerShown: true, unmountOnBlur: true.valueOf, }}
          options={{
            gestureEnabled: false,
            tabBarIcon: ({ focused }) => (

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  resizeMode="contain"
                  source={require("../../../assets/Images/homeIcon.png")}
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: focused ? "#303C42" : "#DADADA",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#303C42" : "#DADADA",
                    fontFamily: "BarlowSemiCondensed-Regular",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="GiftTab"
          // listeners={({ navigation }) => ({
          //   blur: () => navigation.setParams({ screen: GiftTab }),
          // })}
          component={GiftTab}
          options={{
            unmountOnBlur: true,
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: focused ? "#303C42" : "#DADADA",
                  }}
                  source={require("../../../assets/Images/gifts.png")}
                />
                <Text
                  style={{
                    color: focused ? "#303C42" : "#DADADA",
                    fontFamily: "BarlowSemiCondensed-Regular",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  Gavebord
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          // listeners={({ navigation }) => ({
          //   blur: () => navigation.setParams({ screen: StickerTab }),
          // })}
          name="StickerTab"
          component={StickerTab}

          options={{
            unmountOnBlur: true,
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: focused ? "#303C42" : "#DADADA",
                  }}
                  source={require("../../../assets/Images/stickers.png")}
                />
                <Text
                  style={{
                    color: focused ? "#303C42" : "#DADADA",
                    fontFamily: "BarlowSemiCondensed-Regular",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  Stickers
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          // listeners={({ navigation }) => ({
          //   blur: () => navigation.setParams({ screen: ProfileTab }),
          // })}
          name="ProfileTab"
          component={ProfileTab}
          options={{
            unmountOnBlur: true,

            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused ? "#303C42" : "#DADADA",
                  }}
                  source={require("../../../assets/Images/profile.png")}
                />
                <Text
                  style={{
                    color: focused ? "#303C42" : "#DADADA",
                    fontFamily: "BarlowSemiCondensed-Regular",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}>
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <LoggedStack />
      </NavigationContainer>
    </>
  );
};
export default BottomTabBar;
