import React, { useEffect, useState } from "react"

import {
    View,
    Text,
    TextInput,

    Image,
    TouchableOpacity


} from "react-native"
import { Title } from "react-native-paper"
import { CheckBox } from "native-base"
import { ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Address, email, Name, name22, numbers, password, Store_data } from "../Redux/CounterSlice"


function SignUp(props) {
    const [emails, setemails] = useState('')
    const [pass,setpassword] = useState('')
    const [number, setnumber] = useState("")
    const [name, setname] = useState("")
    const [address, setaddress] = useState("")

    let dispatch = useDispatch()
    let data = useSelector(state => state)
    let aa =100
 

    const storeData = async () => {
        console.log("data", data)
        let text = emails
        let text1 = pass

        dispatch(email(text))
        dispatch(numbers(number))
        dispatch(password(text1))
        dispatch(Name(name))
        dispatch(Address(address))
        props.navigation.navigate("login")

    }


    return (

        <View style={{
            backgroundColor: "black",
            flex: 1,


        }}>

            <ScrollView>

                <TextInput
                onChangeText={(text)=>setname(text)}
                    placeholder="Enter your name" placeholderTextColor="grey"
                    style={{
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: "white",
                        marginTop: 15,
                        color: "white",
                        marginHorizontal: 50,
                        height: 45,
                        textAlign:"center"
                    }}
                ></TextInput>

                <TextInput
                    onChangeText={(text) => setemails(text)}
                    placeholder="Enter your emails id" placeholderTextColor="grey"
                    style={{
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: "white",
                        marginTop: 15,
                        color: "white",
                        marginHorizontal: 50,
                        height: 45,
                        textAlign:"center"
                    }}></TextInput>

                <TextInput
                    onChangeText={(text) =>setpassword(text)}
                    placeholder="Enter your password" placeholderTextColor="grey"
                    style={{
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: "white",
                        marginTop: 15,
                        color: "white",
                        marginHorizontal: 50,
                        height: 45,
                        textAlign:"center"
                    }}
                ></TextInput>
                
                <TextInput
                onChangeText={(text)=>setnumber(text)}
                    placeholder="Enter your phone number" placeholderTextColor="grey"
                    style={{
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: "white",
                        marginTop: 15,
                        color: "white",
                        marginHorizontal: 50,
                        height: 45,
                        textAlign:"center"
                    }}
                ></TextInput>
                <TextInput
                onChangeText={(text)=>setaddress(text)}
                    placeholder="Enter your address" placeholderTextColor="grey"
                    style={{
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: "white",
                        marginTop: 15,
                        color: "white",
                        marginHorizontal: 50,
                        height: 45,
                        textAlign:"center"
                    }}
                ></TextInput>




                <TouchableOpacity
                    onPress={() => storeData()}
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
export default SignUp