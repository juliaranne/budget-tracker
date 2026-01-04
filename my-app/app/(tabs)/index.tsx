import { useEffect, useReducer } from "react";
import { ThemedText } from "@/components/themed-text";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import { ThemedInput } from "@/components/themed-input";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import { CategoryIcon } from "@/components/category-icon";
import { Categories } from "@/constants/theme";
import { useDateStore } from "@/store/dateStore";

enum ReducerActionKind {
  CATEGORY = "CATEGORY",
  AMOUNT = "AMOUNT",
  DATE = "DATE",
  SUBMIT = "SUBMIT",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
interface ReducerAction {
  type: ReducerActionKind;
  category?: string;
  amount?: string;
  date?: Date;
  error?: string;
}
interface ReducerState {
  category: string | undefined;
  amount: string | undefined;
  date: Date | undefined;
}

const formatDate = (theDate: Date | undefined) => {
  if (!theDate) {
    return;
  }
  const formattedDate = format(theDate, "E do MMM");
  return formattedDate;
};

const initialState = {
  date: new Date(),
  amount: "",
  category: "",
  error: "",
  loading: false,
};

const reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionKind.CATEGORY: {
      return {
        ...state,
        category: action.category,
      };
    }

    case ReducerActionKind.AMOUNT:
      return {
        ...state,
        amount: action.amount,
      };

    case ReducerActionKind.DATE:
      return {
        ...state,
        date: action.date,
      };

    case ReducerActionKind.SUBMIT:
      return {
        ...state,
        loading: true,
      };

    case ReducerActionKind.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case ReducerActionKind.SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default function InputScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const selectedDate = useDateStore((s) => s.selectedDate);

  const handlePress = () => {
    const { amount, category, date } = state;
    if (!amount || !category) {
      return dispatch({
        type: ReducerActionKind.ERROR,
        error: "Please select an amount and category",
      });
    }
    dispatch({
      type: ReducerActionKind.SUBMIT,
    });
    fetch("http://localhost:3000/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, amount, category }),
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: ReducerActionKind.SUCCESS,
        });
      })
      .catch((e) => {
        dispatch({
          type: ReducerActionKind.ERROR,
          error: "There has been an error",
        });
      });
  };

  useEffect(() => {
    dispatch({
      type: ReducerActionKind.DATE,
      date: selectedDate,
    });
  }, [selectedDate]);

  const updateValue = (value: string) =>
    dispatch({
      type: ReducerActionKind.AMOUNT,
      amount: value,
    });

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.title} type="title">
        Budget Tracker
      </ThemedText>
      <ScrollView style={styles.scroll}>
        <View style={styles.categories}>
          {Object.entries(Categories).map(([key, value], i) => {
            return (
              <CategoryIcon
                text={value.display_name}
                color={i % 2 === 0 ? "teal" : "navy"}
                name={value.icon}
                key={key}
                selected={state.category}
                category={key}
                handleChange={() =>
                  dispatch({ type: ReducerActionKind.CATEGORY, category: key })
                }
              ></CategoryIcon>
            );
          })}
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <View style={styles.dateRow}>
          <ThemedText style={styles.date} type="default">
            {formatDate(state.date)}
          </ThemedText>
          <Link href="./modal">
            <ThemedText type="link">Change date</ThemedText>
          </Link>
        </View>
        <View style={styles.inputRow}>
          <ThemedText style={styles.inputLabel} type="default">
            £
          </ThemedText>
          <ThemedInput
            keyboardType="numeric"
            placeholder="I have spent"
            style={styles.input}
            changeEvent={updateValue}
          ></ThemedInput>
          <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
              styles.submitBtn,
              pressed && styles.pressed,
            ]}
          >
            <ThemedText type="defaultSemiBold" lightColor="white">
              Track spend
            </ThemedText>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 30,
    flexGrow: 1,
    padding: 15,
    paddingLeft: 35,
    fontSize: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    position: "relative",
    overflow: "visible",
  },
  inputLabel: {
    position: "absolute",
    left: 10,
    top: 35,
    fontSize: 26,
  },
  submitBtn: {
    width: "100%",
    backgroundColor: "purple",
    display: "flex",
    alignItems: "center",
    borderRadius: 6,
    padding: 15,
  },
  pressed: {
    opacity: 0.8,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  date: {
    fontSize: 30,
    lineHeight: 38,
    marginBottom: 2,
  },
  dateRow: {
    alignItems: "center",
    backgroundColor: "white",
    opacity: 0.8,
    borderRadius: 6,
    padding: 15,
  },
  scroll: {
    maxHeight: 350,
    paddingTop: 5,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    marginBottom: 30,
    marginTop: 10,
  },
});
