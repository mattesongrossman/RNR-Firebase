import React from "react";
import { Text, View, Button } from "react-native";

export default function HomeScreen(props, { navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: "Updated!" })}
      />
    </View>
  );
}
