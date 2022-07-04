import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import BodyText from "./BodyText";

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accentColor,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: Colors.accentColor,
    fontSize: 22,
  },
});

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <BodyText style={styles.number}>{props.children}</BodyText>
    </View>
  );
};

export default NumberContainer;
