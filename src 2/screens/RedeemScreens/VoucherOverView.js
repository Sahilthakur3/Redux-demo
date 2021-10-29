VoucherOverView

import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
} from "react-native";
import { strings } from "../../../Utility";
import { RFValue } from "react-native-responsive-fontsize";

const ENTRIES1 = [
    require("../../../assets/Images/a.png"),
    require("../../../assets/Images/CardImgs2.png"),
    require("../../../assets/Images/CardImgs3.png"),
    require("../../../assets/Images/CardImgs1.png"),
    require("../../../assets/Images/CardImgs1.png"),

];


const VoucherOverView = ({ navigation, route }) => {
   
    const [VoucherIndex, setVoucherIndex] = useState(route.params.VoucherIndex)

    

    useEffect(() => {
       //setVoucherIndex(route.params.VoucherIndex)
    }, []);

    

    

    const Header = () => {
        return (
            <View>
                <View style={{ paddingTop: 40 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginHorizontal: 20,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {

                                navigation.goBack();
                            }}
                            style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
                            <Image
                                source={require("../../../assets/Images/Back.png")}
                                style={{ width: 23, height: 23, }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={{ height: 35, alignItems: 'center', justifyContent: "center" }}>
                            <Text style={{ color: "#7A7A7A", fontSize: 14 }}>
                                {strings.Voucher}
                            </Text>
                        </View>

                        <TouchableOpacity 
                         onPress={()=>navigation.navigate("Info")}
                        style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
                            <Image
                                source={require("../../../assets/Images/infoicon.png")}
                                style={{ width: 23, height: 23, }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

   
    return (
        <View style={styles.container}>
            <View>
                <Header />
            </View>
            
            <Image 
            source= {ENTRIES1[VoucherIndex] ? ENTRIES1[VoucherIndex]:null}
            style={{
                height:500,
                width:"80%",
                alignSelf:"center",
                marginTop:RFValue(100)
            }}></Image>
           
          
        </View>
    );
};
export default VoucherOverView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        //marginTop:50
        //justifyContent: "space-around",
    },
    
});
