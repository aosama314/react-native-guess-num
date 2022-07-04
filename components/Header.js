import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import Colors from "../constants/colors";
import TitleText from "./TitleText";

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
});

const Header = (props) => {
  // console.log(Platform);

  return (
    <View style={styles.headerContainer}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

export default Header;
