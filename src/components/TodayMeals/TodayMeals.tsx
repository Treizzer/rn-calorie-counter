import React, { FC } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

import { Meal, TodayMealsProps } from "../../types";
import MealItem from "../MealItem";

const TodayMeals: FC<TodayMealsProps> = ({ foods, onCompleteRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comidas</Text>
      <ScrollView style={styles.content}>
        {
          foods?.map((meal: Meal, index) => (
            <MealItem
              key={`today-meal-item-${meal.name}-${index}`}
              {...meal}
              onCompleteRemove={onCompleteRemove}
              itemPosition={index}
            />
          ))
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 26,
  },
  title: {
    color: "#000",
    fontSize: 16,
  },
  content: {
    marginVertical: 16,
  },
});

export default TodayMeals;