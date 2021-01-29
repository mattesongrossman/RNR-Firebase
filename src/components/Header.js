// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { HomeScreen } from "../screens";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useSelector, useDispatch } from "react-redux";
// import { firebase } from "../firebase/config";
// import { userToggle } from "../actions/index";

// export default function Header() {
//   const dispatch = useDispatch();
//   let list = useSelector((state) => state);
//   const Stack = createStackNavigator();

//   const signOut = () => {
//     dispatch(userToggle({}));
//     firebase
//       .auth()
//       .signOut()
//       .then(() => console.log("User signed out!"));
//   };
//   return (
//     <Stack.Screen
//       name="Home"
//       options={({ navigation }) => ({
//         title: `Hello,  ${list.userData.email}`,
//         headerStyle: { backgroundColor: "white" },
//         headerRight: () => (
//           <MaterialIcons
//             name="logout"
//             size={32}
//             color="red"
//             onPress={() => {
//               signOut();
//             }}
//           ></MaterialIcons>
//         ),
//       })}
//       component={HomeScreen}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   headerStyle: {
//     width: "100%",
//     height: 45,
//     backgroundColor: "#606070",
//   },
//   textStyle: {
//     textAlign: "center",
//     color: "#fff",
//     fontSize: 18,
//     padding: 7,
//   },
// });
