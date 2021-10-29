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

const ENTRIES1 = [
  {
    bottomText: strings.bottomText,
    image: require("../../../assets/Images/a.png"),
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

const GiftSticker = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [selectedCard, setselectedCard] = useState(true);

  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const wp = (percentage) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  };

  const slideWidth = wp(75);
  const itemHorizontalMargin = wp(0);
  const sliderWidth = viewportWidth;
  const itemWidth = slideWidth + itemHorizontalMargin * 0.1;

  const Header = () => {
    return (
      <View>
        <View style={{ paddingTop: 10 }}>
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
                style={{ width: 13, height: 12 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={{ color: "#7A7A7A", fontSize: 14 }}>
              {strings.UserCardsProgresbarTitle}
            </Text>
            <TouchableOpacity style={{ height: 35, width: 35, alignItems: 'center', justifyContent: "center" }}>
              <Image
                source={require("../../../assets/Images/infoicon.png")}
                style={{ width: 18, height: 18 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ParallaxImage
            containerStyle={styles.imageContainer}
            source={item.image}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
        </TouchableOpacity>
        <View style={{ bottom: 25 }}>
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
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 30,
          top: 10,
        }}
      >
        <Text style={{ fontSize: 12, color: "#000000", textAlign: "center" }}>
          Choose wrapping and make your
          <Text style={{ fontWeight: "bold", fontSize: 12, color: "#000000" }}>
            {" "}
            {strings.Logo}
          </Text>{" "}
          {strings.HomeTabText}
        </Text>
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingBottom: 15,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#F2F2F2",
            paddingVertical: 8,
            paddingHorizontal: 70,
            justifyContent: "center",
            borderRadius: 20,
          }}
          onPress={() => {
            navigation.navigate("PaymentScreen");
          }}
        >
          <Text style={{ textAlign: "center", color: "#303C42", fontSize: 20 }}>
            {strings.DeselectVoucher}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default GiftSticker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#303C42",
    fontFamily: "BarlowSemiCondensed-Regular",
    paddingTop: 30,
  },

  textBottom: {
    color: "#303C42",
    fontSize: 12,
    fontWeight: "300",
    fontFamily: "BarlowSemiCondensed-Regular",
    marginHorizontal: 20,
  },
  textBottom2: {
    color: "#303C42",
    fontSize: 12,
    fontWeight: "300",
    fontFamily: "BarlowSemiCondensed-Regular",
    marginHorizontal: 60,
  },
  imageContainer: {
    width: 230,
    height: 328,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    borderRadius: 12,
  },
  image: {
    resizeMode: "contain",
  },
});
