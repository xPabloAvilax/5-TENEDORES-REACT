import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favorites from "../screens/TopRestaurants";
import TopRestaurants from "../screens/TopRestaurants";

const Stack = createStackNavigator();

export default function TopRestauransStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="top-restaurants"
        component={TopRestaurants}
        options={{ title: "Los mas Votados" }}
      />
    </Stack.Navigator>
  );
}
