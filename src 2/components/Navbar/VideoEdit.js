
import React, { useState, useEffect, createRef, useRef, } from 'react'
import { View, Text, TouchableOpacity, Image, Modal, ImageBackground,StyleSheet,Dimensions, Animated, RefreshControlBase } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Videos, { FilterType } from 'react-native-video';
import { strings } from '../../../Utility';
import RNFS from 'react-native-fs'
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from "rn-fetch-blob";
import { RNFFmpegConfig, RNFFmpeg, RNFFprobe } from 'react-native-ffmpeg'
import Trimmer from 'react-native-trimmer'
import { useIsFocused } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { background, backgroundColor } from 'styled-system';
const Height = Dimensions.get('screen').height;
const editvideo = ({ navigation, route }) => {
    // setedit(route.params.edit)
    const playerRef = createRef();
    const isFocused = useIsFocused();
    const [opacty, setopacty] = useState(0)
    const [pause, setpause] = useState(false);
    const [edit, setedit] = useState(route.params.edit);
    const [modal, setmodal] = useState(route.params.modal)
    const [filtershow, setfiltershow] = useState(false)
    const [savebutton, setsavebutton] = useState(false)
    const [mute, setmute] = useState(false)
    const [alreadymute, setalreadymute] = useState(false)
    const [videochange, setvideochange] = useState(true)
    const [isedit, setisedit] = useState(false);
    const [videoduration, setvideoduration] = useState(route.params.data.Duration * 1000)
    const [isImage, setisImage] = useState(route.params != null ? route.params.isImage : "")
    const [trimmerLeftHandlePosition, settrimmerLeftHandlePosition] = useState(500)
    const [trimmerRightHandlePosition, settrimmerRightHandlePosition] = useState(1500)
    const [showtrim, setshowtrim] = useState(false)
    const [videoUri, setvideoUri] = useState(route.params.data.VideoPath)
    const [processed, setProcessed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [trimon, settrimon] = useState(false)
    const pathToSave = RNFS.CachesDirectoryPath;
    const output = `${pathToSave}/output:filtered.mp4`;
    const output1 = `${pathToSave}/output:filtered1.mp4`;
    const output2 = `${pathToSave}/output:filtered2.mp4`;
    const output7 = `${pathToSave}/output:filtered7.mp4`;
    const output3 = `${pathToSave}/output:filtered3.mp4`;
    const [finalOutput, setfinalOutput] = useState(route.params.data.VideoPath)
    const [addvideo, setaddvideo] = useState()
    const [secondvideo, setsecondvideo] = useState(false)
    const [Filter, setFilter] = useState(FilterType.NONE)
    const [ Key ,setKey   ] = useState(0)
    const [ loadingvideo , setloadingvideo] = useState(false)
     const bounceValue = useRef(new Animated.Value(Platform.OS === 'ios' ? 200 : 220)).current;

    const MergeVideos = async (type) => {
        if (videoUri, addvideo) {
            setProcessed(false);
            setLoading(true)
            command = ` -i ${videoUri} -i ${output7}  -filter_complex   "concat=unsafe=1:n=2:v=1:a=1  "  -f MOV  -y ${output1}`
            setisedit(true)
            try {
                const { rc } = await RNFFmpeg.execute(command)
                const { lastCommandOutput } = await RNFFmpegConfig.getLastCommandOutput();
                console.log("Last command output: ", lastCommandOutput);
                setfinalOutput(output1)

            } catch (error) {
                console.error("FFMPEG ERROR: ", error)
            }
            finally {
                setvideoUri(output1)
                setProcessed(true);
                setLoading(false);
            }

        }
    }
    function onseekee(){
        playerRef.current.seek(trimmerLeftHandlePosition/1000)
        console.log(trimmerLeftHandlePosition);
    }
    // {refs.}
    function SelectVideo() {
        setvideoUri(trimon ? finalOutput : videoUri)
        settrimon(false)
        setisImage(false)
        setshowtrim(false)
        setfiltershow(false)
        ImagePicker.openPicker({
            mediaType: "video",
        }).then(async (video) => {
            global.secondvideo = video.path
            setaddvideo(video.path)
            const vl = await getVideoLength(video.path)
            scaleVideo()
            setsecondvideo(true)
        });
    }


    const onLoadStart = () => {
        setopacty(1)
    }

    const onLoad = () => {
        setopacty(0)
    }
    function trim() {
        setvideoduration(route.params.data.Duration * 1000)
        console.log('trim clicked');
        setfiltershow(false)
        settrimon(true)
        setshowtrim(true)
        setsavebutton(true)
    }

    const getVideoLength = async (uri) => {
        const { rc } = await RNFFprobe.execute(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${uri}`)
        const lastCommandOutput = await RNFFmpegConfig.getLastCommandOutput();
        setvideoduration(parseInt(videoduration) + parseInt(lastCommandOutput * 1000))
    }
    const gettrimVideoLength = async (uri) => {
        const { rc } = await RNFFprobe.execute(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${uri}`)
        const lastCommandOutput = await RNFFmpegConfig.getLastCommandOutput();
        setvideoduration(lastCommandOutput)
        console.log("duration is ", lastCommandOutput * 1000);
    }


    async function download() {
        setLoading(true)
        setpause(true)
        let response = await playerRef.current.save();
        let uri = response.uri;
        saveToGallery(uri)
    }



    const saveToGallery = async (uri) => {
        if (mute == true) {
            if (uri) {
                command = ` -i ${uri} -vcodec copy -an ${output3} -y`
                try {
                    const { rc } = await RNFFmpeg.execute(command)
                    const { lastCommandOutput1 } = await RNFFmpegConfig.getLastCommandOutput();
                    console.log("Last command output: ", lastCommandOutput1);

                } catch (error) {
                    console.error("FFMPEG ERROR: ", error)
                }
                finally {
                    setalreadymute(true)
                    saveITNow(uri)
                }
            }
        }
        else {
            saveITNow(uri)
        }
    }

    function saveITNow(uri) {

        if (Platform.OS == 'android') {
            let soundnewvideourl = uri.lastIndexOf('/');
            let soundvideoname = uri.substring(soundnewvideourl);
            let dirs = RNFetchBlob.fs.dirs;
            let path = Platform.OS === 'ios' ? dirs['MovieDir'] + soundvideoname : dirs.MovieDir + soundvideoname;
            RNFetchBlob.config({
                fileCache: true,
                appendExt: 'mp4',
                indicator: true,
                IOSBackgroundTask: true,
                path: path,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: path,
                    description: 'video'
                },
            }).fetch("GET", output3).then(res => {
                setLoading(false)
            });
        } else {
            CameraRoll.save(output3)
            alert("Saved Successfully")
            setLoading(false)
        }
    }

    async function muteVideo(uri) {

        command = ` -i ${uri} -vcodec copy -an ${output} -y`
        try {
            const { rc } = await RNFFmpeg.execute(command)
            const { lastCommandOutput } = await RNFFmpegConfig.getLastCommandOutput();
            console.log("Last command output: ", lastCommandOutput);

        } catch (error) {
            console.error("FFMPEG ERROR: ", error)
        }
        finally {
            let obj = route.params.data
            obj.VideoPath = output
            //setvideoUri(true)
            setLoading(false)
            edit ? navigation.navigate('UserCards3', { data: obj, add: route.params.add, SaveLocal: false, isedit: isedit }) : navigation.navigate('AddMoneyScreen', { data: obj })
        }
    }

    function effactsshow() {
        
        setshowtrim(false)
        setfiltershow(true)
        setsavebutton(true)
        setvideoUri(trimon ? finalOutput : videoUri)
        settrimon(false)
    }
    function effacthide() {
        setshowtrim(false)
        setvideochange(true)
        setfiltershow(false)
        setsavebutton(false)
        setedit(route.params.edit)
        setisedit(true)
        setKey(1)
    }

    function trimhide() {
        if (trimon == true) {
            { TrimVideo(), setvideochange(false) }
        }
        setshowtrim(false)
        setsavebutton(false)
        setvideoUri(output2)
        setedit(route.params.edit)
        setisedit(true)
    }

    function cancel() {
        if (filtershow == true) {
            setfiltershow(false)
            setsavebutton(false)
            setvideochange(true)
            setvideoUri(videoUri)
            setFilter(FilterType.NONE)
        }
        else {
            setshowtrim(false)
            setsavebutton(false)
            setvideochange(true)
            setvideoUri(videoUri)
            navigation.goBack()
        }
    }
    const onHandleChange = ({ leftPosition, rightPosition }) => {
          settrimmerRightHandlePosition(rightPosition)
         settrimmerLeftHandlePosition(leftPosition)
        
         playerRef.current.seek(leftPosition/1000)
        
         
    };
    // const onRightHandleChange=({newRightHandleValue}) => {
    //     settrimmerRightHandlePosition(newRightHandleValue)
    // }
    // const onLeftHandleChange=({newLeftHandleValue}) => {
    //     settrimmerLeftHandlePosition(newLeftHandleValue)
    // }
    const TrimVideo = async (type) => {

        if (videoUri) {
            setProcessed(false);
            setloadingvideo(true)
            command = ` -ss ${trimmerLeftHandlePosition / 1000} -i ${videoUri} -to ${trimmerRightHandlePosition / 1000} -async 1 -c copy ${output2} -y`
            setfinalOutput(output2)
            setisedit(true)
            setvideoUri(output2)

            try {
                const { rc } = await RNFFmpeg.execute(command)
                const { lastCommandOutput } = await RNFFmpegConfig.getLastCommandOutput();
            } catch (error) {
                console.error("FFMPEG ERROR: ", error)
            }
            finally {
                setProcessed(true);
                setloadingvideo(false);
            }

        }
    }




    let animation = React.createRef();
    const toggleUpLoader = () => {
        setLoading(true)
        var toValue = 0;
        Animated.spring(bounceValue, {
          toValue: toValue,
          velocity: 3,
          tension: 2,
          friction: 8,
          useNativeDriver: true,
        }).start();
     };

     const toggleDownLoader = () => {
        var toValue = (Platform.OS === 'ios' ? 200 : 220);
        Animated.spring(bounceValue, {
          toValue: toValue,
          velocity: 3,
          tension: 2,
          friction: 8,
          useNativeDriver: true,
        }).start();
        setLoading(false)
     };
   

    function startLoading() {
       
        return (
          <Animated.View
            style={[styles.overlay, { transform: [{ translateY: bounceValue }] }]}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "transparent", opacity: 1 }}>
                <LottieView
                    speed={3}
                    resizeMode="cover"
                    ref={animation}
                    onAnimationFinish={() => { }}
                    style={{
                        height: 150,
                        width: 150,
                        alignSelf: "center",
                    }} source={require("../../../assets/Images/indicator.json")}
                    autoPlay={true}

                //autoPlay={play} 
                //loop={false} 
                />
            </View>
          </Animated.View>
        );
      }
    

    const scaleVideo = async (type) => {

        if (global.secondvideo) {
            setProcessed(false);
            setLoading(true)
            command = `-i ${global.secondvideo} -vf scale=420:780,setsar=1:1,fps=30 ${output7} -y`
            try {
                const { rc } = await RNFFmpeg.execute(command)
                const { lastCommandOutput } = await RNFFmpegConfig.getLastCommandOutput();
                console.log("Last command output: ", lastCommandOutput);
                console.log('\n--------------------------------\n')

            } catch (error) {
                console.error("FFMPEG ERROR: ", error)
            }
            finally {
                setProcessed(true);
                setLoading(false);
                //     let obj = route.params.data
                // obj.VideoPath = output
                // console.log('video.path', output);
                // // obj.Duration = videoduration
                // navigation.navigate('EditVideo', { data: obj, BackGroundIndex: route.params.BackGroundIndex, modal: true });
            }

        }
    }



    async function AddVideo() {
        toggleUpLoader()
        setpause(true)
        let response = await playerRef.current.save();
        let uri = response.uri;
        setvideoUri(uri)
        if (mute == true) {
            muteVideo(uri)
        }
        else {
            let obj = route.params.data
            obj.VideoPath = uri
            toggleDownLoader()
            setvideoUri(uri)
            edit ? navigation.navigate('UserCards3', { data: obj, add: route.params.add, SaveLocal: false, isedit: isedit }) : navigation.navigate('AddMoneyScreen', { data: obj })
        }
    }

    function goback() {
        let obj = route.params.data
        obj.VideoPath = videoUri
        navigation.navigate('UserCards3', { data: obj, SaveLocal: false, add: route.params.add, isedit: isedit })
    }


    function tutorialOverlay() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "black",
                opacity: 0.8,
            }} >
                <TouchableOpacity
                    onPress={() => setmodal(false)}
                    style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                    }}>
                    <View style={{

                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        marginTop: RFValue(49),
                        height: RFValue(50),
                        width: responsiveWidth(100),

                    }}>
                        <TouchableOpacity style={{ height: 30, width: 30, }}></TouchableOpacity>

                        <TouchableOpacity style={{
                        }}>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30,
                                    marginLeft: 2
                                }}
                                source={require("../../../assets/Images/trim.png")}>

                            </Image>
                            <Image style={{
                                width: 22, height: 25, alignSelf: "center"
                            }} source={require("../../../assets/Images/trimarrow.png")}>

                            </Image>
                            <Text style={{
                                color: "white",
                                alignSelf: "center",
                                opacity: 1,
                                fontFamily: 'BarlowSemiCondensed-Regular',
                                fontSize: 15,
                                fontWeight: "500"
                            }}>
                                Cut
                            </Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={{

                            marginLeft: 15
                        }}>

                            <Image
                                style={{
                                    height: 30,
                                    width: 38,
                                }}
                                source={require("../../../assets/Images/addVideo.png")}>

                            </Image>
                            <Image style={{
                                width: 22, height: 68, alignSelf: "center", marginLeft: -10
                            }} source={require("../../../assets/Images/addvideoarrow.png")}>

                            </Image>
                            <Text style={{
                                color: "white",

                                textAlign: "center",
                                opacity: 1,
                                fontFamily: 'BarlowSemiCondensed-Regular',
                                fontSize: 15,
                                fontWeight: "500",
                                marginLeft: -10
                            }}>
                                Add Video
                            </Text>
                        </TouchableOpacity> */}

                     {Platform.OS === 'ios'?   <TouchableOpacity style={{
                            marginLeft: 15
                        }}>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30,

                                }}
                                source={require("../../../assets/Images/Effect.png")}>

                            </Image>
                            <Image style={{
                                width: 22, height: 25, alignSelf: "center", marginLeft: -15
                            }} source={require("../../../assets/Images/trimarrow.png")}>

                            </Image>
                            <Text style={{
                                color: "white",

                                opacity: 1,
                                fontFamily: 'BarlowSemiCondensed-Regular',
                                fontSize: 15,
                                fontWeight: "500",
                                marginLeft: -15
                            }}>
                                Add effect
                            </Text>

                        </TouchableOpacity>:null}
                        <TouchableOpacity style={{ height: 30, width: 30, }}></TouchableOpacity>
                        {/* <TouchableOpacity style={{
                            marginLeft: 1
                        }}>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30,

                                }}
                                source={require("../../../assets/Images/Draw.png")}>

                            </Image>
                            <Image style={{
                                width: 22, height: 68, alignSelf: "center",
                            }} source={require("../../../assets/Images/addvideoarrow.png")}>

                            </Image>
                            <Text style={{
                                color: "white",
                                alignSelf: "center",
                                textAlign: "center",
                                opacity: 1,
                                fontFamily: 'BarlowSemiCondensed-Regular',
                                fontSize: 15,
                                fontWeight: "500",

                            }}>
                                Draw
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 15 }}>
                            <Image
                                style={{
                                    height: 30,
                                    width: 38,

                                }}
                                source={require("../../../assets/Images/AddText.png")}>

                            </Image>
                            <Image style={{
                                width: 22, height: 25, alignSelf: "center", marginLeft: -15
                            }} source={require("../../../assets/Images/trimarrow.png")}>

                            </Image>
                            <Text style={{
                                color: "white",
                                // alignSelf: "center",
                                opacity: 1,
                                fontFamily: 'BarlowSemiCondensed-Regular',
                                fontSize: 15,
                                fontWeight: "500",
                                marginLeft: -15
                            }}>
                                Add text
                            </Text>
                        </TouchableOpacity> */}





                    </View>
                    <View style={{
                        flexDirection: "row",
                        marginBottom: 20
                    }}>
                        <View style={{
                            marginLeft: 20
                        }}>
                            <Text style={{
                                color: "white",
                                alignSelf: "center",
                                opacity: 1,
                                fontFamily: 'BarlowSemiCondensed-Regular',
                                fontSize: 15,
                                fontWeight: "500",
                                //marginBottom: 10

                            }}>
                                Save
                            </Text>
                            <Image style={{
                                width: 22, height: 25, alignSelf: "center", marginBottom: 10
                            }} source={require("../../../assets/Images/saveArrow.png")}>

                            </Image>
                            <Image style={{
                                height: 32,
                                width: 32,
                                marginBottom: 5

                            }} source={require("../../../assets/Images/Download.png")}>

                            </Image>
                        </View>
                        <View style={{
                            marginLeft: 20
                        }}><Text style={{
                            color: "white",
                            alignSelf: "center",
                            opacity: 1,
                            fontFamily: 'BarlowSemiCondensed-Regular',
                            fontSize: 15,
                            fontWeight: "500",
                            marginTop: 30,
                            marginLeft: 20

                        }}>
                                Sound on/off
                            </Text>
                            <Image style={{
                                width: 22,
                                height: 25,
                                alignSelf: "center",
                                marginBottom: -10,
                                marginLeft: 10
                            }} source={require("../../../assets/Images/soundarrow.png")}>

                            </Image>

                            <Image style={{
                                height: 32,
                                width: 43,

                            }} source={require("../../../assets/Images/mute.png")}>

                            </Image>
                        </View>
                    </View>


                </TouchableOpacity>
            </View>
        )
    }
   
    function VIDEO(){
        return(
<Videos
                        key={Key}
                        filter={Filter}
                        filterEnabled={true}
                    
                        // volume={0}
                        rate={1}
                        source={videochange ? { uri: videoUri } : { uri: output2 }}   // Can be a URL or a local file.
                        style={{
                            width: responsiveWidth(100),
                            height: responsiveHeight(88),
                            borderRadius: 20,
                            marginTop: 30,
                        }}
                        paused={pause}
                        controls={true}
                        muted={mute}
                        fullscreen={false}
                        playInBackground={false}
                        playWhenInactive={false}
                        repeat={true}
                    
                        //onVideoLoad={onLoad}
                        onLoadStart={onLoadStart}
                        onLoad={onLoad}
                        ref={playerRef}></Videos>
        )
    }
  // playerRef.current.seek(trimmerLeftHandlePosition)
    function addanotherViewOverLay() {
        return (
            <View style={{ backgroundColor: "black", flex: 1 }}>
                <Videos
                    source={{ uri: output7 }}   // Can be a URL or a local file.
                    style={{
                        width: responsiveWidth(100),
                        height: responsiveHeight(88),
                        borderRadius: 20,
                        marginTop: 30,
                    }}
                    controls={true}
                    muted={mute}
                    fullscreen={false}
                    playInBackground={false}
                    playWhenInactive={false}
                    onVideoBuffer
                    onLoadStart={onLoadStart}
                    onLoad={onLoad}

                    ref={(ref) => {
                        this.player = ref
                    }}></Videos>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginHorizontal: 20
                }}>
                    <TouchableOpacity

                        onPress={() => setsecondvideo(false)}
                        style={{
                            width: 100,
                            height: 40,
                            justifyContent: 'center',
                            backgroundColor: "#303C42",
                            borderRadius: 20,
                            marginVertical: 5,
                            alignSelf: "center",
                            marginTop: 10
                            //flexDirection:"row-reverse"

                        }}>
                        <Text
                            style={{
                                color: '#DCDCDC',
                                fontWeight: 'bold',
                                //fontFamily: 'BarlowSemiCondensed-Medium',
                                fontSize: 14,
                                textAlign: 'center',
                            }}>

                            {strings.cancel}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity

                        onPress={() => { MergeVideos(), setsecondvideo(false), setvideochange(false) }}
                        style={{
                            width: 100,
                            height: 40,
                            justifyContent: 'center',
                            backgroundColor: "#303C42",
                            borderRadius: 20,
                            marginVertical: 5,
                            alignSelf: "center",
                            marginTop: 10
                        }}>
                        <Text
                            style={{
                                color: '#DCDCDC',
                                fontWeight: 'bold',
                                //fontFamily: 'BarlowSemiCondensed-Medium',
                                fontSize: 14,
                                textAlign: 'center',
                            }}>

                            Add
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (


        <View style={{
            flex: 1,
            backgroundColor: "black"
        }}>

            <View style={{
                justifyContent: "space-evenly",
                flexDirection: "column",

            }}>
                <View>
                   {loadingvideo ?<View  style={{
                        width: responsiveWidth(100),
                        height: responsiveHeight(88),
                        borderRadius: 20,
                        marginTop: 30,
                        justifyContent:"center"
                    }}>
                         <LottieView
                    speed={3}
                    resizeMode="cover"
                    ref={animation}
                    onAnimationFinish={() => { }}
                    style={{
                        height: 150,
                        width: 150,
                        alignSelf: "center",
                    }} source={require("../../../assets/Images/indicator.json")}
                    autoPlay={true}

                //autoPlay={play} 
                //loop={false} 
                />
                    </View>
              
           :VIDEO()}


                    <View style={{

                        flexDirection: "row",
                        justifyContent: "space-around",
                        position: "absolute",
                        marginTop: RFValue(50),
                        height: RFValue(50),
                        width: responsiveWidth(100),
                    }}>
                        <TouchableOpacity
                            onPress={() => { edit ? goback() : navigation.goBack() }}
                            style={{ height: 30, width: 30, }}>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30,
                                    tintColor: "white"
                                }}
                                source={require("../../../assets/Images/Back.png")}>
                            </Image>
                        </TouchableOpacity>
                        {modal ? <TouchableOpacity style={{ height: 30, width: 30, }} ></TouchableOpacity> : <TouchableOpacity onPress={() => trim()}>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                                source={require("../../../assets/Images/trim.png")}>
                            </Image>

                        </TouchableOpacity>}
                        {/* {modal ? <TouchableOpacity style={{ height: 30, width: 30, }} ></TouchableOpacity> : <TouchableOpacity onPress={() => SelectVideo()}>
                            <Image
                                style={{
                                    height: 30,
                                    width: 38
                                }}
                                source={require("../../../assets/Images/addVideo.png")}>

                            </Image>

                        </TouchableOpacity>} */}
                        { Platform.OS === 'ios' ? modal ? <TouchableOpacity style={{ height: 30, width: 30, }}></TouchableOpacity> : <TouchableOpacity onPress={() => effactsshow()}  >
                            <Image
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                                source={require("../../../assets/Images/Effect.png")}>

                            </Image>

                        </TouchableOpacity> :null}
                        {/* {modal ? <TouchableOpacity></TouchableOpacity> : <TouchableOpacity>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                                source={require("../../../assets/Images/Draw.png")}>

                            </Image>

                        </TouchableOpacity>}
                        {modal ? <TouchableOpacity></TouchableOpacity> : <TouchableOpacity>
                            <Image
                                style={{
                                    height: 30,
                                    width: 38
                                }}
                                source={require("../../../assets/Images/AddText.png")}>

                            </Image> 

                        </TouchableOpacity>}*/}
                        <TouchableOpacity onPress={() => { edit ? goback() : navigation.goBack() }}>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                                source={require("../../../assets/Images/cross.png")}>

                            </Image>

                        </TouchableOpacity>
                    </View>
                    {showtrim ? <View style={{ marginTop: -190, marginBottom: 46 }}>
                        <View style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
                            <Text style={{ color: "white" }}>{trimmerLeftHandlePosition / 1000} </Text>
                            <Text style={{ color: "white" }}>-</Text>
                            <Text style={{ color: "white" }}>{trimmerRightHandlePosition / 1000} </Text>
                        </View>
                        <Trimmer
                        // onRightHandleChange ={onRightHandleChange}
                        // onLeftHandleChange={onLeftHandleChange}
                            onHandleChange={onHandleChange}
                            totalDuration={videoduration}
                            minimumTrimDuration={1000}
                            maxTrimDuration={videoduration}
                            //maximumZoomLevel={200}
                            zoomMultiplier={20}
                            initialZoomValue={0.7}
                            scaleInOnInit={false}
                            trimmerLeftHandlePosition={trimmerLeftHandlePosition}
                            trimmerRightHandlePosition={trimmerRightHandlePosition}
                        />

                    </View> : null}
                    {filtershow ? <View style={{
                        flexDirection: "row",
                        // justifyContent: "space-between",
                        marginTop: -130,
                        marginBottom: 50
                    }}>
                        <ScrollView horizontal >
                            <TouchableOpacity
                                onPress={() => setFilter(FilterType.CHROME)}
                                style={{
                                    height: 80,
                                    width: 80,
                                    marginHorizontal: 15

                                }}>
                                <ImageBackground
                                    style={{
                                        height: 80,
                                        width: 80,
                                        justifyContent: "center",
                                        //borderRadius: 20,

                                    }}
                                    source={require("../../../assets/Images/blur.jpeg")}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 14,
                                        fontWeight: "500",
                                        alignSelf: "center",

                                    }}>
                                        CHROME
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setFilter(FilterType.FADE)}
                                style={{
                                    height: 80,
                                    width: 80,


                                }}>
                                <ImageBackground
                                    style={{
                                        height: 80,
                                        width: 80,
                                        justifyContent: "center",
                                        //borderRadius: 20,

                                    }}
                                    source={require("../../../assets/Images/blur.jpeg")}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 14,
                                        fontWeight: "500",
                                        alignSelf: "center",

                                    }}>
                                        FADE
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setFilter(FilterType.FALSE)}
                                style={{
                                    height: 80,
                                    width: 80,
                                    marginLeft: 15

                                }}>
                                <ImageBackground
                                    style={{
                                        height: 80,
                                        width: 80,
                                        justifyContent: "center",
                                        //borderRadius: 20,

                                    }}
                                    source={require("../../../assets/Images/blur.jpeg")}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 14,
                                        fontWeight: "500",
                                        alignSelf: "center",

                                    }}>
                                        FALSE
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setFilter(FilterType.INSTANT)}
                                style={{
                                    height: 80,
                                    width: 80,
                                    marginLeft: 15

                                }}>
                                <ImageBackground
                                    style={{
                                        height: 80,
                                        width: 80,
                                        justifyContent: "center",
                                        //borderRadius: 20,

                                    }}
                                    source={require("../../../assets/Images/blur.jpeg")}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 14,
                                        fontWeight: "500",
                                        alignSelf: "center",

                                    }}>
                                        INSTANT
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setFilter(FilterType.MONO)}
                                style={{
                                    height: 80,
                                    width: 80,
                                    marginLeft: 15

                                }}>
                                <ImageBackground
                                    style={{
                                        height: 80,
                                        width: 80,
                                        justifyContent: "center",
                                        //borderRadius: 20,

                                    }}
                                    source={require("../../../assets/Images/blur.jpeg")}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 14,
                                        fontWeight: "500",
                                        alignSelf: "center",

                                    }}>
                                        MONO
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => { filterHandler('brightness'), setvideochange(false) }}
                                onPress={() => setFilter(FilterType.INVERT)}
                                style={{
                                    height: 80,
                                    width: 80,
                                    marginLeft: 15

                                }}>
                                <ImageBackground
                                    style={{
                                        height: 80,
                                        width: 80,
                                        justifyContent: "center",
                                        borderRadius: 30
                                    }}
                                    source={require("../../../assets/Images/blur.jpeg")}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 14,
                                        fontWeight: "500",
                                        alignSelf: "center",

                                    }}>
                                        INVERT
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => { filterHandler('red'), setvideochange(false) }}
                                onPress={() => setFilter(FilterType.SEPIA)}
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 30,
                                    marginLeft: 15
                                }}>
                                <ImageBackground
                                    style={{
                                        height: 80,
                                        width: 80,
                                        justifyContent: "center",
                                        borderRadius: 30
                                    }}
                                    source={require("../../../assets/Images/blur.jpeg")}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 14,
                                        fontWeight: "500",
                                        alignSelf: "center",

                                    }}>
                                        SEPIA
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setFilter(FilterType.TONAL)}
                                //  onPress={() => { filterHandler('vintage'), setvideochange(false) }}
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 30,
                                    marginHorizontal: 15
                                }}>
                                <ImageBackground
                                    style={{
                                        height: 80,
                                        width: 80,
                                        justifyContent: "center",
                                        borderRadius: 30
                                    }}
                                    source={require("../../../assets/Images/blur.jpeg")}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 14,
                                        fontWeight: "500",
                                        alignSelf: "center",

                                    }}>
                                        TONAL
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </ScrollView>
                    </View> : null}

                </View>

                <View style={{
                    //marginTop: -30,
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 20,
                    justifyContent: "space-between"
                }}>

                    {modal ? <View></View> : <View style={{
                        flexDirection: "row"
                    }}>
                        <TouchableOpacity onPress={() => download()}>
                            <Image style={{
                                height: 32,
                                width: 32,
                                marginBottom: -10

                            }} source={require("../../../assets/Images/Download.png")}>

                            </Image></TouchableOpacity>
                        <TouchableOpacity onPress={() => setmute(!mute)}>

                            <Image style={{
                                height: mute ? 32 : 32,
                                width: mute ? 25 : 43,
                                marginBottom: -10,
                                marginLeft: 20

                            }} source={mute ? require("../../../assets/Images/unmute.png") : require("../../../assets/Images/mute.png")}>

                            </Image></TouchableOpacity>

                    </View>}

                    {savebutton ? <View style={{
                        flexDirection: "row"
                    }}><TouchableOpacity

                        onPress={() => cancel()}
                        style={{
                            width: 100,
                            height: 40,
                            justifyContent: 'center',
                            backgroundColor: "#303C42",
                            borderRadius: 20,
                            marginVertical: 5,
                            alignSelf: "center",
                            marginTop: 10,
                            marginRight: 10


                        }}>
                            <Text
                                style={{
                                    color: '#DCDCDC',
                                    fontWeight: 'bold',

                                    fontSize: 14,
                                    textAlign: 'center',
                                }}>

                                {strings.cancel}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity

                            onPress={() => trimon ? trimhide() : effacthide()}
                            style={{
                                width: 100,
                                height: 40,
                                justifyContent: 'center',
                                backgroundColor: "#303C42",
                                borderRadius: 20,
                                marginVertical: 5,
                                alignSelf: "center",
                                marginTop: 10
                                //flexDirection:"row-reverse"

                            }}>
                            <Text
                                style={{
                                    color: '#DCDCDC',
                                    fontWeight: 'bold',
                                    fontFamily: 'BarlowSemiCondensed-Medium',
                                    fontSize: 14,
                                    textAlign: 'center',
                                }}>

                                {strings.Save}
                            </Text>
                        </TouchableOpacity>
                    </View> : <TouchableOpacity

                        onPress={() => AddVideo()}
                        style={{
                            width: 100,
                            height: 40,
                            justifyContent: 'center',
                            backgroundColor: "#303C42",
                            borderRadius: 20,
                            marginVertical: 5,
                            alignSelf: "center",
                            marginTop: 10
                            //flexDirection:"row-reverse"

                        }}>
                        <Text
                            style={{
                                color: '#DCDCDC',
                                fontWeight: 'bold',
                                //fontFamily: 'BarlowSemiCondensed-Medium',
                                fontSize: 14,
                                textAlign: 'center',
                            }}>

                            {strings.Continue}
                        </Text>
                    </TouchableOpacity>}
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}>
                {tutorialOverlay()}
            </Modal>
            <Modal visible={secondvideo}>
                {addanotherViewOverLay()}
            </Modal>

            <Modal visible={loading} animationType="fade"
                transparent={true}>
                {startLoading()}
            </Modal>
        </View>


    )
}
const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'black',
      width: null,
      opacity: 0.7,
      height: Platform.OS === 'ios' ? 130 : 150,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 1,
      top: Height - (Platform.OS === 'ios' ? 130 : 170),
      position: 'absolute',
    },
  });
export default editvideo