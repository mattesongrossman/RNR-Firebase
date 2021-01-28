import React from "react";
import { Text, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { userToggle } from "../../actions/index";

export default function HomeScreen(props, { navigation }) {
  let list = useSelector((state) => state);
  console.log(list);

  const dispatch = useDispatch();

  // const logout = () => {
  //   dispatch(userToggle());
  // };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Update the title"
        onPress={() => {
          dispatch(userToggle());
        }}
      />
    </View>
  );
}
