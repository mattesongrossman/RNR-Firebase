import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegistrationScreen } from "../screens";

const Stack = createStackNavigator();

const LoginStack = () => (
  <Stack.Navigator
    headerMode="none"
    initialRouteName="login"
    // screenOptions={{
    //   headerTintColor: Colors.white,
    //   headerStyle: { borderBottomWidth: 0, backgroundColor: Colors.white },
    // }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Registration" component={RegistrationScreen} />
  </Stack.Navigator>
);

export default LoginStack;
