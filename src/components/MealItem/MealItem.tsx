import React, { FC } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button, Icon } from "@rneui/themed";

import { Meal, MealItemProps } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";

const MealItem: FC<MealItemProps> = ({ calories, name, portion, isAbleToAdd, itemPosition, onCompleteRemove }) => {
  const { onSaveTodayFood, onRemoveTodayFood } = useFoodStorage();

  const handleIconPress = async () => {
    try {
      if (isAbleToAdd) {
        await onSaveTodayFood({ calories, name, portion });
        Alert.alert("Comida agregada al día");
      }
      else {
        await onRemoveTodayFood(itemPosition ?? -1);
        Alert.alert(`Comida eliminada: ${name}`);
        onCompleteRemove?.();
      }

    } catch (error) {
      console.error(error);
      Alert.alert("No se agregó la comida");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button
          onPress={handleIconPress}
          icon={<Icon name={isAbleToAdd ? "add-circle-outline" : "close"} />}
          type="clear"
        />
        <Text style={styles.calories}>{calories} cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ADE8AF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  leftContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "flex-end",
  },
  name: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
  portion: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
  },
  calories: {
    color: "#000",
    fontSize: 18,
    marginTop: -5,
  },
});

export default MealItem;