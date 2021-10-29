import React, { useState, useEffect } from 'react';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Videos from 'react-native-video';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput, ScrollView, LogBox, ActivityIndicator
} from 'react-native';
import { strings } from '../../../Utility';
import * as Progress from 'react-native-progress';
import { useIsFocused } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { LogLevel, RNFFmpegConfig, RNFFmpeg, RNFFprobe } from 'react-native-ffmpeg'
import { letterSpacing } from 'styled-system';
import RNFetchBlob from "rn-fetch-blob";
const UserCards3 = ({ navigation, route }) => {

  const isFocused = useIsFocused();
  const params = route.params

  const [pause, setpause] = useState(false);
  const [savelocal, setsavelocal] = useState(false)
  const [Video, setVideo] = useState(route.params != null ? route.params.data.VideoPath : '.')
  const [Videopath, setvideopath] = useState("")
  const [states, setstates] = useState(route.params.data.add)
  const [Editvalues, setEditvalues] = useState(route.params.data.values)
  const [isLoading, setIsLoading] = useState(true);
  const [on, seton] = useState(true)
  const [indicator, setindicator] = useState(false)
  const [isedit, setisedit] = useState(true);
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  const [text, settext] = useState(route.params != null ? route.params.data.Greeting : '')
  const [money, setMoney] = useState(route.params == null ? route.params.data.Money : '')
  const [ToName, setToName] = useState(route.params != null ? route.params.data.toname : '')
  const [FromName, setFromName] = useState(route.params != null ? route.params.data.fromname : '')
  const [docid, setdocid] = useState("")
  const [ids, setid] = useState("")
  const [imagePath, setimagePath] = useState(route.params.data.ImagePath)
  const [isImage, setisImage] = useState(false)
  const [VoucherIndex, setVoucherIndex] = useState(route.params.data.VoucherIndex)
  const [opacty, setopacty] = useState(0)
  const [BackGroundIndex, setBackGroundIndex] = useState(route.params.data.BackGroundIndex)
  const [videoduration, setvideoduration] = useState(route.params.data.Duration)
  const onLoadStart = () => {
    setopacty(1)
    setindicator(false)
    if (savelocal == true) {
      SaveVideoToLocal()
    }
  }

  const onLoad = () => {
    setopacty(0)
    setindicator(false)
  }

  const onBuffer = ({ isBuffering }) => {
    setopacty({ isBuffering } ? 1 : 0);
  }

  const getVideoLength = async (uri) => {
    const { rc } = await RNFFprobe.execute(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${uri}`)
    const lastCommandOutput = await RNFFmpegConfig.getLastCommandOutput();
    //global.duration = lastCommandOutput
    setvideoduration(lastCommandOutput)
    return lastCommandOutput
  }

  useEffect(() => {
    let data = route.params.data
    setimagePath(data.ImagePath)
    if (isFocused) {
      setVideo(route.params.VideoPath)
      //setisedit(route.params.isedit)
      setstates(route.params.add)
      setsavelocal(route.params.SaveLocal)
      setVoucherIndex(data.Voucherindex)
      setBackGroundIndex(data.BackGroundIndex)
    }

    loadingVideo()

    setisImage(data.isImage)

    setTimeout(() => {
      setIsLoading(false)

    }, 3000);



    const unsubscribe = navigation.addListener("focus", () => {
      updateLocalValues()

    });
    return unsubscribe;
  }, [navigation, isFocused]);

  async function SaveVideoToLocal() {

    let data = route.params.data
    let dirs = RNFetchBlob.fs.dirs
    RNFetchBlob
      .config({
        // response data will be saved to this path if it has access right.
        path: dirs.DocumentDir + '/stiicky_Video.mp4'
      })
      .fetch('GET', data.VideoPath, {
        //some headers ..
      })
      .then((res) => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        console.log('The file saved to ', res.path())
        let obj = route.params.data
        obj.VideoPath = res.path()
        route.params.data = obj
        setVideo('file://' + res.path())
        // navigation.navigate("EditVideo", { data: route.params.data, edit: true, add: route.params.add, modal: false, })
      })
  }

  function updateLocalValues() {

    // LogBox.ignoreAllLogs()
    let data = route.params.data
    setVideo(data.VideoPath)
    setMoney(data.Amount)
    settext(data.GreetingText)
    setToName(data.To)
    setFromName(data.From)

    // setBackGroundIndex(data.BackGroundIndex)
    //setVoucherIndex(data.Voucherindex)
  }

  async function UpdateSaveCard() {
    setpause(true)
    // const duration =  getVideoLength(Video)
    const duration =  getVideoLength(Video)
    const user = firebase.auth().currentUser;
   
    let data = route.params.data
    navigation.navigate('Preview', { Money: money, cardid: data.Docid })
    let Videolink = ''
    firestore()
      .collection('Cards')
      .doc(data.Docid)
      .update({
        Amount: money,
        GreetingText: text,
        From: FromName,
        To: ToName,
        Voucherindex: VoucherIndex,
        BackGroundIndex: BackGroundIndex
      })
      .then(async () => {

        if (isedit == true) {
          const referenceVideo = storage().ref(`Cards/${user.uid}/${data.Docid}/Video/${data.Docid}_Video.mp4`)
          const taskVideo = referenceVideo.putFile(Video);

          taskVideo.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
          });

          taskVideo.then(async () => {
            Videolink = (await referenceVideo.getDownloadURL()).toString()
          });
          taskVideo.then(async () => {
            let data = route.params.data
            setTimeout(function () {
              // console.log('called', data.Docid);
              firestore().
                collection("Cards").
                doc(data.Docid)
                .update({
                  VideoPath: Videolink,
                  Duration: duration,
                })
              console.log('Image uploaded ');
            }, 2000)
          });
        }
        console.log('User updated!');

      });
  }

  async function AddData() {
    setpause(true)
    const duration = await getVideoLength(Video)
  
    const user = firebase.auth().currentUser;
    let Videolink = ''
    firestore()
      .collection('Cards').add({
        Amount: money,
        GreetingText: text,
        From: FromName,
        To: ToName,
        BackGroundIndex: BackGroundIndex,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user.uid,
        NFCid: "",
        Status: " active",
        Voucherindex: VoucherIndex,
      })
      .then((docRef) => {
        navigation.navigate('Preview', { Money: money , cardid: docRef.id})
        setid(docRef.id)
        firestore().
          collection("Cards").
          doc(docRef.id)
          .update({
            Docid: docRef.id,
            Duration: duration,
          })
          const referenceVideo = storage().ref(`Cards/${user.uid}/${docRef.id}/Video/${docRef.id}_Video.mp4`)
          const taskVideo = referenceVideo.putFile(Video);
  
          taskVideo.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
          });
  
          taskVideo.then(async () => {
            Videolink = (await referenceVideo.getDownloadURL()).toString()
            firestore().
                collection("Cards").
                doc(docRef.id)
                .update({
                  VideoPath: Videolink,
                  Duration: duration,
                })
          });
      })

  }

  const loadingVideo = () => {
    return (
      <View>
        <Videos
          source={{ uri: Video }}   // Can be a URL or a local file.
          style={{ width: RFValue(150), height: RFValue(270), borderRadius: 20 }}
          controls={false}
          paused={pause}
          repeat={true}
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
    )
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
          {/* <Text>
            {VoucherIndex},{BackGroundIndex}</Text> */}
          <TouchableOpacity onPress={() => navigation.navigate("Home")} >
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
          >
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

          <TouchableOpacity onPress={() => { navigation.navigate("EditVideo", { data: route.params.data, edit: true, add: route.params.add, modal: false, }), setpause(true) }
            //  SaveVideoToLocal()
          }>
            {loadingVideo()}



            <TouchableOpacity
              onPress={() => { navigation.navigate("EditVideo", { data: route.params.data, edit: true, add: route.params.add, modal: false, }), setpause(true) }}
              style={styles.EditButtonCardBottom}>
              <Image
                source={require('../../../assets/Images/editb.png')}
                style={{ width: 9, height: 9 }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <View >
            <View style={{
              justifyContent: "space-between",
              height: RFValue(270)

            }} >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('GiftSticker2', { data: route.params.data });
                }}
                style={{
                  width: 150,
                  height: RFValue(129),
                  // height: RFValue(86),
                  borderRadius: 20,
                  backgroundColor: '#32B9AF',
                }}>
                <View
                  style={styles.EditButtonCardBottom}>
                  <Image
                    source={require('../../../assets/Images/editb.png')}
                    style={{ width: 9, height: 9 }}
                    resizeMode="stretch"
                  />
                </View>
                <View style={{
                  justifyContent: "center",
                  height: RFValue(129)
                  //height: RFValue(86),
                }}>


                  <Text style={styles.CardText1}>{strings.wrappingSelected}</Text>
                  <Text style={styles.CardText2}>{strings.birthday}</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('VoucherScreen', { data: route.params.data });
                }}
                style={{
                  width: 150,
                  height: RFValue(86),
                  borderRadius: 20,
                  backgroundColor: '#32B9AF',
                }}>
                <View
                  style={styles.EditButtonCardBottom}>
                  <Image
                    source={require('../../../assets/Images/editb.png')}
                    style={{ width: 9, height: 9 }}
                    resizeMode="stretch"
                  />
                </View>
                <View style={{
                  justifyContent: "center",
                  height: RFValue(86),
                }}>


                  <Text style={styles.CardText1}>{strings.VouncherAdded}</Text>
                  <Text style={styles.CardText2}>{strings.Logo}</Text>
                </View>
              </TouchableOpacity> */}

              {on ? (<TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddMoneyScreen', { data: route.params.data, edit: true, add: route.params.add });
                }}
                style={{
                  width: 150,
                  //height: RFValue(86),
                  height: RFValue(129),
                  borderRadius: 20,
                  backgroundColor: '#32B9AF',
                }}>
                <View

                  style={styles.EditButtonCardBottom}>
                  <Image
                    source={require('../../../assets/Images/editb.png')}
                    style={{ width: 9, height: 9 }}
                    resizeMode="stretch"
                  />
                </View>
                <View style={{
                  justifyContent: "center",
                  // height: RFValue(86),
                  height: RFValue(129),
                }}>
                  <Text style={styles.CardText1}>{strings.UserCardsText3}</Text>
                  <Text style={styles.CardText2}>{money} Kr.</Text>
                </View>
              </TouchableOpacity>) : null}
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
            <View style={{ marginLeft: 25, }}>



              <Text style={{
                color: "#303C42",
                fontSize: 20,
                marginBottom: 20
              }}>
                {ToName}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("DistinationsScreen", { data: route.params.data, edit: true, add: route.params.add })} style={styles.EditButtonName}>
              <Image
                source={require('../../../assets/Images/EditButton.png')}
                style={{ width: 12, height: 12 }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{strings.DestinationTitle2}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{ marginLeft: 25, }}>

              <Text style={{
                color: "#303C42",
                fontSize: 20,
              }}>
                {FromName}
              </Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("DistinationsScreen", { data: route.params.data, edit: true, add: route.params.add })} style={styles.EditButtonName}>
              <Image
                source={require('../../../assets/Images/EditButton.png')}
                style={{ width: 12, height: 12 }}
                resizeMode="stretch"
              />
            </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => navigation.navigate('WritingText', { data: route.params.data, edit: true, add: route.params.add })}
            style={styles.EditButtonCardBottom}>
            <Image
              source={require('../../../assets/Images/editb.png')}
              style={{ width: 9, height: 9 }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
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
        {states ? <TouchableOpacity
          onPress={() => {
            navigation.navigate('Redeem', { preview: true, VideoPath: Video });
          }}>
          <Image
            source={require('../../../assets/Images/EyeButton.png')}
            style={{ width: 46, height: 30 }}
            resizeMode='contain'
          />
        </TouchableOpacity> : null}
        <TouchableOpacity
          style={styles.button}
          onPress={() => { states ? AddData() : UpdateSaveCard() }

          }>
          <Text style={styles.Buttontext}>{strings.Continue}</Text>
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
    fontSize: 12,
    //paddingTop: 15
  },
  CardText2: {
    textAlign: 'center',
    color: '#F5F5F5',
    fontSize: 20,
  },
  CardTextLogo: {
    textAlign: 'center',
    color: '#F5F5F5',
    fontSize: 30,
    fontWeight: '800', top: 12
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
export default UserCards3;