import {
  TextInput,
  type TextInputProps,
  StyleProp,
  TextStyle,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type InputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<TextStyle>;
  keyboardType?: "default" | "numeric";
  placeholder?: string;
  changeEvent: (value: string) => void;
  value: string | undefined;
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  changeEvent,
  value,
  keyboardType,
}: InputProps) {
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "borderColor",
  );
  const color = useThemeColor({ light: darkColor, dark: lightColor }, "text");

  const handleChange = (value: string) => {
    changeEvent(value);
  };

  return (
    <TextInput
      onChangeText={handleChange}
      style={[
        { color, borderColor, borderWidth: 1, borderRadius: 6, padding: 15 },
        style,
      ]}
      value={value}
      keyboardType={keyboardType}
    />
  );
}
