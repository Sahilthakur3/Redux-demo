import React, { useEffect, useState, useRef } from 'react'
import { ImageBackground, TouchableOpacity, Image, Animated,Easing } from 'react-native'
import { View, Text } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { strings } from '../../../Utility'


export default function CountDownScreen({ navigation, route }) {
    const [text, settext] = useState("")
    const [font, setfont] = useState()
    const [color, setcolor] = useState("")
    const [fontweight, setfontweight] = useState("")
    const [Preview, setPreview] = useState(route.params.preview)
    const size = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        console.log('local:', route.params.localPath);
        StartTimer()
    }, []);

    // function loopAnimationUp() {
    //     setsize(1)
    //     Animated.timing(size, {
    //       toValue: 10,
    //       duration: 5000,
    //       easing: Easing.linear
    //     }).start((o) => {
    //       if (o.finished) {
    //         loopAnimationDown();
    //       }
    //     });
    //   }
    
    //   function loopAnimationDown() {
    //     setsize(10);
    //     Animated.timing(size, {
    //       toValue: 1,
    //       duration: 5000,
    //       easing: Easing.linear
    //     }).start((o) => {
    //       if (o.finished) {
    //        // loopAnimationUp();
    //       }
    //     });
    //   }

    function StartTimer() {
        Animated.loop(
            Animated.sequence([
              Animated.timing(size, {
                toValue: 0,
                duration: 1000,
                ease: Easing.linear,
                useNativeDriver: true
              }),
              Animated.timing(size, {
                toValue: 1,
                duration: 1000,
                ease: Easing.linear,
                useNativeDriver: true
              })
            ])
          ).start();
        setTimeout(function () {
            three()
        }, 1000)

        setTimeout(function () {
            text2()
        }, 2000)

        setTimeout(function () {
            two()
        }, 3000)

        setTimeout(function () {
            text1()
        }, 4000)

        setTimeout(function () {
            one()
        }, 5000)

        setTimeout(function () {
         Preview? navigation.navigate("GreetingVideo", {preview : true ,VideoPath: route.params.VideoPath}):  navigation.navigate("GreetingVideo", { item: route.params.item , preview : false, localPath: route.params.localPath})
        }, 6000)
    }

    function three() {
        let a = 200
        settext("3")
        setcolor("#F5A623")
        setfont(a)
        setfontweight("600")
    }
    function two() {
        let b = 200
        settext("2")
        setcolor("#F5A623")
        setfont(b)
        setfontweight("600")
    }
    function one() {

        settext("1")
        setcolor("#F5A623")
        setfont(200)
        setfontweight("600")
    }
    function text2() {
        settext(strings.CountdownText1)
        setcolor("#000000")
        setfont(40)
        setfontweight("600")
    }
    function text1() {
        settext(strings.CountdownText2)
        setcolor("#000000")
        setfont(40)
        setfontweight("600")
    }
    return (
        <View style={{
            flex: 1
        }}>
            <ImageBackground
                style={{
                    height: "100%",
                    width: "100%",

                }}
                source={require("../../../assets/Images/bg.png")}>
                <TouchableOpacity
                     onPress={()=>navigation.navigate("Info")}
                    style={{
                        height: 28,
                        width: 28,
                        alignItems: "center",
                        alignSelf: "flex-end",
                        marginTop: RFValue(30),
                        marginRight: RFValue(30)

                    }}
                >
                    <Image
                        source={require("../../../assets/Images/infoicon.png")}
                        style={{ width: 23, height: 23, }}
                        resizeMode="stretch"
                    />
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    width: "80%",
                    alignSelf: "center"
                }}>
                    <Animated.Text style={{
                        alignSelf: "center",
                        marginTop: -50,
                        fontSize: font,
                        color: color,
                        textAlign: "center",
                        fontWeight: fontweight,
                        opacity: size

                    }}>
                        {text}
                    </Animated.Text>
                </View>

            </ImageBackground>
        </View>
    )
}
