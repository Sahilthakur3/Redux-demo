import React from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native'
import NfcManager, { NfcTech, Ndef, NfcEvents } from 'react-native-nfc-manager';
import { strings } from '../../../Utility';
//import NfcManagers from 'react-native-nfc-manager';

export default function NFCScreen() {

  async function initNfc() {
    await NfcManager.start();
  }


  function readNdef() {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };
    //      
    return new Promise((resolve) => {
      let tagFound = null;

      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        tagFound = tag;
        resolve(tagFound);
        NfcManager.setAlertMessageIOS('NDEF tag found');
        NfcManager.unregisterTagEvent().catch(() => 0);
      });

      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });

      NfcManager.registerTagEvent();
    });
  }


  return (
    <View style={{
      justifyContent: "center",
      flex: 1
    }}>

      <TouchableOpacity
        style={{
          alignSelf: "center"
        }} onPress={() => initNfc()}>
        <Text>
          {strings.start}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignSelf: "center"
        }} onPress={() => readNdef()}>
        <Text>
        {strings.start}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignSelf: "center"
        }} onPress={() => call()}>
        <Text>
        {strings.start}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
