import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { strings } from '../../../Utility';
import LottieView from 'lottie-react-native';
import { ImageBackground } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const Preview2 = ({ navigation, route }) => {
    useEffect(() => {
        animation.current.play()
    }, [])
    let animation = React.createRef();
    function strt() {
        animation.current.play(1)
        console.log(play)
    }
    return (
        <View style={{
            backgroundColor: "white",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end"
        }}>


            <View style={{

                flex: 1,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              // alignItems:"center",
              // justifyContent:"center"
                //padding:10,


            }}>
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
                        flex: 1,

                    }}
                    resizeMode="stretch"
                    source={require("../../../assets/Images/Preview2.jpg")}>*/}
                    <View style={{
                        backgroundColor: "",
                        opacity: 0.7,
                        flex: 1
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
                                paddingTop: 10,
                            }}>
                               <TouchableOpacity></TouchableOpacity>

                                <TouchableOpacity
                                     onPress={()=>navigation.navigate("Info")}
                                    style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center",  }}>
                                    <Image
                                        source={require("../../../assets/Images/infoicon.png")}
                                        style={{ width: 18, height: 18 }}
                                        resizeMode="stretch"
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={{

                                    backgroundColor: "#303C42",
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    marginHorizontal: 30,
                                    height: 40,

                                }}
                                onPress={() => {
                                    navigation.navigate("PaymentScreen", { ...route.params});
                                }}
                            >
                                <Text style={{
                                    color: "#F5F5F5",
                                    fontSize: 14,
                                    textAlign: "center",
                                }}>{strings.Continue}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
{/* 
                </ImageBackground> */}

            </View>
        </View>
    );
};

export default Preview2;
