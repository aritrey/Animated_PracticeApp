import React, { useState } from "react";
import { Easing, View, Animated, Button, StyleSheet, Text } from "react-native";

//i use an extra transparent needle container to scale the number of needles easily

const RandomSpin = () => {
  const rotationValue = useState(new Animated.Value(0))[0];
  const doSpin = () => {
    Animated.timing(rotationValue, {
      toValue: Math.random() * 900,
      duration: 1500,
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
    })
      .start
      //() =>
      //   setTimeout(() => {
      //     // rotationValue.setValue(0);
      //   }, 5000)
      ();
  };

  const rotate_interpolation = rotationValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const rotationStyle = {
    transform: [{ rotate: rotate_interpolation }],
  };

  return (
    <View style={{ marginVertical: 30 }}>
      <Button title="push me to spin the needle" onPress={doSpin} />
      <View style={styles.whiteNeedleBox}>
        <View style={styles.needle_center} />
        <Animated.View
          style={{
            ...styles.transparentNeedleContainer,
            ...rotationStyle,
          }}
        >
          <View style={styles.needle} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transparentNeedleContainer: {
    position: "absolute",
    width: 200,
    height: 200,
  },
  needle: {
    position: "absolute",
    top: 98,
    left: 98,
    width: "45%",
    height: 5,
    borderRadius: 10,
    backgroundColor: "green",
  },
  needle_center: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "black",
  },
  whiteNeedleBox: {
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
    borderBottomColor: "black",
    borderWidth: 5,
    borderRadius: 200,
    backgroundColor: "white",
    justifyContent: "center",
    width: 200,
    height: 200,
  },
});

export default RandomSpin;
