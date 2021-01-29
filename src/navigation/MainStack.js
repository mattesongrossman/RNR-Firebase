import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { firebase } from "../firebase/config";
import { userToggle } from "../actions/index";

export default function MainStack() {
  const dispatch = useDispatch();
  let list = useSelector((state) => state);
  const Stack = createStackNavigator();

  const signOut = () => {
    dispatch(userToggle({}));
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={({ navigation }) => ({
          headerTitleStyle: { fontSize: 14 },
          title: `Hello,  ${list.userData.fullName}`,
          headerRight: () => (
            <MaterialIcons
              style={{ paddingRight: 16 }}
              name="logout"
              size={32}
              color="red"
              onPress={() => {
                signOut();
              }}
            ></MaterialIcons>
          ),
        })}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}
