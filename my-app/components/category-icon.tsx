import {
  StyleProp,
  ViewStyle,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { IconSymbol } from "./ui/icon-symbol";
import { ThemedText } from "./themed-text";

// import { useThemeColor } from "@/hooks/use-theme-color";

export type PressableProps = {
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<ViewStyle>;
  color: string;
  name: string;
  text: string;
  selected: string | undefined;
  category: string;
  handleChange: () => void;
};

export function CategoryIcon({
  style,
  lightColor,
  darkColor,
  handleChange,
  selected,
  name,
  category,
  ...otherProps
}: PressableProps) {
  // const color = useThemeColor({ light: darkColor, dark: lightColor }, "text");

  return (
    <Pressable
      style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
      onPress={handleChange}
    >
      <View style={selected === category ? styles.selected : styles.checkIcon}>
        <IconSymbol
          name={"checkmark.circle"}
          color="green"
          size={28}
        ></IconSymbol>
      </View>
      <IconSymbol
        name={name}
        color="white"
        style={{
          ...styles.icon,
          backgroundColor: otherProps.color,
          outlineColor: otherProps.color,
        }}
        size={40}
      ></IconSymbol>
      <ThemedText style={styles.text}>{otherProps.text}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "25%",
    marginBottom: 10,
    position: "relative",
  },
  pressed: {
    opacity: 0.6,
  },
  selected: {
    right: 5,
    top: 0,
    position: "absolute",
    zIndex: 1,
    backgroundColor: "lightgreen",
    borderRadius: 26,
  },
  icon: {
    borderRadius: 20,
    outlineWidth: 12,
    marginBottom: 18,
  },
  text: {
    fontSize: 14,
  },
  checkIcon: {
    display: "none",
  },
});
