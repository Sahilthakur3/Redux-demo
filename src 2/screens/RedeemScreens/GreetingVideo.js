
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Videos from 'react-native-video';
import { strings } from '../../../Utility';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import RNFetchBlob from "rn-fetch-blob";
import Share from 'react-native-share';
import RNFS from 'react-native-fs'
const GreetingVideo = ({ navigation, route }) => {

    const [Video, setVideo] = useState()
    const [activate, setactivate] = useState(false);
    const [pause, setpause] = useState(false);
    const screenIsFocused = useIsFocused();
    const [mute, setmute] = useState(false)
    const [replay, setreplay] = useState()
    const [repeatvideo, setrepeatvideo] = useState(false)
    const [Preview, setPreview] = useState(route.params.preview)
    const [opacty, setopacty] = useState(0)
    const onLoadStart = () => {
        setopacty(1)
    }

    const onLoad = () => {
        setopacty(0)

    }
    function onmute() {
        setmute(!mute)
    }

    const sharePressed = async () => {
        try {
            if (await RNFS.exists(route.params.localPath)) {
                console.log('locally');
                shareVid(route.params.localPath)
            }
            else {

                let dirs = RNFetchBlob.fs.dirs
                RNFetchBlob.config({
                    fileCache: true,
                    appendExt: 'mp4',
                    path: dirs.DocumentDir + '/stiicky_share_Video.mp4'
                }).fetch('GET', Video, {})
                    .then(async (res) => {
                        console.log('res.path()', res.path());
                        shareVid('file://' + res.path())
                    });
            }
        } catch (error) {
            alert(error.message);
        }
    }

    function shareVid(path) {
        let shareOptions = {
            title: "Check out my video",
            message: "Check out my video!",
            url: 'file://' + path,
            type: 'video/mp4',
            subject: "Check out my video!"
        }
        Share.open(shareOptions)
            .then((res) => console.log('res:', res))
            .catch((err) => console.log('err', err))
    }

    function Replay() {
        setreplay(0)
        setrepeatvideo(!repeatvideo)
    }

    const loadVideoAccordingly = async () => {
        if (await RNFS.exists(route.params.localPath)) {
            setVideo(route.params.localPath)
        }
        else {
            let data = route.params.item
            setVideo(data.VideoPath)
        }
    }
    useEffect(() => {
        console.log('local:', route.params.localPath);
        if (Preview == false) {
            loadVideoAccordingly()
        }
        else {
            console.log('preview');
            setVideo(route.params.VideoPath)
        }


    }, []);



    function ReadData() {
        console.log('coee: ', route.params.nfcID);
        const user = firebase.auth().currentUser;
        firestore()
            .collection('Cards')
            .where('NFCid', '==', route.params.nfcID)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(documentSnapshot => {
                        let data = documentSnapshot.data()
                        setVideo(data.VideoPath)
                    });
                }
            })

    }
    function AddVideo() {

        Preview ? navigation.navigate("UserCards3") : navigation.navigate('RedeemCardOverview', { item: route.params.item, preview: false, localPath: route.params.localPath });


    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: "black"
        }}>



            <View style={{
                justifyContent: "space-evenly",
                flexDirection: "column",
                flex: 1,
                marginTop: 40

            }}>
                <View>
                    <Videos source={{ uri: Video }}   // Can be a URL or a local file.
                        style={{ width: "100%", height: "95%", }}
                        controls={true}
                        paused={pause || (!screenIsFocused)}
                        playInBackground={false}
                        playWhenInactive={false}
                        //onPlaybackResume={true}
                        repeat={repeatvideo}
                        // seek(0)
                        currentTime={replay}
                        onVideoBuffer
                        onLoadStart={onLoadStart}
                        onLoad={onLoad}
                        muted={mute}
                        onEnd={() => { setactivate(true), setrepeatvideo(!repeatvideo) }}
                        ref={(ref) => {
                            this.player = ref
                        }}
                    />
                    <View style={{
                        height: "100%",
                        width: "100%",
                        // height: RFValue(270),
                        // marginTop: RFValue(-270),
                        //width: RFValue(150),
                        justifyContent: "center",
                        position: "absolute",
                    }}>
                        <ActivityIndicator
                            animating
                            size="large"
                            color="white"
                            style={{
                                opacity: opacty,
                                alignSelf: "center",
                                //  marginTop:-130,
                                //height:RFValue(270)
                            }}
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: -50,
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 20,
                    justifyContent: "space-between"
                }}>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <TouchableOpacity onPress={() => Replay()}>
                            <Image
                                style={{
                                    height: 32,
                                    width: 39
                                }}
                                source={require("../../../assets/Images/Replay.png")}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onmute()}>
                            <Image
                                style={{
                                    height: mute ? 30 : 32,
                                    width: mute ? 25 : 44,
                                    marginLeft: 20
                                }}
                                source={mute ? require("../../../assets/Images/unmute.png") : require("../../../assets/Images/mute.png")}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => sharePressed()}
                        >
                            <Image
                                style={{
                                    height: 35,
                                    width: 31,
                                    marginLeft: 20
                                }}
                                source={require("../../../../stiicky/assets/Images/share.png")}></Image>
                        </TouchableOpacity>


                    </View>

                    <TouchableOpacity
                        disabled={!activate}
                        onPress={() => AddVideo()}
                        style={{
                            width: 100,
                            height: 45,
                            justifyContent: 'center',
                            backgroundColor: activate ? "#303C42" : "transparent",
                            borderRadius: 20,
                            marginVertical: 5,
                            alignSelf: "center"
                        }}>
                        <Text
                            style={{
                                color: '#DCDCDC',
                                fontWeight: 'bold',
                                fontFamily: 'BarlowSemiCondensed-Medium',
                                fontSize: 14,
                                textAlign: 'center',
                            }}>
                            {/* {strings.AddMoneyScreenButtonText2} */}
                            {activate ? strings.Continue : ""}
                        </Text>
                    </TouchableOpacity>

                </View>


            </View>

        </View>
    )
}
export default GreetingVideo