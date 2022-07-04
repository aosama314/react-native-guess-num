import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
  },
});

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
};

export default TitleText;
