import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {strings} from '../../../Utility';
import {moderateScale, verticalScale} from '../../../Scaling_utils';
import AppIntroSlider from 'react-native-app-intro-slider';
import DefaultPreference from 'react-native-default-preference';
const slides = [
  {
    id: 1,
    title: strings.Title,
    text: strings.Text,
    text: strings.Text,
    image: require('../AppIntro/images/Slider1.png'),
    bg:'#FFDD5F',
    height: verticalScale(150),
    width: moderateScale(200),
   
  },
  {
    id: 2,
    title: strings.Title2,
    text: strings.Text2,
    image: require('../AppIntro/images/Slider2.png'),
    bg:'#CED25A',
    height: verticalScale(170),
    width: moderateScale(200),
  },
  {
    id: 3,
    title: strings.Title3,
    text: strings.Text3,
    image: require('../AppIntro/images/Slider3.png'),
    bg:'#97CCDE',
    height: verticalScale(179),
    width: moderateScale(250),
  },
];

const App = ({navigation}) => {
  const DotButton = () => {
    return (
      <View
        style={{
          backgroundColor: 'black',
        }}></View>
    );
  };

  const Logo =()=>{
      return(
          <View>
              <Text style={{textAlign:'center',paddingBottom:100,
                fontSize:20,fontWeight:'bold'
            }}>stiicky</Text>
          </View>
      )
  }

  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.bg,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
            <View>
                <Logo/>
            </View>
        
        <Image 
        style={{
          height: item.height,
          width: item.width,
          }}
          source={item.image}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: verticalScale(22),
            color: '#303C42',
            marginHorizontal: 50,
            fontFamily:'BarlowSemiCondensed-Black',
            paddingVertical: 29,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            textAlign: 'center',
            alignItems: 'flex-end',
            marginHorizontal: 40,
            fontFamily:'BarlowSemiCondensed-ExtraLight',
            bottom:60,
          }}>
          {item.text}
        </Text>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.text}>{strings.Next}</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View>

      <TouchableOpacity style={styles.buttonCircle}
      onPress={()=>{
          DefaultPreference.get('notificationOpen').then(function (value) {
            if (value == 'Yes') {
              navigation.navigate('LoginScreen');
            }
            else
            {
              navigation.navigate('NotificationScreen');
            }
          });
      }}
      >
      <Text style={styles.text}>{strings.Next}</Text>
      </TouchableOpacity>
        </View>
    );
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',}}>
        
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          showDoneButton={true}
          dotStyle={{backgroundColor: '#7A7A7A', marginHorizontal: 5}}
          dotClickEnabled={false}
          showSkipButton={false}
          renderNextButton={_renderNextButton}
          activeDotStyle={{backgroundColor: '#303C42'}}
          renderDoneButton={_renderDoneButton}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 320,
    //   marginVertical: 32,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  },
  buttonCircle: {
    width: 110,
    height: 40,
    backgroundColor: '#303C42',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
