import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { strings } from '../../../Utility';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';

const Preview = ({ navigation, route }) => {

    const [change, setchange] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("hello")
            navigation.navigate("Preview2", { ...route.params})
        }, 6000);
        animation.current.play()
        return () => clearTimeout(timer);

    }, [])
    let animation = React.createRef();
    function strt() {
        animation.current.play(1)
        console.log(play)
    }

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         console.log("hello")
    //         navigation.navigate("Preview2", { Money: route.params.Money })
    //     }, 6000);
    //     return () => clearTimeout(timer);
    // }, []);
    return (
        <View style={{ backgroundColor: "white" }}>

<View style={{
                    flex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    justifyContent:"center"
                }}>
                 <LottieView
                 speed={0.4}
                resizeMode="cover"
                ref={animation}
                onAnimationFinish={() => { }}
                style={{
                    height:200,
                    width:200,
                    alignSelf:"center"

                }} source={require("../../../assets/Images/animation2.json")}
                autoPlay={false}

            //autoPlay={play} 
            //loop={false} 
            /></View>
            {/* <ImageBackground

                style={{
                    width: "100%",
                    height: "100%",

                    //justifyContent:"center"

                }}
                source={require("../../../assets/Images/Preview2.jpg")}>*/}
            <View style={{
                height: "100%",
                backgroundColor: change ? "black" : "transparent",
                opacity: change ? 0.83 : 1

            }}>


                <View style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: 1,
                    marginVertical: 30
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <TouchableOpacity

                        >
                            <Image
                                source={require("../../../assets/Images/Back.png")}
                                style={{ width: 13, height: 12 }}
                                resizeMode="stretch"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { }}
                            style={{ height: 28, width: 28, alignItems: "center" }}
                        >
                            <Image
                                source={require("../../../assets/Images/infoicon.png")}
                                style={{ width: 18, height: 18 }}
                                resizeMode="stretch"
                            />
                        </TouchableOpacity>
                    </View>
                    <View

                        style={{
                            width: 130,
                            alignSelf: "center"
                        }}>

                        <Text
                            style={{
                                color: "white",
                                fontSize: 14,
                                fontWeight: "500",
                                fontFamily: 'BarlowSemiCondensed-Medium',
                                textAlign: "center"
                            }}>
                            {strings.PreviewText}
                        </Text>
                    </View><View></View>
                </View>

            </View>

            {/* </ImageBackground> */}

        </View>
    );
};

export default Preview;
