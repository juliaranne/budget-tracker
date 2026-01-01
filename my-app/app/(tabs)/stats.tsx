import React, { useState, useRef, useEffect } from "react";
import { Svg, G, Rect, Text } from "react-native-svg";
import { StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import * as d3 from "d3";

const response = {
  data: [
    {
      category: "fitness",
      date: "Sun Nov 23 2025 20:00:58 GMT+0000 (Greenwich Mean Time)",
      value: 78,
    },
    {
      category: "fashion",
      date: "Sun Nov 23 2025 20:00:58 GMT+0000 (Greenwich Mean Time)",
      value: 159,
    },
    {
      category: "beauty",
      date: "Sun Nov 23 2025 20:00:58 GMT+0000 (Greenwich Mean Time)",
      value: 200,
    },
    {
      category: "holiday",
      date: "Sun Nov 23 2025 20:00:58 GMT+0000 (Greenwich Mean Time)",
      value: 90,
    },
  ],
};

// interface Payment {
//   category: string;
//   date: string;
//   value: number;
// }

const GRAPH_APSECT_RATIO = 19.5 / 9;

export default function StatsChart() {
  const [width, setWidth] = useState(0);
  const height = width * GRAPH_APSECT_RATIO;

  const yDomain = response.data.map((item) => item.category);
  const highestVal = Math.max(...response.data.map((item) => item.value));

  const yScale = d3
    .scaleBand()
    .domain(yDomain)
    .range([0, yDomain.length * 40]);

  const xScale = d3
    .scaleLinear()
    .domain([0, highestVal])
    .range([0, width - 20]);

  const AnimatedRect = Animated.createAnimatedComponent(Rect);
  const animatedWidths = useRef(
    response.data.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    if (width === 0) return;

    Animated.stagger(
      120,
      animatedWidths.map((anim, i) =>
        Animated.timing(anim, {
          toValue: xScale(response.data[i].value),
          duration: 600,
          useNativeDriver: false,
        })
      )
    ).start();
  }, [width]);

  return (
    <SafeAreaView
      style={styles.container}
      onLayout={(ev) => {
        setWidth(ev.nativeEvent.layout.width);
      }}
    >
      <Svg width={width} height={height}>
        <G>
          {response.data.map((item, i) => (
            <AnimatedRect
              key={item.category}
              y={yScale(item.category)}
              x={10}
              rx={2.5}
              width={animatedWidths[i]}
              height={30}
              fill={i % 2 === 0 ? "teal" : "navy"}
            />
          ))}

          {response.data.map((item) => (
            <ThemedView key={"label" + item.category}>
              <Text
                fontSize="16"
                fill="white"
                x={15}
                y={(yScale(item.category) ?? 0) + 22}
              >
                {item.category}
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
    // flex: 1,
    marginTop: 50,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    fontSize: 20,
  },
  text: {
    // transform: [{ rotateY: "45deg" }],
  },
});
