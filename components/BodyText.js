import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  body: { fontFamily: "open-sans" },
});

const BodyText = (props) => {
  return (
    <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
  );
};

export default BodyText;
