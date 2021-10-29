import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, DeviceEventEmitter, Modal } from "react-native";
import { height, justifyContent, size } from "styled-system";
import { strings } from "../../../Utility";
import SwipeButton from 'rn-swipe-button';
import { RFValue } from "react-native-responsive-fontsize";
import NfcManager, { Ndef } from 'react-native-nfc-manager';
import NfcProxy from '../../components/NFCManager/NfcProxy';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ReadModal from 'react-native-modal';
import { moderateScale, verticalScale } from '../../../Scaling_utils';

const RTD_MAP = {
  TEXT: 'T', // [0x54]
  URI: 'U', // [0x55]
  SMART_POSTER: 'Sp', // [0x53, 0x70]
  ALTERNATIVE_CARRIER: 'ac', //[0x61, 0x63]
  HANDOVER_CARRIER: 'Hc', // [0x48, 0x63]
  HANDOVER_REQUEST: 'Hr', // [0x48, 0x72]
  HANDOVER_SELECT: 'Hs', // [0x48, 0x73]
};

const PaymentActivate = ({ navigation, route }) => {
  const [showNFCPopupAndroidOnly, setshowNFCPopupAndroidOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFailed, setshowFailed] = useState(false);
  const [showFailedText, setshowFailedText] = useState('');
  const [showOverlay, setshowOverlay] = useState(false);
  useEffect(() => {

    async function initNfc() {
      try {
        await NfcProxy.init();
        await NfcProxy.isEnabled();
      } catch (ex) {
        showAlert(strings.goodTry, strings.unsupported);
      }
    }

    initNfc();
  }, []);

  const extention = filename => {
    return /[/]/.exec(filename) ? /[^/]+$/.exec(filename) : undefined;
  };
  // function ModalClose(c) {
  //   setshowIAPModal(false);
  //   setshowOverlay(false);
  // }

  const readNFC = async () => {
    try {
      const supported = await NfcManager.isSupported();
      if (!supported) {
        showAlert(strings.goodTry, strings.unsupported);
        return;
      }
      if (Platform.OS === 'android') {
        setshowNFCPopupAndroidOnly(true);
      }
      const tag = await NfcProxy.readTag();
      if (tag == null) {
        // showAlert('Good try!', 'Invalid NFC chip. Please try another one.');
        return;
      }
      setshowNFCPopupAndroidOnly(false);
      const ndef =
        Array.isArray(tag.ndefMessage) && tag.ndefMessage.length > 0
          ? tag.ndefMessage[0]
          : null;
      const rtdName = rtdValueToName(ndef.type);
      if (ndef.tnf === Ndef.TNF_WELL_KNOWN) {
        if (rtdName === 'URI') {
          let uri = Ndef.uri.decodePayload(ndef.payload);
          console.log('uri', uri);
          // alert(uri);
          setTimeout(() => {
            saveChipDetails(uri);
          }, 2300);

        }
        else {
          showAlert(strings.goodTry, strings.invalidChip);
        }
      }
      else {
        showAlert(strings.goodTry, strings.invalidChip);
      }
    } catch (ex) {
      console.log('ex', ex);
      showAlert(strings.goodTry, strings.invalidChip);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  const saveChipDetails = uri => {
    // let aa = 10
    //if(aa>0){
    console.log('saving');
    if (validURL(uri)) {
      let nfcCode = extention(uri);
      if (nfcCode.length > 0) {
        nfcCode = nfcCode[0];
      } else {
        showMessage(strings.appName, strings.invalidChip);
        return;
      }
      firestore()
        .collection('Cards')
        .where('NFCid', '==', nfcCode)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size == 0) {
            SaveNFCId(uri, nfcCode);
          }
          else
          {
            showMessage(strings.appName, strings.belongs);
          }
        })
      // const user = firebase.auth().currentUser;
      //let NFCCode = "123456"
      // firestore()
      //   .collection('Cards')

      //   .where('NFCid', '==', nfcCode)
      //   //.where('NFCid', '==', NFCCode)
      //   .get()
      //   .then(querySnapshot => {
      //     if (querySnapshot.size == 0) {

      //       SaveNFCId(uri, nfcCode);
      //     } else {
      //       setshowFailedText('This chip is belongs to other card');
      //       setshowFailed(true);
      //       setTimeout(() => {
      //         setshowFailed(false);
      //       }, 3000);

      //     }
      //   });
    } else {
      setshowFailedText(strings.invalidChip);
      setshowFailed(true);
      setTimeout(() => {
        setshowFailed(false);
      }, 3000);
    }
  };

  const showMessage = (title, msg) => {
    Alert.alert(
      title,
      msg,
      [
        {
          text: 'OK',
          style: 'Cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  function rtdValueToName(value) {
    value = value.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    for (let name in RTD_MAP) {
      if (value === RTD_MAP[name]) {
        return name;
      }
    }
    return null;
  }

  function validURL(url) {
    var hostname;

    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    console.log(hostname);
    return (hostname == 'www.stiicky.com' || hostname == 'stiicky.com');
  }

  function SaveNFCId(link, code) {

    firestore()
      .collection('Cards')
      .doc(route.params.cardid)
      .update({
        NFClink: link,
        NFCid: code,
        //NFCid: "123456",
        CardStatus: 'Activated',
      })
      .then(() => {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          setTimeout(() => {
            navigation.navigate("ActivationScr")
          }, 100);
        }, 3000);
      });
  }

  const showAlert = (title, msg) => {
    Alert.alert(
      title,
      msg,
      [
        {
          text: 'Ok',
          style: 'Cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  let forceResetLastButton = null;
  const showLoader = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', borderRadius: 20 }}>
            <Image
              resizeMode={'contain'}
              style={{ height: 200, width: 200, borderRadius: 20 }}
              source={require('./../../../assets/Images/successAnim.gif')}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const showFailedLoader = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={showFailed}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000080',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              backgroundColor: 'white',
              height: 150,
              width: 150,
            }}>
            <Image
              resizeMode={'contain'}
              style={{ height: 100, width: 100, borderRadius: 20 }}
              source={require('./../../../assets/Images/failedAnim.gif')}
            />
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              height: 100,
              width: '80%',
            }}>
            <Text numberOfLines={2} style={{ color: 'white', fontSize: 17 }}>
              {showFailedText}
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

  const CheckoutButton = () => {
    return (
      <View style={{ width: 42, height: 42, backgroundColor: '#303C42', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{
          height: 40,
          width: 40
        }} source={require("../../../assets/Images/SwipeButton.png")}></Image>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FAFAFA',
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          paddingTop: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            //navigation.navigate("PaymentScreen");
            Alert.alert(
              strings.areYouSure,
              "",
              [
                {
                  text: strings.No,
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: strings.Yes, onPress: () => navigation.navigate("Home") }
              ]
            );

          }}
          style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
          <Image
            source={require("../../../assets/Images/Back.png")}
            style={{ width: 23, height: 23, }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Text style={{ color: "#7A7A7A", fontSize: 14, marginVertical: 7 }}>
          {strings.Activation}
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
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../../assets/Images/Activation.png")}
          style={{ width: 300, height: 350 }}
          resizeMode="stretch"
        />
      </View>
      <View
        style={{ flexDirection: "row", marginHorizontal: 60, marginTop: 30 }}
      >
        <Text style={{ textAlign: "center" }}>
          {strings.PaymentActivateText1}
          <Text style={{ fontWeight: "bold" }}>{strings.Logo}</Text>
          {strings.PaymentActivateText2}
        </Text>
      </View>
      <SwipeButton
        containerStyles={{ alignSelf: "center", marginBottom: 30 }}
        disabled={false}
        resetAfterSuccessAnimDuration={10}
        swipeSuccessThreshold={30}
        height={RFValue(37)}
        width={300}
        title={strings.ActivatebtnText}
        titleColor="black"

        shouldResetAfterSuccess={true}

        forceReset={reset => {
          forceResetLastButton = reset
        }}
        onSwipeSuccess={() => {
          readNFC();
        }}

        railFillBackgroundColor="#303C42" //(Optional)


        railFillBorderColor="#303C42" //(Optional)
        thumbIconBackgroundColor="black" //(Optional)
        thumbIconBorderColor="transparent" //(Optional)
        railBackgroundColor="#F2F2F2" //(Optional)
        railBorderColor="#F2F2F2" //(Optional)
        thumbIconComponent={CheckoutButton}
      />
      {showLoader()}
      {showFailedLoader()}
      <ReadModal
        isVisible={showNFCPopupAndroidOnly}
        onBackdropPress={() => {
          setshowNFCPopupAndroidOnly(false);
          NfcManager.unregisterTagEvent().catch(() => 0);
          NfcManager.cancelTechnologyRequest().catch(() => 0);

        }}>

        <View style={{
          width: '100%', height: 300, position: 'absolute',
          justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'white', bottom: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20

        }}>

          <Text style={{ fontFamily: 'SFProDisplay-SemiBold', fontSize: verticalScale(16), color: 'gray' }}>{strings.ReadytoScan}</Text>

          <Image
            resizeMode={'contain'}
            style={{ height: 150, width: 150 }}
            source={require('../../../assets/Images/nfcScan.gif')}
          />

          <Text style={{ fontSize: verticalScale(12) }}>{strings.TapNFC}</Text>
          <TouchableOpacity
            style={{ backgroundColor: 'lightgrey', borderRadius: 10, width: '80%', alignItems: 'center', justifyContent: 'center', height: 40 }}
            onPress={() => {
              setshowNFCPopupAndroidOnly(false);
              NfcManager.unregisterTagEvent().catch(() => 0);
              NfcManager.cancelTechnologyRequest().catch(() => 0);
            }}>
            <Text style={{ fontSize: verticalScale(12), fontFamily: 'SFProDisplay-SemiBold' }}>{strings.cancel}</Text>
          </TouchableOpacity>

        </View>

      </ReadModal>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  Buttontext: {
    color: "#303C42",
    fontSize: 20,
    textAlign: "center",
    alignItems: "center",
  },
  button: {
    width: 270,
    height: 40,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PaymentActivate;
