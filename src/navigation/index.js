import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import LoginStack from "./LoginStack";
import "react-native-gesture-handler";
import { firebase } from "../firebase/config";
import { createStackNavigator } from "@react-navigation/stack";
import { decode, encode } from "base-64";
import { userToggle } from "../actions/index";
import { userData } from "../actions/index";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

const Navigation = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  let list = useSelector((state) => state);
  console.log(list);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            // setUser(userData);
            if (!list.userState) {
              dispatch(userToggle(userData));
            }
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <></>;

  return (
    <NavigationContainer>
      {list.userState ? <MainStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default Navigation;
