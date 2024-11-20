import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

import { TodayCaloriesProps } from "../../types";

const TodayCalories: FC<TodayCaloriesProps> = ({ total = 2000, consumed = 0, remaining = 0, percentage = 0 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <CircularProgress value={percentage} valueSuffix="%" />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.title}>Calorias de Hoy</Text>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLegend}>Total</Text>
          <Text style={styles.rightItemValue}>{total}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLegend}>Consumidas</Text>
          <Text style={styles.rightItemValue}>{consumed}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLegend}>Restantes</Text>
          <Text style={styles.rightItemValue}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    // alignSelf: "center",
    textAlign: "center",
    marginBottom: 12,
  },
  rightItem: {
    flexDirection: "row",
    marginBottom: 7,
  },
  rightItemLegend: {
    flex: 1,
    color: "#000"
  },
  rightItemValue: {
    flex: 1,
    color: "#4ECB71",
    textAlign: "right",
  },
});

export default TodayCalories;