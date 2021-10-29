import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { View, Text } from 'react-native'
import { call, Value } from 'react-native-reanimated';
import { strings, timeis } from '../../Utility';
import { firebase } from '@react-native-firebase/auth';
import DefaultPreference from 'react-native-default-preference';
import { RFValue } from 'react-native-responsive-fontsize';



const SavedTab = ({ navigation }) => {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users1, setUsers1] = useState([]); // Initial empty array of users
  useEffect(() => {


    const user = firebase.auth().currentUser;


    const subscriber = firestore()
      .collection('Cards')
      .where("uid", "==", user.uid)
      .where('NFCid', "==", "")

      .onSnapshot(querySnapshot => {
        const users1 = [];

        querySnapshot.forEach(documentSnapshot => {
          let data = documentSnapshot.data()
          data.time = timeis(data)
          users1.push({
            ...data,
            key: documentSnapshot.id,
          });
        });

        setUsers1(users1);
        setLoading(false);
      });

    // call()
    return () => subscriber();
  }, []);

  function OpenSavedData(item) {

    global.id1 = item.Docid
    navigation.navigate("UserCards3", { add: false, SaveLocal: true, data: item, isedit: false })

  }

  const UserDetails = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => OpenSavedData(item)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "#E2E2E2",
                backgroundColor: "#F2F2F2",
                borderBottomWidth: 0.5,
                width: 390,
                height: 80,
                marginVertical: 20,
              }}
            >
              <View style={{ marginHorizontal: 20 }}>
                <Image
                  source={require("../../assets/Images/dummyImg.png")}
                  style={{ width: 48, height: 48, borderRadius: 80 }}
                  resizeMode="contain"
                />
                <Text style={{
                  marginHorizontal: 70,
                  bottom: 50,
                  fontWeight: "500",
                  fontSize: 14,
                  fontFamily: "BarlowSemiCondensed-Regular",
                }}>
                  {item.To}
                </Text>
                <Text style={{
                  marginHorizontal: 70, bottom: 45,
                  fontSize: 12,
                  fontWeight: "400",
                  fontFamily: "BarlowSemiCondensed-Regular",
                  width: 120,
                  color: "#7a7a7a"
                }}>
                  {(item.time)}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginHorizontal: 70,
                    bottom: 40,
                  }}
                >

                </View>
              </View>
              <Image
                source={require("../../assets/Images/Editg.png")}
                style={{
                  width: 5,
                  height: 20,
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
        marginBottom: RFValue(70)
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={users1}
      renderItem={UserDetails}
      keyExtractor={(item) => item.id}
    />
  );
};

export default SavedTab;
