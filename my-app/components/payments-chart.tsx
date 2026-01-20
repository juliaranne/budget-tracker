import React, { useState, useRef, useEffect } from "react";
import { Svg, G, Rect, Text } from "react-native-svg";
import { StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import * as d3 from "d3";

type Payments = {
  [key: string]: number;
};

export type PaymentsChartProps = {
  data: Payments;
};

const GRAPH_APSECT_RATIO = 19.5 / 9;

export default function PaymentsChart({ data }: PaymentsChartProps) {
  console.log("new data", data);
  const [width, setWidth] = useState(0);
  const height = width * GRAPH_APSECT_RATIO;

  const dataArray = Object.entries(data);
  const yDomain = dataArray.map(([key, value]) => key);
  const highestVal = Math.max(...dataArray.map(([key, value]) => value));

  const AnimatedRect = Animated.createAnimatedComponent(Rect);
  const animatedWidths = useRef(
    dataArray.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    if (width === 0) return;

    Animated.stagger(
      120,
      animatedWidths.map((anim, i) =>
        Animated.timing(anim, {
          toValue: xScale(dataArray[i][1]),
          duration: 600,
          useNativeDriver: false,
        }),
      ),
    ).start();
  }, [width, data]);

  // Y height - number of categories * height of bar chart and space
  const yScale = d3
    .scaleBand()
    .domain(yDomain)
    .range([0, yDomain.length * 40]);

  const xScale = d3
    .scaleLinear()
    .domain([0, highestVal])
    .range([0, width - 20]);

  return (
    <SafeAreaView
      style={styles.container}
      onLayout={(ev) => {
        setWidth(ev.nativeEvent.layout.width);
      }}
    >
      <Svg width={width} height={height}>
        <G>
          {dataArray.map(([key, value], i) => (
            <AnimatedRect
              key={key}
              y={yScale(key)}
              x={10}
              rx={2.5}
              width={animatedWidths[i]}
              height={30}
              fill={i % 2 === 0 ? "teal" : "navy"}
            />
          ))}

          {dataArray.map(([key, value]) => (
            <ThemedView key={"label" + key}>
              <Text
                fontSize="16"
                fill="white"
                x={15}
                y={(yScale(key) ?? 0) + 22}
              >
                {key.replace("_", " ")}
              </Text>
            </ThemedView>
          ))}
        </G>
      </Svg>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
});
