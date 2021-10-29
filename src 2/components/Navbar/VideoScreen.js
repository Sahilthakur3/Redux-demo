import React, { useState, useEffect, createRef, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, LogBox, StyleSheet, Modal } from 'react-native'

//import Videos from 'react-native-video';
import { strings } from '../../../Utility';
import { useIsFocused } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import { responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Stopwatch } from 'react-native-stopwatch-timer'
//import RNFS from 'react-native-fs'
//import LottieView from 'lottie-react-native';
import { RNFFmpegConfig, RNFFmpeg, RNFFprobe } from 'react-native-ffmpeg'


const VideoScreen = ({ navigation, route }) => {

    const [ChangeCamera, setChangeCamera] = useState(true)
    const [flash, setflash] = useState(true)
    const camera = useRef(null); const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [modal, setmodal] = useState(true)
    const actionSheetRef = createRef();
    useEffect(() => {
        if (modal == true) {
            setmodal(true)
        }
        setTimeout(function () {
            actionSheetRef.current?.show();

        }, 500)

        //SelectVideo()
    }, []);

    //const screenIsFocused = useIsFocused();
    //const pathToSave = RNFS.CachesDirectoryPath;
    //const output = `${pathToSave}/output:filtered.mp4`;


    const getVideoLength = async (uri) => {
        const { rc } = await RNFFprobe.execute(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${uri}`)
        const lastCommandOutput = await RNFFmpegConfig.getLastCommandOutput();
        return lastCommandOutput
    }

    const Submit = async () => {
        setIsStopwatchStart(!isStopwatchStart);
        setResetStopwatch(false);
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const { uri, codec = "mp4" } = await camera.current.recordAsync(options);
            console.log(uri);
            let obj = route.params.data
            obj.VideoPath = uri
            obj.Duration = getVideoLength(uri)
            navigation.navigate('EditVideo', { data: obj, modal: true });
        }
    }


    const Stop = () => {
        setIsStopwatchStart(false);
        setResetStopwatch(true);
        camera.current.stopRecording();
    }

    takePicture = async () => {
        if (camera) {
            const options = { quality: 0.5, base64: true, maxDuration: 30, maxFileSize: 10 * 1024 * 1024 };
            const data = await camera.current.takePictureAsync(options);
            console.log(data.uri);
        }
    };

    const ChangeCam = () => {
        setChangeCamera(!ChangeCamera)
    }

    const ChangeFlash = () => {
        setflash(!flash)
    }

    const opengallary = async () => {
        await ImagePicker.openPicker({
            mediaType: "video",
        }).then(async (video) => {
            let obj = route.params.data
            obj.VideoPath = video.path
            obj.Duration = await  getVideoLength(video.path)
            navigation.navigate('EditVideo', { data: obj, BackGroundIndex: route.params.BackGroundIndex, modal: true });
        });
    }


    // function AddVideo() {
    //     let obj = route.params.data
    //    // obj.VideoPath = Video
    //     obj.ImagePath = images
    //     obj.isImage = isImage
    //     navigation.navigate('DistinationsScreen', { data: obj, BackGroundIndex: route.params.BackGroundIndex });

    // }
    return (

        <View style={{ flex: 1 }}>
            <RNCamera
                ref={camera}
                zoom={0}
                maxZoom={1}
                useNativeZoom={false}
                style={styles.preview}
                defaultVideoQuality={RNCamera.Constants.VideoQuality["720p"],RNCamera.Constants.VideoCodec["H264"]}
                type={ChangeCamera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                flashMode={flash ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.torch}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "space-between"


                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 20,
                        marginTop: RFValue(50)
                    }} >
                        {modal ? <TouchableOpacity></TouchableOpacity> : <TouchableOpacity onPress={() => ChangeFlash()}>
                            <Image
                                style={{
                                    height: RFValue(30),
                                    width: RFValue(30)
                                }}
                                source={require("../../../assets/Images/flash.png")}>

                            </Image>
                        </TouchableOpacity>}
                        <Stopwatch
                            start={isStopwatchStart}
                            reset={resetStopwatch}
                            options={options}
                            getTime={(time) => {
                                console.log(time);
                            }}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate("DistinationsScreen")}>
                            <Image style={{
                                width: RFValue(32),
                                height: RFValue(30)
                            }}
                                source={require("../../../assets/Images/cross.png")}>

                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                height: RFValue(70),
                                width: RFValue(70),
                                alignItems: 'center', justifyContent: 'center',
                                alignSelf: "center"
                            }}
                            onPress={() => { }}
                            onPressIn={() => Submit()}
                            onPressOut={() => Stop()}
                        >
                            {modal ? <TouchableOpacity></TouchableOpacity> : <Image style={{
                                height: RFValue(60), width: RFValue(60)
                            }} source={require("../../../assets/Images/capturebtn.png")} ></Image>}
                        </TouchableOpacity>


                        {modal ? <TouchableOpacity></TouchableOpacity> : <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginHorizontal: 20,
                            marginTop: RFValue(20),
                            marginBottom: 25
                        }} >
                            <TouchableOpacity onPress={() => opengallary()}>
                                <Image
                                    style={{
                                        height: RFValue(30),
                                        width: RFValue(38)
                                    }}
                                    source={require("../../../assets/Images/gallary.png")}>

                                </Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => ChangeCam()}>
                                <Image style={{
                                    width: RFValue(37),
                                    height: RFValue(32)
                                }}
                                    source={require("../../../assets/Images/changecamera.png")}>

                                </Image>
                            </TouchableOpacity>
                        </View>}
                    </View>

                </View>
            </RNCamera>
            <Modal animationType="fade" transparent={true} style={{
            }} visible={modal}>

                <View style={{
                    flex: 1, // backfaceVisibility: "visible",
                    backgroundColor: "black", opacity: 0.8,

                }} >
                    <TouchableOpacity
                        onPress={() => setmodal(false)}
                        style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            flex: 1,

                        }}>
                        <View style={{
                            marginTop: RFValue(50),
                            marginLeft: 19,
                            flexDirection: "row"
                        }}>
                            <Image
                                style={{
                                    height: RFValue(30),
                                    width: RFValue(30)
                                }}
                                source={require("../../../assets/Images/flash.png")}>

                            </Image>
                            <View>
                                <Image style=
                                    {{
                                        height: RFValue(34),
                                        width: RFValue(29),
                                        marginTop: 12,
                                        marginLeft: 5

                                    }} source={require("../../../assets/Images/flasharrow.png")}>

                                </Image>
                                <Text style={{
                                    color: "white",
                                    alignSelf: "center",
                                    opacity: 1,
                                    fontFamily: 'BarlowSemiCondensed-Regular',
                                    fontSize: 15,
                                    fontWeight: "500"
                                }}>
                                    {strings.flashTip}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View style={{
                                width: 190,
                                alignSelf: "center",
                                flexDirection: "row"
                            }}>

                                <Text style={{
                                    color: "white",
                                    alignSelf: "center",
                                    opacity: 1,
                                    fontFamily: 'BarlowSemiCondensed-Regular',
                                    fontSize: 15,
                                    fontWeight: "500",
                                    textAlign: "center"
                                }}>
                                    Take a photo or record a video and add to your <Text style={{
                                        color: "white",
                                        alignSelf: "center",
                                        opacity: 1,
                                        fontFamily: 'BarlowSemiCondensed-Regular',
                                        fontSize: 15,
                                        fontWeight: "800",
                                        fontStyle: "italic"
                                    }} >stiicky</Text>
                                </Text>

                            </View>
                            <Image
                                style={{
                                    width: 22,
                                    height: 26,
                                    marginVertical: 10,
                                    alignSelf: "center"
                                }}
                                source={require("../../../assets/Images/recordarrow.png")}>
                            </Image>
                            <Image style={{
                                height: RFValue(60), width: RFValue(60), alignSelf: "center", marginBottom: -45
                            }} source={require("../../../assets/Images/capturebtn.png")} ></Image>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 20,
                                marginTop: RFValue(20),
                                marginBottom: 25
                            }} >
                                <TouchableOpacity
                                // onPress={() => opengallary()}
                                ><View>
                                        <Text style={{
                                            color: "white",
                                            alignSelf: "center",
                                            opacity: 1,
                                            fontFamily: 'BarlowSemiCondensed-Regular',
                                            fontSize: 15,
                                            fontWeight: "500",
                                            textAlign: "center",
                                            width: 100
                                        }}>
                                            Choose from camera roll
                                        </Text>
                                        <Image style={{
                                            height: 34,
                                            width: 29,
                                            marginLeft: 50,
                                            marginBottom: -20
                                        }} source={require("../../../assets/Images/gallaryarrow.png")}>
                                        </Image>
                                        <Image
                                            style={{
                                                height: RFValue(30),
                                                width: RFValue(38)
                                            }}
                                            source={require("../../../assets/Images/gallary.png")}>

                                        </Image>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                //onPress={() => ChangeCam()}
                                >
                                    <Text style={{
                                        color: "white",
                                        alignSelf: "center",
                                        opacity: 1,
                                        fontFamily: 'BarlowSemiCondensed-Regular',
                                        fontSize: 15,
                                        fontWeight: "500",
                                        textAlign: "center",
                                        width: 100,
                                        marginLeft: -90
                                    }}>
                                        Flip camera
                                    </Text>
                                    <Image style={{
                                        height: 34,
                                        width: 29,
                                        marginLeft: -30,
                                        marginBottom: -20
                                    }} source={require("../../../assets/Images/cameraarrow.png")}>
                                    </Image>
                                    <Image style={{
                                        width: RFValue(37),
                                        height: RFValue(32)
                                    }}
                                        source={require("../../../assets/Images/changecamera.png")}>

                                    </Image>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableOpacity>
                </View>

            </Modal>

        </View>

    )
}
export default VideoScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    preview: {
        width: responsiveScreenWidth(100),
        height: responsiveHeight(100)
    }
});



const options = {
    container: {
        //backgroundColor: '#FF0000',
        padding: 5,
        // borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: '#FFF',
        marginLeft: 7,
    },
};