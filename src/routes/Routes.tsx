import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { Text } from "react-native";

import { RootStackParams } from "../types";
import Home from "../views/Home";
import AddFood from "../views/AddFood";

const Stack = createNativeStackNavigator<RootStackParams>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddFood"
          component={AddFood}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <View>
    //   <Text style={{ color: "#FFF", fontSize: 54 }}>Rutas</Text>
    // </View>
  );
};

export default Routes;