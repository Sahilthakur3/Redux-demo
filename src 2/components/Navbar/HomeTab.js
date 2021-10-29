import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Avatar } from "react-native-paper";
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DefaultPreference from 'react-native-default-preference';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Modal,
  Alert
} from "react-native";
import { strings } from "../../../Utility";
import NfcManager, { Ndef } from 'react-native-nfc-manager';
import NfcProxy from '../../components/NFCManager/NfcProxy';
import ReadModal from 'react-native-modal';

import { moderateScale, verticalScale } from '../../../Scaling_utils';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { RFValue } from "react-native-responsive-fontsize";

const ENTRIES1 = [
  {
    bottomText: strings.bottomText,
    image: require("../../../assets/Images/CardImgs1.png"),
  },
  {
    bottomText: strings.bottomText,

    image: require("../../../assets/Images/CardImgs2.png"),
  },
  {
    bottomText: strings.bottomText,
    image: require("../../../assets/Images/CardImgs3.png"),
  },
  {
    bottomText: strings.bottomText,
    image: require("../../../assets/Images/CardImgs1.png"),
  },
  {
    bottomText: strings.bottomText,
    image: require("../../../assets/Images/CardImgs1.png"),
  },
];

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

const RTD_MAP = {
  TEXT: 'T', // [0x54]
  URI: 'U', // [0x55]
  SMART_POSTER: 'Sp', // [0x53, 0x70]
  ALTERNATIVE_CARRIER: 'ac', //[0x61, 0x63]
  HANDOVER_CARRIER: 'Hc', // [0x48, 0x63]
  HANDOVER_REQUEST: 'Hr', // [0x48, 0x72]
  HANDOVER_SELECT: 'Hs', // [0x48, 0x73]
};

const HomeTab = ({ navigation }) => {

  const [entries, setEntries] = useState([]);
  const [selectedCard, setselectedCard] = useState(true);
  const [name, setname] = useState("")
  const [img, setimg] = useState()
  const carouselRef = useRef(null);
  const [btn, setbtn] = useState(true)
  const [showNFCPopupAndroidOnly, setshowNFCPopupAndroidOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFailed, setshowFailed] = useState(false);
  const [showFailedText, setshowFailedText] = useState('');

  const wp = (percentage) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  };
  const extention = filename => {
    return /[/]/.exec(filename) ? /[^/]+$/.exec(filename) : undefined;
  };
  const slideWidth = wp(RFValue(65));
  const itemHorizontalMargin = wp(0);
  const sliderWidth = viewportWidth;
  const itemWidth = slideWidth + itemHorizontalMargin * 0.1;

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user == null) {
      return
    }
    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setname(documentSnapshot.data().Name)
          setimg(documentSnapshot.data().ImagePath)
          DefaultPreference.set('name', documentSnapshot.data().Name).then(function () {
          });
        }
      })
    async function initNfc() {
      try {
        await NfcProxy.init();
        await NfcProxy.isEnabled();
      } catch (ex) {
        Alert.alert('ERROR', 'This chip is not valid for Stiicky', [{ text: 'OK' }]);
      }
    }
    initNfc();
    setEntries(ENTRIES1);
    return unsubscribe;
  }, [navigation]);



  const readNFC = async () => {
    try {

      const supported = await NfcManager.isSupported();

      if (!supported) {
        showAlert('Good try!', 'Your device is not NFC supported');
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
          // alert(uri);
          setTimeout(() => {
            if (validURL(uri)) {
              console.log('url is ', uri);
              let nfcCode = extention(uri);

              if (nfcCode.length > 0) {
                nfcCode = nfcCode[0];
              } else {
                showMessage('Stiicky', 'This chip is not valid for Stiicky');
                return;
              }
              setTimeout(() => {
                firestore()
                  .collection('Cards')
                  .where('NFCid', '==', nfcCode)
                  .get()
                  .then(querySnapshot => {
                    if (querySnapshot.size > 0) {
                      querySnapshot.forEach(documentSnapshot => {
                        let data = documentSnapshot.data()
                        navigation.navigate("Redeem", { item: data, preview: false })
                      });

                    }
                    else {
                      showMessage('Stiicky', 'this chip is not yet registered with any card');
                    }
                  })
              }, 2300);
            }
            else {
              setshowFailedText('This chip is invalid');
              setshowFailed(true);
              setTimeout(() => {
                setshowFailed(false);
              }, 3000);
            }
          }, 500);

        }
        else {
          showAlert('Good try!', 'NFC chip seems invalid');
        }
      }
      else {
        showAlert('Good try!', 'NFC chip seems invalid');
      }
    } catch (ex) {
      console.log('ex', ex);
      showAlert('Good try!', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
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


  const ButtonClick = (give) => {
    setselectedCard(give ? true : false);
  };

  const Header = () => {

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 30,
          }}
        >
          <View>
            <View>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 12,
                  fontFamily: "BarlowSemiCondensed-Regular",
                }}
              >
                Hello again
              </Text>
            </View>
            <Text
              style={{
                color: "#014141",
                fontSize: 25,
                fontFamily: "BarlowSemiCondensed-Regular",
                fontWeight: "400",
              }}
            >
              {name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => { navigation.navigate("ProfileTab") }
            }>
            <Avatar.Image style={{ backgroundColor: "#E2E2E2" }} size={50} source={img ? { uri: img } : require("../../../assets/Images/Defaultimg.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  function Redeem() {
    // firestore()
    //   .collection('Cards')
    //   .where('NFCid', '==', '7889001464')
    //   .get()
    //   .then(querySnapshot => {
    //     if (querySnapshot.size > 0) {
    //       querySnapshot.forEach(documentSnapshot => {
    //         let data = documentSnapshot.data()
    //         navigation.navigate("Redeem", { item: data, preview: false })
    //       });

    //     }
    //     else {
    //       showMessage('Stiicky', 'this chip is not yet registered with any card');
    //     }
    //   })
    readNFC();
  }

  const HeaderButton = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              ButtonClick(true);
            }}
            style={{
              width: 140,
              height: 50,
              backgroundColor: selectedCard ? "#F2F2F2" : "#FFFFFF",
              borderRadius: 20,
              justifyContent: "center",
              fontFamily: "BarlowSemiCondensed-Regular",
              fontWeight: "500",
            }}
          >
            <Text style={styles.bottonText}>{strings.GiveButton}</Text>
          </TouchableOpacity>

          {/* redeem button */}
          <TouchableOpacity
            onPress={() =>
              Redeem()

            }
            style={{
              width: 140,
              height: 50,
              backgroundColor: btn ? "#FFFFFF" : "#F2F2F2",
              borderRadius: 20,
              justifyContent: "center",
              fontFamily: "BarlowSemiCondensed-Regular",
              fontWeight: "500",
            }}
          >
            <Text style={styles.bottonText}>{strings.RedeemButton}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={{ marginBottom: 60 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SkipScreen", { BackGroundIndex: index });
          }}
        >
          <ParallaxImage
            containerStyle={styles.imageContainer}
            source={item.image}
            style={styles.image}
            parallaxFactor={0.0}
            {...parallaxProps}
          />
        </TouchableOpacity>
        <View style={{ bottom: 30, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 25 }}>
          <Text style={styles.textBottom}>{strings.HomeTabottomText}</Text>
          <Text style={styles.textBottom2}>{strings.HomeTabbottomText2}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Header />
        <View style={{ paddingTop: 20 }}>
          <HeaderButton />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 30,
        }}
      >
        <Text style={styles.title}>{strings.HomeTabTitle}</Text>
      </View>
      <View>
        <Carousel
          ref={carouselRef}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          data={entries}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      </View>

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

          <Text style={{ fontFamily: 'SFProDisplay-SemiBold', fontSize: verticalScale(16), color: 'gray' }}>Ready to Scan</Text>

          <Image
            resizeMode={'contain'}
            style={{ height: 150, width: 150 }}
            source={require('../../../assets/Images/nfcScan.gif')}
          />

          <Text style={{ fontSize: verticalScale(12) }}>Please tap NFC tags</Text>
          <TouchableOpacity
            style={{ backgroundColor: 'lightgrey', borderRadius: 10, width: '80%', alignItems: 'center', justifyContent: 'center', height: 40 }}
            onPress={() => {
              setshowNFCPopupAndroidOnly(false);
              NfcManager.unregisterTagEvent().catch(() => 0);
              NfcManager.cancelTechnologyRequest().catch(() => 0);
            }}>
            <Text style={{ fontSize: verticalScale(12), fontFamily: 'SFProDisplay-SemiBold' }}>Cancel</Text>
          </TouchableOpacity>

        </View>

      </ReadModal>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#303C42",
    fontFamily: "BarlowSemiCondensed-Regular",
    paddingTop: RFValue(30),
  },
  bottonText: {
    textAlign: "center",
    color: "#303C42",
    fontSize: 20,
  },
  bottomText2: {
    color: "#303C42",
    fontSize: 12,
    fontWeight: "300",
    fontFamily: "BarlowSemiCondensed-Regular",
  },
  textBottom: {
    color: "#303C42",
    fontSize: 12,
    fontWeight: "300",
    fontFamily: "BarlowSemiCondensed-Regular",
    // marginHorizontal: 20,
  },
  textBottom2: {
    color: "#303C42",
    fontSize: 12,
    fontWeight: "300",
    fontFamily: "BarlowSemiCondensed-Regular",
    //marginHorizontal: RFValue(60),
  },
  imageContainer: {
    width: RFValue(250),
    height: RFValue(368),
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    borderRadius: 12,
  },
  image: {
    resizeMode: "contain",
  },
});
