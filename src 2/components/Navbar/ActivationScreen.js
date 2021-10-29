import React from 'react'
import { View, Text,Image} from 'react-native'


const ActivationScreen = () => {
    return (
        <View style={{flex:1,backgroundColor:'#CED25A',alignItems:'center',}}>
            <Text style={{marginVertical:50,color:"#CED25A",fontSize:15,fontWeight:'500',textAlign:'center'}}>Completed</Text>
            <View style={{alignItems:'center',justifyContent:"center",marginVertical:110}}>
                <Text style={{marginVertical:30,color:"#303C42",fontSize:28,fontWeight:'400',textAlign:'center'}}>Payment completed</Text>
            <Image
            source={require('../../../assets/Images/PayConfirm.png')}
            style={{width: 290, height: 286}}
            resizeMode="stretch"
          />
            </View>
        </View>
    )
}

export default ActivationScreen
