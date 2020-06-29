import React, { Component } from "react";
import { StyleSheet, View, Animated, ScrollView, Text } from "react-native";
import ProgressBar from "./components/ProgressBar";
import RandomSpin from "./components/RandomSpin";
import MakeAGoal from "./components/MakeAGoal";
import ChangingQuadrats from "./components/ChangingQuadrats";

export default class animations extends Component {
  state = {
    animation: new Animated.Value(1),
  };

  //animated event is a helperfuntion take a cofiguration und durchläuft sie(travers)and then call set value on the animated values that was passed to it
  render() {
    const backgroundinterpolation = this.state.animation.interpolate({
      inputRange: [0, 3000],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
    });

    const backgroundStyle = {
      backgroundColor: backgroundinterpolation,
    };

    return (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.animation,
                },
              },
            },
          ])}
        >
          <Animated.View style={[styles.box, backgroundStyle]}>
            <ProgressBar />
            <RandomSpin />
            <MakeAGoal />

            <ChangingQuadrats />
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    height: 3000,
  },
});
