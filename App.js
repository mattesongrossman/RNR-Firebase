// import "react-native-gesture-handler";
// import React, { useEffect, useState } from "react";
// import { firebase } from "./src/firebase/config";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
// import { decode, encode } from "base-64";
// import { Provider } from "react-redux";
// import store from "./src/store";
// import { useSelector, useDispatch } from "react-redux";
// import { userToggle } from "./src/actions/index";

// if (!global.btoa) {
//   global.btoa = encode;
// }
// if (!global.atob) {
//   global.atob = decode;
// }

// const Stack = createStackNavigator();

// export default function App() {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const dispatch = useDispatch();
//   let list = useSelector((state) => state);
//   console.log(list);

//   useEffect(() => {
//     const usersRef = firebase.firestore().collection("users");
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         usersRef
//           .doc(user.uid)
//           .get()
//           .then((document) => {
//             const userData = document.data();
//             setLoading(false);
//             setUser(userData);
//             dispatch(userToggle());
//           })
//           .catch((error) => {
//             setLoading(false);
//           });
//       } else {
//         setLoading(false);
//       }
//     });
//   }, []);

//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           {user ? (
//             <Stack.Screen name="Home" options={{ title: "My home" }}>
//               {(props) => <HomeScreen {...props} extraData={user} />}
//             </Stack.Screen>
//           ) : (
//             <>
//               <Stack.Screen name="Login" component={LoginScreen} />
//               <Stack.Screen
//                 name="Registration"
//                 component={RegistrationScreen}
//               />
//             </>
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }

import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
