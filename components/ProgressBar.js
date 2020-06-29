import React, { useState } from "react";
import { Easing, View, Animated, Button, StyleSheet, Text } from "react-native";

const ProgressBar = () => {
  const progress = useState(new Animated.Value(0))[0];
  const [toggleImage, setToggleImage] = useState(false);

  const startProgress = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 7000,
      easing: Easing.bezier(
        0.003,
        0.009,
        0.027,
        0.6,
        0.081,
        0.16,
        0.243,
        0.45,
        0.65,
        1
      ),
    }).start(() => {
      setToggleImage(true);
      setTimeout(() => {
        setToggleImage(false);
        progress.setValue(0);
      }, 2000);
    });
  };

  const width_interpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const progressStyle = {
    width: width_interpolation,
  };

  return (
    <View style={{ marginVertical: 30, marginTop: 60 }}>
      <Button
        title="push me to start the progressbar"
        onPress={startProgress}
      />
      <View style={styles.progressOutside}>
        <Animated.View
          style={{
            ...styles.progressBar,
            ...progressStyle,
          }}
        />
        <View style={{ ...styles.progressBar, ...styles.progressBackground }} />
      </View>
      {toggleImage ? (
        <View style={styles.loaded}>
          <Text>hier kommt dann ein bild hin</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  progressOutside: {
    marginVertical: 30,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
    height: 20,
  },
  progressBar: {
    backgroundColor: "green",
  },
  progressBackground: {
    flex: 1,
    backgroundColor: "white",
  },
  loaded: {
    alignSelf: "center",
    backgroundColor: "white",
    padding: 10,
    width: "80%",
    alignItems: "center",
  },
});

export default ProgressBar;
