import React,{useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { strings } from "../../../Utility";
import { moderateScale, verticalScale } from "../../../Scaling_utils";
import LottieView from 'lottie-react-native';

const SkipScreen = ({ navigation, route }) => {

  useEffect(() => {
    animation.current.play()
}, [])
  let animation = React.createRef();
      function strt (){
        animation.current.play(1)
          console.log(play)
      }
  return (
   // <ImageBackground 
    //  style={{ flex: 1, justifyContent: "flex-end" }}
    //  source={require("../../../assets/Images/bgimg.jpg")}
     // resizeMode="stretch"
  //  >
      <View style={{
flex:1
      }}>
         <LottieView 
         resizeMode="cover"
           ref={animation}
           onAnimationFinish={()=>{}}
            style={{
            flex:1
               
            }} source={require("../../../assets/Images/birthday.json")}
            autoPlay={false}
            
             //autoPlay={play} 
             //loop={false} 
             />
             <View style={{flex:1,
               justifyContent:"space-between",
               flexDirection:"column"
             }}>
               <View></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'space-evenly',
            paddingBottom: 25
          }}
         >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >

            <Image
              source={require("../../../assets/Images/backbutton.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("DistinationsScreen", { edit: false , BackGroundIndex: route.params.BackGroundIndex });
            }}
          >
            <Text style={styles.text}>{strings.Continue}</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>

   // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32B9AF",
  },
  text: {
    color: "#F5F5F5",
    fontSize: 14,
    textAlign: "center",
  },
  BoldText: {
    color: "#F5F5F5",
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    color: "#F5F5F5",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 110,
    padding: verticalScale(10),
    backgroundColor: "#303C42",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SkipScreen;
