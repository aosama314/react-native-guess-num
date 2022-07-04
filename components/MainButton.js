import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../constants/colors";

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
  mainButtonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
});

const MainButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.mainButtonContainer}>
      <ButtonComponent onPress={props.onPressHandler}>
        <View style={{ ...styles.buttonContainer, ...props.style }}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

export default MainButton;
