import React, { useEffect, useState } from "react"

import {
    View,
    Text,
    TextInput,

   
    TouchableOpacity


} from "react-native"

import { ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"

function LoginScreen(props) {

    const [val2, setvalue2] = useState('')
    const [val3, setvalue3] = useState('')

    let dispatch = useDispatch()
    let data = useSelector(state => state)
    console.log("data", data)

    const storeData = async () => {
        // console.log(data.Login.name)

        if (val2 == null && val3 == null) {
            alert = ('enter email and password')

        }
        else {
            if (data.counter.email == val2 && data.counter.pass == val3) {
                console.log(data.counter.email, data.counter.pass)
                // props.navigation.navigate("dashboard") 
                alert("LoginSuccessfully")
            }
            else {
                alert('check email and password')
            }
        }

    }


    return (

        <View style={{
            backgroundColor: "black",
            flex: 1,


        }}>

            <ScrollView>


                <TextInput
                    onChangeText={(val2) => setvalue2(val2)}
                    placeholder="Enter your email id" placeholderTextColor="grey"
                    style={{
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: "white",
                        marginTop: 30,
                        color: "white",
                        marginHorizontal: 50,
                        height:50
                    }}></TextInput>

                <TextInput
                    onChangeText={(val3) => setvalue3(val3)}
                    placeholder="Enter your password" placeholderTextColor="grey"
                    style={{
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: "white",
                        marginTop: 30,
                        color: "white",
                        marginHorizontal: 50,
                        height:50
                    }}
                ></TextInput>

                <View style={{
                    flexDirection: "row", justifyContent: "space-between", marginTop: 20,
                    marginHorizontal: 50
                }}>

                    <View style={{ flexDirection: "row", }}>


                        <Text style={{ color: "white", marginLeft: 12, fontSize: 15 }}>Remember</Text>
                    </View>


                    <Text style={{ color: "white", fontSize: 15 }}>Forgot password?</Text>
                </View>
                <Text style={{ color: "white", fontSize: 15 }}>
{data.counter.pass}                    </Text>
                <TouchableOpacity onPress={() => storeData()}
                    style={{
                        backgroundColor: "#2E7C87",
                        height: 50,
                        borderRadius: 6,
                        justifyContent: "center",
                        marginTop: 20
                        , marginHorizontal: 50
                    }}>
                    <Text
                        style={{
                            color: "white",
                            alignSelf: "center",
                            fontSize: 20
                        }}>
                        Login
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => props.navigation.navigate("signUp")}
                    style={{
                        backgroundColor: "#2E7C87",
                        height: 50,
                        borderRadius: 6,
                        justifyContent: "center",
                        marginTop: 40,
                        marginHorizontal: 50
                    }}>
                    <Text
                        style={{
                            color: "white",
                            alignSelf: "center",
                            fontSize: 20
                        }}>
                        SignUp
                    </Text>
                </TouchableOpacity>



            </ScrollView>


        </View>
    )
}
export default LoginScreen