import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Icon } from '@rneui/themed';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Header from "../../components/Header";
import { Meal, RootStackParams, TodayCaloriesProps } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import TodayCalories from "../../components/TodayCalories";
import TodayMeals from "../../components/TodayMeals";


const totalCaloriesPerDay = 2000;

const Home = () => {
  const [todayFoods, setTodayFoods] = useState<Meal[]>([]);
  const [todayStatistics, setTodayStatistics] = useState<TodayCaloriesProps>();
  const { onGetTodayFoods } = useFoodStorage();
  const { navigate } = useNavigation<
    NativeStackNavigationProp<RootStackParams, "AddFood">
  >();

  const calculateTodayStatistics = (meals: Meal[]) => {
    try {
      const caloriesConsumed = meals.reduce((counter, current) => counter + Number(current.calories), 0);
      const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
      const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;

      setTodayStatistics({
        total: totalCaloriesPerDay,
        consumed: caloriesConsumed,
        remaining: remainingCalories,
        percentage,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodayFoods = useCallback(async () => {
    try {
      const todayFoodsResponse = await onGetTodayFoods();
      // console.log(todayFoodsResponse);
      if (todayFoodsResponse !== undefined) {
        calculateTodayStatistics(todayFoodsResponse);
      }
      setTodayFoods(todayFoodsResponse);

    } catch (error) {
      setTodayFoods([]);
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    //Use it to mantain the fucntion's performance
    useCallback(() => {
      loadTodayFoods().catch(null);
      //This will only reload when "loadTodayFoods"
      //does too, Thats mean in one chance
    }, [loadTodayFoods]),
  );

  const handleAddCaloriesPress = () => {
    navigate("AddFood",);
  };

  console.log(todayFoods);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.caloriesLegend}>Calorías</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            onPress={handleAddCaloriesPress}
            icon={<Icon name="add-circle-outline" color="#FFF" />}
            radius="lg"
            color="#4ECB71"
          />
        </View>
      </View>

      <TodayCalories {...todayStatistics} />
      <TodayMeals
        foods={todayFoods}
        onCompleteRemove={() => loadTodayFoods()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FFF",
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  caloriesLegend: {
    color: "#000",
    fontSize: 20,
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default Home;