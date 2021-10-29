import React from 'react';
import {
  ImageBackground,
} from 'react-native';
import {useState, useEffect} from 'react';
import { View } from 'react-native';
import SplashScreenImg from '../../../assets/Images/Splash.jpg';
//Firebase
//import {firebase} from '@react-native-firebase/auth';

//redux
//import {fetchStores} from '../../store/action /getallStoresAction';
//import {connect} from 'react-redux';

const SplashScreen = ({navigation}) => {
    useEffect(() => {

       
     // fetchStores()
      setTimeout(() => {
        // var user = firebase.auth().currentUser;
        // if (user) {
          //  navigation.navigate('onBoarScreen'); 
          // navigation.navigate('UserName');
          // navigation.navigate('AddMoneyScreen');
        //  navigation.navigate('TabBar');
        // }
        // // User is signed in.
        // else {
        //   navigation.navigate('onBoarScreen');
        //   // No user is signed in.
        // }
      }, 2000);
    }, []);
  
    return (
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
        }}
        source={SplashScreenImg}></ImageBackground>
    );
  };
 
  
  export default SplashScreen;
  