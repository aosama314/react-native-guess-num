import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import Card from "./../components/Card";
import MainButton from "./../components/MainButton";
import BodyText from "../components/BodyText";

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 10, alignItems: "center" },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // marginTop: 20,
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 400,
    maxWidth: "90%",
  },
  controlsLandscapeMode: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
    padding: 10,
    marginTop: 15,
  },
  guessesListContainer: {
    flex: 1,
    // width: "80%", with scroll view component
    width: Dimensions.get("window").width > 350 ? "60%" : "80%",
  },
  scrollViewContainer: {
    flexGrow: 1,
    // alignItems: "center", with scroll view component
    justifyContent: "flex-end",
  },
  guessItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "60%", with scroll view component
    width: "100%",
  },
});

const generateRandomNumberBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomNumberBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

// const renderGuessesListItems = (guessItem, numOfRound) => (
//   <View key={guessItem} style={styles.guessItem}>
//     <BodyText>#{numOfRound}</BodyText>
//     <BodyText>{guessItem}</BodyText>
//   </View>
// );

const renderGuessesListItems = (listLength, itemData) => (
  <View style={styles.guessItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomNumberBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [deviceModeWidth, setDeviceModeWidth] = useState(
    Dimensions.get("window").width
  );
  const [deviceModeHeight, setDeviceModeHeight] = useState(
    Dimensions.get("window").height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayoutMode = () => {
      setDeviceModeWidth(Dimensions.get("window").width);
      setDeviceModeHeight(Dimensions.get("window").height);
    };

    const subscription = Dimensions.addEventListener(
      "change",
      updateLayoutMode
    );

    return () => {
      subscription?.remove();
    };
  }, [deviceModeHeight]);

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, props.userChoice, props.onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie bro 😈!", "You know that you are cheating!", [
        { text: "اتقي الله ", style: "cancel" },
      ]);

      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomNumberBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    // setGuessRounds((prevRound) => prevRound + 1);
    setPastGuesses((prevGuesses) => [nextNumber.toString(), ...prevGuesses]);
  };

  if (deviceModeHeight < 500) {
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's guess</TitleText>
        <Card style={styles.controlsLandscapeMode}>
          <MainButton
            onPressHandler={() => {
              nextGuessHandler("lower");
            }}
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton
            onPressHandler={() => {
              nextGuessHandler("greater");
            }}
          >
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </Card>
        <View style={styles.guessesListContainer}>
          <FlatList
            contentContainerStyle={styles.scrollViewContainer}
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderGuessesListItems.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleText>Opponent's guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonsContainer}>
        {/* <Button
          title="LOWER"
          onPress={() => {
            nextGuessHandler("lower");
          }}
        />
        <Button
          title="GREATER"
          onPress={() => {
            nextGuessHandler("greater");
          }}
        /> */}
        <MainButton
          onPressHandler={() => {
            nextGuessHandler("lower");
          }}
        >
          <Ionicons name="md-remove" size={24} color="white" />
          {/* LOWER */}
        </MainButton>
        <MainButton
          onPressHandler={() => {
            nextGuessHandler("greater");
          }}
        >
          {/* GREATER */}
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.guessesListContainer}>
        {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {pastGuesses.map((guess, index) =>
            renderGuessesListItems(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}

        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderGuessesListItems.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

export default GameScreen;
