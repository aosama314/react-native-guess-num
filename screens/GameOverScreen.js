import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import Card from "../components/Card";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
  landScapeModeView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  imgContainerLandScapeMode: {
    borderRadius: (Dimensions.get("window").width * 0.4) / 2,
    borderColor: "black",
    borderWidth: 2,
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
    overflow: "hidden",
  },
  resultContainerLandScapeMode: {
    width: "50%",
  },
  imgContainer: {
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderColor: "black",
    borderWidth: 2,
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  img: { width: "100%", height: "100%" },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 15 : 20,
    // marginVertical: Dimensions.get("window").height / 60,
  },
  highlight: {
    color: Colors.primaryColor,
    fontFamily: "open-sans-bold",
  },
});

const GameOverScreen = (props) => {
  const [deviceModeHeight, setDeviceModeHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const changeLayoutMode = () => {
      setDeviceModeHeight(Dimensions.get("window").height);
    };

    const subscription = Dimensions.addEventListener(
      "change",
      changeLayoutMode
    );

    return () => {
      subscription?.remove();
    };
  }, [deviceModeHeight]);

  if (deviceModeHeight < 500) {
    return (
      <ScrollView>
        <View style={styles.screen}>
          <TitleText>The Game is Over!</TitleText>
          <View style={styles.landScapeModeView}>
            <View style={styles.imgContainerLandScapeMode}>
              <Image
                source={require("../assets/success.png")}
                style={styles.img}
              />
            </View>
            <View style={styles.resultContainerLandScapeMode}>
              <Card>
                <BodyText style={styles.resultText}>
                  Your phone needed{" "}
                  <Text style={styles.highlight}>{props.guessRounds}</Text>{" "}
                  rounds to guess the number{" "}
                  <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
              </Card>
            </View>
          </View>
          <MainButton
            style={{ marginBottom: 10 }}
            onPressHandler={props.onStartNewGame}
          >
            New Game
          </MainButton>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imgContainer}>
          <Image
            source={require("../assets/success.png")}
            // fadeDuration={1000}
            // source={{
            //   uri: "https://media.istockphoto.com/photos/businessman-at-top-of-mountain-peak-holds-large-flag-picture-id1321329396?b=1&k=20&m=1321329396&s=170667a&w=0&h=uZERXRvljPoIL1VsKha3bUbrY0xoFCila8lpChias5g=",
            // }}
            style={styles.img}
          />
        </View>
        <View style={styles.resultContainer}>
          <Card>
            <BodyText style={styles.resultText}>
              Your phone needed{" "}
              <Text style={styles.highlight}>{props.guessRounds}</Text> rounds
              to guess the number{" "}
              <Text style={styles.highlight}>{props.userNumber}</Text>
            </BodyText>
            {/* <Button title="New Game!" onPress={props.onStartNewGame} /> */}
          </Card>
        </View>
        <MainButton
          style={{ marginBottom: 10 }}
          onPressHandler={props.onStartNewGame}
        >
          New Game
        </MainButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;
