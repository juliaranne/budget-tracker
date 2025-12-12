/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    borderColor: "#11181C",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    borderColor: "#ECEDEE",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Categories = {
  entertainment: {
    color: "red",
    icon: "theatermasks.fill",
    display_name: "Going out",
  },
  eating_out: {
    color: "green",
    icon: "fork.knife",
    display_name: "Eating out",
  },
  food_shopping: {
    color: "blue",
    icon: "basket.fill",
    display_name: "Groceries",
  },
  fashion: {
    color: "coral",
    icon: "tshirt.fill",
    display_name: "Fashion",
  },
  diy: {
    color: "darkcyan",
    icon: "hammer.fill",
    display_name: "DIY",
  },
  Fitness: {
    color: "crimson",
    icon: "figure.run",
    display_name: "Fitness",
  },
  holidays: {
    color: "deepskyblue",
    icon: "beach.umbrella",
    display_name: "Holidays",
  },
  transport: {
    color: "purple",
    icon: "car.fill",
    display_name: "Transport",
  },
  pets: {
    color: "brown",
    icon: "pawprint.fill",
    display_name: "Pets",
  },
  beauty: {
    color: "lightpink",
    icon: "eyebrow",
    display_name: "Beauty",
  },
  gifts: {
    color: "yellowgreen",
    icon: "gift.fill",
    display_name: "Gifts",
  },
  health: {
    color: "gold",
    icon: "heart.fill",
    display_name: "Health",
  },
  other: {
    color: "deepskyblue",
    icon: "beach.umbrella",
    display_name: "Other",
  },
  household: {
    color: "purple",
    icon: "car.fill",
    display_name: "Household",
  },
  bills: {
    color: "brown",
    icon: "pawprint.fill",
    display_name: "Bills",
  },
  charity: {
    color: "lightpink",
    icon: "eyebrow",
    display_name: "Charity",
  },
  subscription: {
    color: "yellowgreen",
    icon: "gift.fill",
    display_name: "Subscribe",
  },
  friend: {
    color: "gold",
    icon: "heart.fill",
    display_name: "Pay friend",
  },
  gardening: {
    color: "yellowgreen",
    icon: "gift.fill",
    display_name: "Garden",
  },
  work_lunch: {
    color: "gold",
    icon: "heart.fill",
    display_name: "Work lunch",
  },
};
