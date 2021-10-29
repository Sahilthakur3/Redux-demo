import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ImageBackground, Dimensions } from 'react-native'
import { View, Text } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { strings } from '../../../Utility';
import SwipeButton from 'rn-swipe-button';
let dimensions = Dimensions.get("window");
import LottieView from 'lottie-react-native';
import RNFetchBlob from "rn-fetch-blob";
let imageHeight = Math.round((dimensions.height));
let imageWidth = dimensions.width * 1;

export default function Redeem({ navigation, route }) {
    const [image1, setimage1] = useState(require("../../../assets/Images/RedeemAnimation.jpg"))
    const [image2, setimage2] = useState(require("../../../assets/Images/RedeemAnimation2.jpg"))
    const [image3, setimage3] = useState(require("../../../assets/Images/RedeemAnimation3.jpg"))
    const [img, setimg] = useState(image1)
    const [hidebutton, sethidebutton] = useState(false)
    const [Preview, setPreview] = useState(route.params.preview)
    const [localVideoUrl, setlocalVideoUrl] = useState()
    //console.log(route.params.VideoPath);


    useEffect(() => {
        downloadView()
    }, []);

    const downloadView = async () => {
        try {
            let dirs = RNFetchBlob.fs.dirs
            setlocalVideoUrl('file://' + dirs.DocumentDir + '/stiicky_redeem_Video.mp4')
            RNFetchBlob.config({
                fileCache: true,
                appendExt: 'mp4',
                path: dirs.DocumentDir + '/stiicky_redeem_Video.mp4'
            }).fetch('GET', route.params.item.VideoPath, {})
        } catch (error) {
            alert(error.message);
        }

    }

    function start() {
        setimg(image2)
    }
    function end() {
        setimg(image3)
    }
    const CheckoutButton = () => {

        return (
            <View style={{ width: 42, height: 42, backgroundColor: '#303C42', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{
                    height: 40,
                    width: 40
                }} source={require("../../../assets/Images/SwipeButton.png")}></Image>
            </View>
        );
    }

    let animation = React.createRef();
    function strt() {
        animation.current.play(1)
    }
    return (
        <View style={{
            flex: 1,
        }}>

            <LottieView
                resizeMode="cover"
                ref={animation}
                onAnimationFinish={() => {
                    console.log('localVideoUrl',localVideoUrl);
                    Preview ? navigation.navigate("CountDown", { preview: true, VideoPath: route.params.VideoPath }) : navigation.navigate("CountDown", { item: route.params.item, preview: false, localPath: localVideoUrl })
                }}
                style={{
                    flex: 1
                }} source={require("../../../assets/Images/birthday.json")}
                autoPlay={false}

                //autoPlay={play} 
                loop={false}
            />
            {/* <ImageBackground
                resizeMode="stretch"

                style={{
                    width: imageWidth,
                    height: imageHeight,

                }}
            source={img}>*/}
            <View style={{
                justifyContent: "space-between",
                flexDirection: "column",
                flex: 1,
                marginVertical: RFValue(30)
            }}>


                <TouchableOpacity
                    onPress={() => navigation.navigate("Info")}
                    style={{
                        height: 28,
                        width: 28,
                        alignItems: "center",
                        alignSelf: "flex-end",
                        // marginTop:RFValue(30),
                        marginRight: RFValue(30)

                    }}
                >
                    <Image
                        source={require("../../../assets/Images/infoicon.png")}
                        style={{ width: 23, height: 23, }}
                        resizeMode="stretch"
                    />
                </TouchableOpacity>
                {hidebutton ? <TouchableOpacity></TouchableOpacity> : <SwipeButton
                    containerStyles={{ alignSelf: "center", marginBottom: 30 }}
                    disabled={false}
                    swipeSuccessThreshold={30}
                    height={RFValue(37)}
                    width={300}
                    title={strings.swipe}
                    titleColor="black"
                    onSwipeStart={() => { }}
                    onSwipeSuccess={() => {
                        strt()
                        sethidebutton(true)

                    }}
                    railFillBackgroundColor="#303C42" //(Optional)
                    railFillBorderColor="#303C42" //(Optional)
                    thumbIconBackgroundColor="black" //(Optional)
                    thumbIconBorderColor="transparent" //(Optional)
                    railBackgroundColor="#F2F2F2" //(Optional)
                    railBorderColor="#303C42" //(Optional)
                    thumbIconComponent={CheckoutButton}
                />}

            </View>
            {/* </ImageBackground> */}
        </View>
    )
}
