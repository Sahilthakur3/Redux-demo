import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {strings} from '../../../Utility';



const ReceiptScreen = ({navigation}) => {
    return (
        <View style={{flex:1,backgroundColor:'#F2F2F2'}}>
             <View style={{marginVertical: 50,}}>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
             onPress={()=>{
              navigation.goBack();
            }}style={{height: 35, width: 35, alignItems: 'center',justifyContent:"center"}}>
          <Image
            source={require('../../../assets/Images/Back.png')}
            style={{width: 13, height: 12,}}
            resizeMode="contain"
          />
          </TouchableOpacity>
          <Text style={{color: '#7A7A7A', fontSize: 14,}}>
          Receipt
          </Text>
          <TouchableOpacity style={{height: 35, width: 35, alignItems: 'center',justifyContent:"center"}}>
          <Image
              source={require('../../../assets/Images/infoicon.png')}
              style={{width: 18, height: 18}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
    <View style={{alignItems:'center'}}>
    <View
        style={{backgroundColor:'#FFFFFF',marginTop:50,width:320,height:240,borderRadius:20}}>
           <View style={{marginHorizontal:30,marginVertical:40}}>
           <Text style={{fontSize:15,fontWeight:"700"}}>{strings.Logo}</Text>
           <Text style={{marginHorizontal:55,bottom:18,fontSize:15,}}>{strings.receipt}</Text>
           <Text  style={{marginVertical:20,fontSize:12}}>{strings.PaymentScreenText}</Text>
           <Text  style={{marginVertical:10,fontSize:12}}>31 18 00 19 {strings.viaMobilePay}</Text>
           <Text  style={{marginVertical:15,fontSize:12,fontWeight:"600"}}>Amount paid DKK 300.00.</Text>
           </View>
        </View>
    </View>
      </View>
      <View style={{alignItems:'center' ,marginTop:350}}>
          <TouchableOpacity 
          style={{
            width: 321,
            height: 40,
            backgroundColor: '#303C42',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
            <Text style={{color:'#F5F5F5',fontWeight:"500",fontSize:16}}>{strings.PaymentScreenShowButoonText}</Text>
          </TouchableOpacity>
      </View>
        </View>
    )
}

export default ReceiptScreen
