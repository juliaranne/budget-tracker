import React, { useState, useRef, useEffect } from "react";
import { Svg, G, Rect, Text } from "react-native-svg";
import { StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import * as d3 from "d3";

type Payment = {
  date: Date;
  amount: number;
  category: string;
  _id: string;
};

export type PaymentsChartProps = {
  data: Payment[];
};

const GRAPH_APSECT_RATIO = 19.5 / 9;

export default function PaymentsChart({ data }: PaymentsChartProps) {
  const [width, setWidth] = useState(0);
  const height = width * GRAPH_APSECT_RATIO;

  const yDomain = data.map((item) => item.category);
  const highestVal = Math.max(...data.map((item) => item.amount));

  const AnimatedRect = Animated.createAnimatedComponent(Rect);
  const animatedWidths = useRef(data.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (width === 0) return;

    Animated.stagger(
      120,
      animatedWidths.map((anim, i) =>
        Animated.timing(anim, {
          toValue: xScale(data[i].amount),
          duration: 600,
          useNativeDriver: false,
        })
      )
    ).start();
  }, [width]);

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
          {data.map((item, i) => (
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

          {data.map((item) => (
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
    marginTop: 40,
  },
});
