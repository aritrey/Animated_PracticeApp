import React, { Component } from "react";
import {
  Easing,
  View,
  Animated,
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

export default class ChangingQuadrats extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 99,
      duration: 1500,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: -99,
        duration: 3000,
      }).start();
    });
  };
  render() {
    const randomValue = 50; // new Animated.Value(50);
    const newAnimation = Animated.add(this.state.animation, randomValue);
    const moduloAnimation = Animated.modulo(this.state.animation, randomValue);

    const animatedNormalStyles = {
      backgroundColor: "green",
      transform: [{ translateX: this.state.animation }],
    };

    const animatedModuloStyles = {
      backgroundColor: "lightskyblue",
      transform: [{ translateX: moduloAnimation }],
    };

    const animatedAddStyles = {
      transform: [{ translateX: newAnimation }],
    };

    return (
      <View style={{ marginVertical: 30 }}>
        <Button
          title="push me to start the animation"
          onPress={this.startAnimation}
        />
        <View style={styles.whiteBox}>
          <Animated.View style={[styles.box, animatedAddStyles]} />
          <Animated.View style={[styles.box, animatedModuloStyles]} />
          <TouchableWithoutFeedback onPress={this.startAnimation}>
            <Animated.View style={[styles.box, animatedNormalStyles]} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "tomato",
  },
  whiteBox: {
    overflow: "hidden",
    marginTop: 20,
    alignSelf: "center",
    borderWidth: 5,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
  },
});
