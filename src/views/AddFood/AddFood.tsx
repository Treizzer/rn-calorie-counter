import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";

import Header from "../../components/Header";
import AddFoodModal from "../../components/AddFoodModal";
import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal } from "../../types";
import MealItem from "../../components/MealItem";


const AddFood = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [foods, setFoods] = useState<Meal[]>([]);
  const [search, setSearch] = useState<string>("");
  const { onGetFoods } = useFoodStorage();

  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFoods();
      setFoods(foodsResponse);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert("Comida guardada exitosamente");
      loadFoods();
    }
    setIsVisible(false);
  };

  useEffect(() => {
    handleSearchPress().catch(null);
  }, [search]);

  const handleSearchPress = async () => {
    try {
      const results = await onGetFoods();
      setFoods(
        results?.filter((item: Meal) =>
          item.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      );

    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Agregar Comida</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <Button
            onPress={() => setIsVisible(true)}
            icon={<Icon name="add-circle-outline" color="#FFF" />}
            radius="lg"
            color="#4ECB71"
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            onChangeText={(text) => setSearch(text)}
            placeholder="Manzanas, Pie, Refresco..."
            leftIcon={<Icon name="search" />}
          />
        </View>
        <Button
          onPress={handleSearchPress}
          title="Buscar"
          titleStyle={styles.searchBtnTitle}
          color="#ADE8AF"
          radius="lg"
        />
      </View>
      <ScrollView style={styles.content}>
        {
          foods?.map(meal => (
            <MealItem key={`my-meal-item-${meal.name}`} {...meal} isAbleToAdd />
          ))
        }
      </ScrollView>
      <AddFoodModal visible={isVisible} onClose={handleModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FFF",
  },
  addFoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  legendContainer: {
    flex: 1,
    justifyContent: "center"
  },
  addFoodLegend: {
    color: "#000",
    fontSize: 20,
  },
  addFoodBtnContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    // alignItems: "center",
    marginVertical: 24,
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchBtnTitle: {
    color: "#000",
    fontSize: 14,
  },
  content: {
    // flex: 1,
  },
});

export default AddFood;