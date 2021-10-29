

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { View, Text } from 'react-native'
import { call, Value } from 'react-native-reanimated';
import { strings, timeis } from '../../Utility';
import { firebase } from '@react-native-firebase/auth';
import DefaultPreference from 'react-native-default-preference';




const ReceivedTab = ({ item }) => {


  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const [users1, setUsers1] = useState([]); // Initial empty array of users

  useEffect(() => {
    MatchUser()
  }, []);





  function MatchUser() {
    const user = firebase.auth().currentUser;
    let promises = [];

    const subscriber = firestore()
      .collection('Cards')
      .where("Toid", "==", user.uid)
      .get()
      .then(querySnapshot => {
        const users1 = [];
        querySnapshot.forEach(documentSnapshot => {
          let data = documentSnapshot.data()
          promises.push(firestore()
            .collection('Users').doc(data.uid).get())
          users1.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        Promise.all(promises).then(values => {
          let index = 0
          users1.forEach(item => {
            let val = values[index]
            if (val.data() != null) {
              item.imgUrl = val.data().ImagePath
            }
            index = index + 1
          })
          setUsers1(users1);
          setLoading(false);
        });

      });


    return () => subscriber();
  }


  // const Data ={users}
  const UserDetails = ({ item }) => {
    var time = timeis(item)

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{}}>
            <TouchableOpacity
              //onPress={() =>{aaa()}}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "#E2E2E2",
                backgroundColor: "#F2F2F2",
                borderBottomWidth: 0.5,
                width: 390,
                height: 80,
                marginTop: 20,
              }}
            >
              <View style={{ marginHorizontal: 20 }}>
                <View style={{
                  //alignContent:"center",
                }}>
                  <Image
                    source={(item.imgUrl != null) ? { uri: item.imgUrl } : require("../../assets/Images/dummyImg.png")}
                    style={{ width: 48, height: 48, borderRadius: 80, }}
                    resizeMode="contain"
                  />
                </View>

                <Text style={{
                  marginHorizontal: 70,
                  bottom: 55,
                  fontWeight: "500",
                  fontSize: 14,
                  fontFamily: "BarlowSemiCondensed-Regular",
                }}>
                  {item.To}
                </Text>
                <Text style={{
                  marginHorizontal: 70, bottom: 50,
                  fontSize: 12,
                  fontWeight: "400",
                  fontFamily: "BarlowSemiCondensed-Regular",
                  width: 120,
                  color: "#7a7a7a"
                }}>
                  {time}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginHorizontal: 70,
                    bottom: 45,
                  }}
                >
                  <Image

                    source={require("../../assets/Images/icon1.png")}
                    style={{ width: 27, height: 15 }}
                    resizeMode="contain"
                  />
                  <Image
                    source={require("../../assets/Images/icon2.png")}
                    style={{ width: 27, height: 15, marginHorizontal: 5 }}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <Image
                source={require("../../assets/Images/next2.png")}
                style={{
                  width: 5,
                  height: 10,
                  top: 25,
                  paddingRight: 80,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };
  return (
    <FlatList
      style={{
        marginBottom: 70
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={users1}
      renderItem={UserDetails}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ReceivedTab;
