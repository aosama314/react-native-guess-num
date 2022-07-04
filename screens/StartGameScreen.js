import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import InputField from "../components/InputField";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import Card from "./../components/Card";
import BodyText from "./../components/BodyText";
import MainButton from "./../components/MainButton";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  // inputContainer: {
  //   width: 300,
  //   maxWidth: "80%",
  //   alignItems: "center",
  // },
  // With flexible width
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  // button: {
  //   // width: 100,
  //   width: Dimensions.get("window").width / 3.5,
  // },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

const StartGameScreen = (props) => {
  // console.log(Dimensions.get("window").width / 2.5);
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 3.5
  );

  const numberInputHandler = (inputValue) => {
    setEnteredValue(inputValue.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setConfirmed(false);
    setEnteredValue("");
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 3.5);
    };

    const subscription = Dimensions.addEventListener("change", updateLayout);

    return () => {
      subscription?.remove();
    };
  }, [buttonWidth]);

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    console.log(typeof chosenNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Please enter a Number between 1 and 99.",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: resetInputHandler,
          },
        ]
      );
      return;
    }

    setSelectedNumber(chosenNumber);
    setConfirmed(true);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <TitleText>You entered</TitleText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <View>
          {/* <Button
            title="Start Game!"
            onPress={() => props.onStartGame(selectedNumber)}
          /> */}
          <MainButton onPressHandler={() => props.onStartGame(selectedNumber)}>
            Start Game
          </MainButton>
        </View>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <InputField
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonsContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    color={Colors.primaryColor}
                    title="Reset"
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    color={Colors.accentColor}
                    title="Confirm"
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;
