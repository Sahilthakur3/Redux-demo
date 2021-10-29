import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, TextInput ,Image} from "react-native";
import DefaultPreference from 'react-native-default-preference';
import { WebView } from 'react-native-webview';
import { flex } from "styled-system";

const StickerTab = () => {
  const [hideImage, sethideImage] = useState(true)
 
 

  return (


    
    <View style={{ flex: 1,  }}>
  
  
<View style={{
       backgroundColor:"white"
     }}>
     <Text style ={{
     alignSelf:"center",
     marginTop:40,
     marginBottom:10 ,
     color:"#7a7a7a",
     fontSize:15,
     fontWeight:"500",
     fontFamily: "BarlowSemiCondensed-Regular",
     
  
  }}>
     Stickers
   </Text>

     </View>
     <View style={{
       //justifyContent:"center",
       //alignItems:"center",
       flex:1
     }}>
       
       
       <WebView style={{
        marginTop: 0,
        flex: 1
      }} source={{ uri: "http://shop.stiicky.com/" }}>

      </WebView>
     </View>
    
     

      
    </View>
  );
};

export default StickerTab;
