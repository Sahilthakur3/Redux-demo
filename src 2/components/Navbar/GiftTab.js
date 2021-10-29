import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ReceivedTab from '../../Screen2/ReceivedTab';
import SavedTab from '../../Screen2/SavedTab';
import GivenTab from '../../Screen2/GivenTab';

import { View, Text } from 'react-native';
const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{
        backgroundColor: "white"
      }}>
        <Text style={{
          alignSelf: "center",
          marginTop: 40,
          marginBottom: 10,
          color: "#7a7a7a",
          fontSize: 15,
          fontWeight: "500",
          fontFamily: "BarlowSemiCondensed-Regular",


        }}>
          Gavebord
        </Text>

      </View>


      <Tab.Navigator
        tabBarOptions={{

          tabStyle: { marginTop: 0, },
          indicatorStyle: {
            borderBottomColor: '#303C42',
            borderBottomWidth: 3,
          },

        }}>
        <Tab.Screen name="Received" component={ReceivedTab} />
        <Tab.Screen name="Given" component={GivenTab} />
        <Tab.Screen name="Saved" component={SavedTab}
        />
      </Tab.Navigator>
    </View>
  );
}

export default App;
