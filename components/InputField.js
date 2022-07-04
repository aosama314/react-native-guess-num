import React from "react";
import { TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

const InputField = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

export default InputField;
