import React, { useEffect } from 'react'
import { ImageBackground, TouchableOpacity, Image } from 'react-native'
import { View, Text } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { strings } from '../../../Utility';
import * as Progress from 'react-native-progress';

export default function PaymentCompleted({ navigation , route}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("PaymentActivate",{...route.params})
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <View style={{
            flex: 1,

        }}>
            <ImageBackground
                style={{
                    flex: 1,
                    width: "100%",

                }}
                resizeMode="stretch"
                source={require("../../../assets/Images/PaymentCompleted.jpg")}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                    paddingTop: 40,
                }}>
                    <TouchableOpacity style={{ justifyContent: "center" }}
                        onPress={() => {
                            navigation.navigate("Home")
                        }}
                        style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
                        <Image
                            source={require("../../../assets/Images/Back.png")}
                            style={{ width: 23, height: 23, }}
                            resizeMode="stretch"
                        />
                    </TouchableOpacity>
                    <Text style={{ color: "#7A7A7A", fontSize: 14, marginVertical: 5 }}>
                        {strings.PaymentCompletedTitle}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Info")}
                        style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
                        <Image
                            source={require("../../../assets/Images/infoicon.png")}
                            style={{ width: 23, height: 23, }}
                            resizeMode="stretch"
                        />
                    </TouchableOpacity>
                </View>

                <View style={{
                    marginTop: RFValue(130)
                }}>
                    <Text style={{
                        color: "#303C42",
                        alignSelf: "center",
                        fontWeight: "400",
                        fontSize: RFValue(30),
                        fontFamily: "BarlowSemiCondensed-Regular",
                    }}>
                        {strings.PaymentCompletedText}
                    </Text>
                </View>
                <View style={{
                    alignSelf: "center",
                    //justifyContent:"center",
                    flex: 1,

                    position: "absolute",
                    alignItems: "center"
                }}>
                    <Progress.Circle progress={100} borderWidth={5} thickness={5} color="green" style={{
                        alignSelf: "center",
                        position: "absolute",
                        // a
                        marginTop: RFValue(300)
                        //marginTop:"40%"

                    }} size={100} indeterminate={true} />
                </View>


            </ImageBackground>
        </View>
    )
}
