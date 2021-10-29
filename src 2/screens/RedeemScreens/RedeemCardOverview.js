
import React, { useState, useEffect } from 'react';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import DefaultPreference from 'react-native-default-preference';
import { utils } from '@react-native-firebase/app';
import Videos from 'react-native-video';
import { stat } from 'react-native-fs';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput, ScrollView, ActivityIndicator
} from 'react-native';
import { strings } from '../../../Utility';
import * as Progress from 'react-native-progress';
import { moderateScale, verticalScale } from "../../../Scaling_utils";
import { useIsFocused } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';


const RedeemCardOverview = ({ navigation, route }) => {
  const screenIsFocused = useIsFocused();
  const [Video, setVideo] = useState(null)
  const [Videopath, setvideopath] = useState("")

  const [on, seton] = useState(true)
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  const [text, settext] = useState("")
  const [money, setMoney] = useState("")
  const [ToName, setToName] = useState("")
  const [FromName, setFromName] = useState("")
  const [isImage, setisImage] = useState()
  const [imagePath, setimagePath] = useState(null)
  const [VoucherIndex, setVoucherIndex] = useState()
  const [opacty, setopacty] = useState(0)
  const [Docid, setDocid] = useState("")


  const onLoadStart = () => {
    setopacty(1)

  }

  const onLoad = () => {
    setopacty(0)

  }
  useEffect(() => {
    //ReadData()
    setVideo(route.params.item.VideoPath)
    setMoney(route.params.item.Amount)
    setToName(route.params.item.To)
    setFromName(route.params.item.From)
    settext(route.params.item.GreetingText)
    setisImage(route.params.item.isImage)
    setimagePath(route.params.item.ImagePath)
    setVoucherIndex(route.params.item.Voucherindex)
    setDocid(route.params.item.Docid)
  }, [navigation]);



  // function ReadData() {

  //   firestore()
  //     .collection('Cards')
  //     .where('NFCid', '==', route.params.nfcID)
  //     //.where('NFCid', '==', "1234")
  //     .get()
  //     .then(querySnapshot => {

  //       if (querySnapshot.size > 0) {
  //         querySnapshot.forEach(documentSnapshot => {
  //           setVideo(documentSnapshot.data().VideoPath)
  //           setMoney(documentSnapshot.data().Amount)
  //           setToName(documentSnapshot.data().To)
  //           setFromName(documentSnapshot.data().From)
  //           settext(documentSnapshot.data().GreetingText)
  //           setisImage(documentSnapshot.data().isImage)
  //           setimagePath(documentSnapshot.data().ImagePath)
  //           setVoucherIndex(documentSnapshot.data().Voucherindex)
  //           setDocid(documentSnapshot.data().Docid)
  //           //DefaultPreference.set('Money', documentSnapshot.data().Amount).then(function () {
  //           //})
  //         });
  //       }

  //     })

  // }

  function SaveCard() {
    const user = firebase.auth().currentUser;
    firestore()
      .collection('Cards')
      .doc(Docid)
      .update({
        Toid: user.uid
      })
      .then(() => {
        navigation.navigate('Home');
        console.log("card updated")
      });
  }
  return (

    <ScrollView contentContainerStyle={{
      flex: 1,
      backgroundColor: '#FAFAFA',
      justifyContent: 'space-around'
    }}>
      <View style={{ paddingTop: 25, }}>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20
          }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
            <Image
              source={require('../../../assets/Images/Back.png')}
              style={{ width: 23, height: 23, }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text

            style={{ color: '#7A7A7A', fontSize: 14, }}>
            {strings.UserCardsProgresbarTitle}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Info")}
            style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
            <Image
              source={require('../../../assets/Images/infoicon.png')}
              style={{ width: 23, height: 23, }}
              resizeMode="contain"
            />
          </TouchableOpacity>

        </View>
        <View style={{ alignItems: 'center', }}>
          <Progress.Bar
            progress={1}
            width={150}
            color={'#7A7A7A'}
            height={1}
            borderWidth={0.35}
          />
        </View>
      </View>
      <View style={{ paddingTop: 1, }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            borderRadius: 50,
          }}>
          <View>

            <Videos source={{ uri: Video ? Video : null }}   // Can be a URL or a local file.
              style={{ width: RFValue(150), height: RFValue(270), borderRadius: 20 }}
              controls={false}
              paused={false}
              onVideoBuffer
              onLoadStart={onLoadStart}
              onLoad={onLoad}
              ref={(ref) => {
                this.player = ref
              }}
            />
            <View style={{
              height: RFValue(270),
              marginTop: RFValue(-270),
              width: RFValue(150),
              justifyContent: "center"
            }}>
              <ActivityIndicator
                animating
                size="large"
                color="black"
                style={{
                  opacity: opacty,
                  alignSelf: "center"
                  //marginTop:-230,
                  //height:RFValue(270)
                }}
              />
            </View>

          </View>
          <View style={{
            justifyContent: "space-between",

          }}>
            <View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("VoucherOverView", { VoucherIndex: VoucherIndex })
                }}
                style={{
                  width: 140,
                  height: RFValue(126),
                  borderRadius: 20,
                  backgroundColor: '#32B9AF',
                  //marginVertical: 20,,
                  marginBottom: RFValue(20),
                  justifyContent: "center"
                }}>
                <Text style={styles.CardText1}>
                  {strings.RedeemVouncherText}
                </Text>
                <Text style={styles.CardTextLogo}>{strings.Logo}</Text>
              </TouchableOpacity>
              {on ? <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RedeemPayment', { Money: money });
                }}
                style={{
                  width: 140,
                  height: RFValue(126),
                  borderRadius: 20,
                  backgroundColor: '#32B9AF',
                  justifyContent: "center"
                }}>

                <Text style={styles.CardText1}>{strings.UserCardsText3}</Text>
                <Text style={styles.CardText2}>{money} Kr.</Text>
              </TouchableOpacity> : null}
            </View>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', }}>
          <Text style={styles.title}>{strings.DestinationTitle}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{

            }}>



              <Text style={{
                color: "#303C42",
                fontSize: 20,
                marginBottom: 20
              }}>
                {ToName}
              </Text>
            </View>

          </View>
          <Text style={styles.title}>{strings.DestinationTitle2}</Text>
          <View
            style={{
              //flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{
              //marginLeft: 25,
            }}>

              <Text style={{
                color: "#303C42",
                fontSize: 20,
              }}>
                {FromName}
              </Text>
            </View>

          </View>
        </View>
      </View>

      <View style={{ alignItems: 'center', width: "100%", }}>
        <View
          style={{
            width: 320,
            //height:100,
            paddingHorizontal: 20,
            borderRadius: 20,
            paddingBottom: 120,
            backgroundColor: '#F2F2F2',
            alignSelf: "center"
          }}>

          <Text
            style={{
              textAlign: 'center',
              color: '#000000',
              fontSize: 14,
              top: 20

            }}>
            {text}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingBottom: 10
        }}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => { SaveCard() }
          }>
          <Text style={styles.Buttontext}>{strings.SaveandClose}</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-around'
  },

  title: {
    color: '#303C42',
    textAlign: 'center',
    fontFamily: 'BarlowSemiCondensed-Regular',
    fontSize: 20,

  },
  titleTo: {
    color: '#303C42',
    textAlign: 'center',
    fontFamily: 'BarlowSemiCondensed-Regular',
    fontSize: 28,
  },

  CardText1: {
    textAlign: 'center',
    color: '#F5F5F5',
    fontSize: 15,
    fontWeight: "600"
    // paddingTop: 15
  },
  CardText2: {
    textAlign: 'center',
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '800',
  },
  CardTextLogo: {
    textAlign: 'center',
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '800',
    //top: 12
  },
  EditButtonName: {
    height: 28,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  EditButtonCardBottom: {
    height: 15,
    width: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8D8D8',
    borderRadius: 20,
    position: 'absolute',
  },

  TextInput: {
    color: '#303C42',
    fontSize: 20,
  },
  Buttontext: {
    color: '#F2F2F2',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 90,
    backgroundColor: '#303C42',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default RedeemCardOverview
