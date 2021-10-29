// Imported Libraries
import * as React from 'react';
//import {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import OnBoarScreen from '../AppIntro/OnBoardScreen'
import LoginScreen from '../../screens/LoginScreen/LoginScreen'
import PhoneLogin from '../../screens/LoginScreen/PhoneLogin'
import OtpScreen from '../../screens/LoginScreen/OtpScreen'
import UserName from '../../screens/LoginScreen/UserName'
import UserEmail from '../../screens/LoginScreen/UserEmail'
import NotificationScreen from '../AppIntro/NotificationScreen'

//Function for Stack Navigator
const AppIntroStack = ({ navigation, routeName }) => {

  const IntroStack = createStackNavigator();
  const Stack = createStackNavigator();



  const AppIntroStackFun = () => {
    return (
        <IntroStack.Navigator
        initialRouteName={routeName}
        screenOptions={{
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
          headerShown: false
        }}>
               <IntroStack.Screen
                name="onBoarScreen"
                component={OnBoarScreen}
                options={{
                  headerShown: false,
                }}/>
              <IntroStack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
              <IntroStack.Screen
              name="PhoneLogin"
              component={PhoneLogin}
              options={{
                headerShown: false,
              }}
            />
             <IntroStack.Screen
              name="OtpScreen"
              component={OtpScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="UserName"
              component={UserName}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="UserEmail"
              component={UserEmail}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
              name="TabBar"
              component={TabBar}
              options={{
                title: 'Gift table',
                headerStyle: {
                  backgroundColor: 'transparent',
                },
                headerShown: true,
              }}
            /> */}
        </IntroStack.Navigator>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <AppIntroStackFun />
      </NavigationContainer>
    </>
  );
}

export default AppIntroStack;
