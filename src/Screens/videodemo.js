
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native'

import Videos from 'react-native-video';




import { useIsFocused } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";



const editvideo = ({ navigation, route }) => {
    const isFocused = useIsFocused();

    const [Video, setVideo] = useState("https://firebasestorage.googleapis.com:443/v0/b/stiickycom.appspot.com/o/Cards%2Fp0D6dS5A7DgKg24irkr2dv5MdIF3%2FNDUV9Fqc23EKUbDDM8yU%2FVideo%2FNDUV9Fqc23EKUbDDM8yU_Video.mp4?alt=media&token=cd5c7ec4-227b-4f79-ba93-702013e5737f")
    const [activate, setactivate] = useState("");
    const [pause, setpause] = useState(false);
    const [edit, setedit] = useState('');
    const [modal, setmodal] = useState(true)

   // const [imagePath, setimagePath] = useState(route.params.ImagePath)
   // const [isImage, setisImage] = useState(route.params != null ? route.params.isImage : "")

    // useEffect(() => {
    //     let data = route.params.data

    //     setimagePath(data.ImagePath)
    //     setisImage(data.isImage)
    //     setVideo(route.params.data.VideoPath)
    //     setedit(route.params.edit)


    // }, []);

    useEffect(() => {
        if (modal == true) {
            setmodal(true)
        }

       // let data = route.params.data
       // if (isFocused) {
       //     setVideo(route.params.data.VideoPath)
       //     setedit(route.params.edit)
       // }
    }, [isFocused]);


    function AddVideo() {
        let obj = route.params.data
        obj.VideoPath = Video
        edit ? navigation.navigate('UserCards3', { data: obj, add: route.params.add }) : navigation.navigate('AddMoneyScreen', { data: obj, BackGroundIndex: route.params.BackGroundIndex })
    }
    return (


        <View style={{
            flex: 1,
            backgroundColor: "black"
        }}>
            <View style={{
                justifyContent: "space-evenly",
                flexDirection: "column",
                //zs flex: 1,
                // marginTop: 40
            }}>
                <View>
                    <Videos
                        source={{ uri: Video }}   // Can be a URL or a local file.
                        style={{
                            width: responsiveWidth(100),
                            height: responsiveHeight(88),
                            borderRadius: 20,
                            marginTop: 30,
                        }}
                       // controls={true}
                        //fullscreen={false}
                        //playInBackground={false}
                        //playWhenInactive={falser}


                        ref={(ref) => {
                            this.player = ref
                        }}
                        >
                        </Videos>

                    <View style={{

                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        position: "absolute",
                        marginTop: RFValue(50),
                        height: RFValue(50),
                        width: responsiveWidth(100)
                    }}>
                        {!edit ? <TouchableOpacity
                            onPress={() => navigation.navigate("VideoScreen")}
                            style={{ height: 30, width: 30, }}>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30,
                                    tintColor: "white"

                                    //backgroundColor:"red",

                                }}
                                source={require("../assets/Images/Back.png")}>

                            </Image>

                        </TouchableOpacity> : null}
                        {modal ? <TouchableOpacity></TouchableOpacity> : <TouchableOpacity>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                                source={require("../assets/Images/trim.png")}>

                            </Image>

                        </TouchableOpacity>}
                        {modal ? <TouchableOpacity></TouchableOpacity> : <TouchableOpacity>
                            <Image
                                style={{
                                    height: 30,
                                    width: 38
                                }}
                                source={require("../assets/Images/addVideo.png")}>

                            </Image>

                        </TouchableOpacity>}
                        {modal ? <TouchableOpacity></TouchableOpacity> : <TouchableOpacity>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                                source={require("../assets/Images/Effect.png")}>

                            </Image>

                        </TouchableOpacity>}
                        {modal ? <TouchableOpacity></TouchableOpacity> : <TouchableOpacity>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                                source={require("../assets/Images/Draw.png")}>

                            </Image>

                        </TouchableOpacity>}
                        {modal ? <TouchableOpacity></TouchableOpacity> : <TouchableOpacity>
                            <Image
                                style={{
                                    height: 30,
                                    width: 38
                                }}
                                source={require("../assets/Images/AddText.png")}>

                            </Image>

                        </TouchableOpacity>}
                        <TouchableOpacity>
                            <Image
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                                source={require("../assets/Images/cross.png")}>

                            </Image>

                        </TouchableOpacity>
                    </View>

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
                        <Image style={{
                            height: 32,
                            width: 32,
                            marginBottom: -10

                        }} source={require("../assets/Images/Download.png")}>

                        </Image>
                        <Image style={{
                            height: 32,
                            width: 43,
                            marginBottom: -10,
                            marginLeft: 20

                        }} source={require("../assets/Images/mute.png")}>

                        </Image>

                    </View>}

                    <TouchableOpacity

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

                           continue
                        </Text>
                    </TouchableOpacity>

                </View>


            </View>

            <Modal animationType="fade" transparent={true} style={{
                //backgroundColor:"black"
                // shadowColor:"#000",

            }} visible={modal}>

                <View style={{
                    flex: 1,
                    // backfaceVisibility: "visible",
                    backgroundColor: "black",

                    opacity: 0.8,

                    // shadowColor:"#000",
                    //shadowOpacity: 0.25,
                    //shadowRadius: 4,
                    //elevation: 5
                }} >
                    <TouchableOpacity
                        onPress={() => setmodal(false)}
                        style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            flex: 1,
                            //justifyContent: "center"
                        }}>
                        <View style={{

                            flexDirection: "row",
                            //justifyContent: "space-evenly",
                            // position: "absolute",
                            marginTop: RFValue(49),
                            height: RFValue(50),
                            width: responsiveWidth(100),
                            marginHorizontal: 65
                        }}>





                            <TouchableOpacity style={{
                                // marginLeft:20
                            }}>
                                <Image
                                    style={{
                                        height: 30,
                                        width: 30,
                                        marginLeft: 2
                                    }}
                                    source={require("../assets/Images/trim.png")}>

                                </Image>
                                <Image style={{
                                    width: 22, height: 25, alignSelf: "center"
                                }} source={require("../assets/Images/trimarrow.png")}>

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

                            <TouchableOpacity style={{
                                // height: 30,
                                // width: 38,
                                marginLeft: 15
                            }}>

                                <Image
                                    style={{
                                        height: 30,
                                        width: 38,
                                    }}
                                    source={require("../assets/Images/addVideo.png")}>

                                </Image>
                                <Image style={{
                                    width: 22, height: 68, alignSelf: "center", marginLeft: -10
                                }} source={require("../assets/Images/addvideoarrow.png")}>

                                </Image>
                                <Text style={{
                                    color: "white",
                                    // alignSelf: "center",
                                    textAlign: "center",
                                    opacity: 1,
                                   // fontFamily: 'BarlowSemiCondensed-Regular',
                                    fontSize: 15,
                                    fontWeight: "500",
                                    marginLeft: -10
                                }}>
                                    Add Video
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                marginLeft: 15
                            }}>
                                <Image
                                    style={{
                                        height: 30,
                                        width: 30,

                                    }}
                                    source={require("../assets/Images/Effect.png")}>

                                </Image>
                                <Image style={{
                                    width: 22, height: 25, alignSelf: "center", marginLeft: -15
                                }} source={require("../assets/Images/trimarrow.png")}>

                                </Image>
                                <Text style={{
                                    color: "white",
                                    // alignSelf: "center",
                                    opacity: 1,
                                   // fontFamily: 'BarlowSemiCondensed-Regular',
                                    fontSize: 15,
                                    fontWeight: "500",
                                    marginLeft: -15
                                }}>
                                    Add effect
                                </Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                marginLeft: 1
                            }}>
                                <Image
                                    style={{
                                        height: 30,
                                        width: 30,

                                    }}
                                    source={require("../assets/Images/Draw.png")}>

                                </Image>
                                <Image style={{
                                    width: 22, height: 68, alignSelf: "center",
                                }} source={require("../assets/Images/addvideoarrow.png")}>

                                </Image>
                                <Text style={{
                                    color: "white",
                                    alignSelf: "center",
                                    textAlign: "center",
                                    opacity: 1,
                                   // fontFamily: 'BarlowSemiCondensed-Regular',
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
                                    source={require("../assets/Images/AddText.png")}>

                                </Image>
                                <Image style={{
                                    width: 22, height: 25, alignSelf: "center", marginLeft: -15
                                }} source={require("../assets/Images/trimarrow.png")}>

                                </Image>
                                <Text style={{
                                    color: "white",
                                    // alignSelf: "center",
                                    opacity: 1,
                                   // fontFamily: 'BarlowSemiCondensed-Regular',
                                    fontSize: 15,
                                    fontWeight: "500",
                                    marginLeft: -15
                                }}>
                                    Add text
                                </Text>
                            </TouchableOpacity>





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
                                    //fontFamily: 'BarlowSemiCondensed-Regular',
                                    fontSize: 15,
                                    fontWeight: "500",
                                    //marginBottom: 10

                                }}>
                                    Save
                                </Text>
                                <Image style={{
                                    width: 22, height: 25, alignSelf: "center", marginBottom: 10
                                }} source={require("../assets/Images/saveArrow.png")}>

                                </Image>
                                <Image style={{
                                    height: 32,
                                    width: 32,
                                    marginBottom: 5

                                }} source={require("../assets/Images/Download.png")}>

                                </Image>
                            </View>
                            <View style={{
                                marginLeft: 20
                            }}><Text style={{
                                color: "white",
                                alignSelf: "center",
                                opacity: 1,
                               // fontFamily: 'BarlowSemiCondensed-Regular',
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
                                }} source={require("../assets/Images/soundarrow.png")}>

                                </Image>

                                <Image style={{
                                    height: 32,
                                    width: 43,

                                }} source={require("../assets/Images/mute.png")}>

                                </Image>
                            </View>
                        </View>


                    </TouchableOpacity>
                </View>

            </Modal>
        </View>


    )
}
export default editvideo