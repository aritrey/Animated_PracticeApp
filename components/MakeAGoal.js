import React, { useRef } from "react";
import {
  Easing,
  View,
  Animated,
  Button,
  StyleSheet,
  Text,
  PanResponder,
} from "react-native";

const MakeAGoal = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // want to handle wenn finger auf screen?
      onMoveShouldSetPanResponder: () => {
        console.log(pan);
        return true;
      }, //want to handle fingerbewegungen?
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gesture) => {
        if (!(pan.y._value > 75) && !(pan.y._value < -75)) {
          pan.x.setValue(gesture.dx);
          pan.y.setValue(gesture.dy);
        }
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        pan.flattenOffset(); //when user releases finger

        if (pan.y._value >= 70 || pan.y._value <= -70) {
          //destructuring von zweiten argument
          // Animated.decay(pan, {
          //   velocity: { x: -vx, y: -vy }, //es stört nicht, wenn wir einfach noch weiter sliden, weil alle werte am anfang der neuen panresponder bewegung wieder auf 0 gesetzt werden
          //   deceleration: 0.997,
          // }).start();
        } else {
          Animated.decay(pan, {
            velocity: { x: vx, y: vy }, //es stört nicht, wenn wir einfach noch weiter sliden, weil alle werte am anfang der neuen panresponder bewegung wieder auf 0 gesetzt werden
            deceleration: 0.997,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={{ marginVertical: 30 }}>
      <Button
        title="push me to get the ball"
        onPress={() => {
          pan.x.setValue(10);
          pan.y.setValue(10);
        }}
      />
      <View style={styles.whiteBox}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            {
              width: 50,
              height: 50,
              backgroundColor: "black",
              borderRadius: 25,
            },

            {
              top: pan.y._value < 75 ? (pan.y._value > -75 ? pan.y : -75) : 75,
              left: pan.x,
            },
          ]}
        />
        <View
          style={{
            position: "absolute",
            height: "60%",
            width: 15,
            backgroundColor: "green",
            alignSelf: "flex-end",
          }}
        />
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: 180,
            // backgroundColor: "blue",
            alignSelf: "flex-end",
          }}
        />
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: 15,
            backgroundColor: "green",
            alignSelf: "center",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  whiteBox: {
    overflow: "hidden",
    marginTop: 20,
    alignSelf: "center",
    borderWidth: 5,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    width: "100%",
    height: 200,
  },
});

export default MakeAGoal;
