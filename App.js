import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";

import Header from "./components/Header";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import * as SplashScreen from "expo-splash-screen";

// const fetchFonts = async () => {
//   // await SplashScreen.preventAutoHideAsync();
//   await Font.loadAsync({
//     "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
//     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
//   });
//   // await SplashScreen.hideAsync();
//   return true;
// };

export default function App() {
  const [selectedUserNumber, setSelectedUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
        // await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.log(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const configureNewGame = () => {
    setGuessRounds(0);
    setSelectedUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setSelectedUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (selectedUserNumber && guessRounds <= 0) {
    content = (
      <GameScreen
        userChoice={selectedUserNumber}
        onGameOver={gameOverHandler}
      />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        guessRounds={guessRounds}
        userNumber={selectedUserNumber}
        onStartNewGame={configureNewGame}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen} onLayout={onLayoutRootView}>
      <Header title="Guess a Number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
