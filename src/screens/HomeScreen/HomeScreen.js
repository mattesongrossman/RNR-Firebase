import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { ListHeader } from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { userToggle } from "../../actions/index";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen(props) {
  const [noteText, setNoteText] = useState("");
  const [entities, setEntities] = useState([]);
  let list = useSelector((state) => state);
  const dispatch = useDispatch();

  const noteRef = firebase.firestore().collection("entities");
  const userID = list.userData.id;

  useEffect(() => {
    noteRef
      .where("authorID", "==", userID)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const note = doc.data();
            note.id = doc.id;
            newEntities.push(note);
          });
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const onAddButtonPress = () => {
    if (noteText && noteText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: noteText,
        authorID: userID,
        createdAt: timestamp,
      };
      noteRef
        .add(data)
        .then((_doc) => {
          setNoteText("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const deletenote = (id) => {
    noteRef
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  const rendernote = ({ item, index }) => {
    return (
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          {index + 1}. {" " + item.text}
        </Text>
        <MaterialIcons
          name="delete"
          size={32}
          color="red"
          onPress={() => {
            deletenote(item.id);
          }}
        ></MaterialIcons>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new item"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setNoteText(text)}
            value={noteText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <MaterialIcons
            name="add"
            size={32}
            color="green"
            onPress={() => {
              onAddButtonPress();
            }}
          ></MaterialIcons>
        </View>
        {entities && (
          <ScrollView style={styles.listContainer}>
            <FlatList
              data={entities}
              renderItem={rendernote}
              keyExtractor={(item) => item.id}
              removeClippedSubviews={true}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   Keyboard,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import styles from "./styles";
// import { firebase } from "../../firebase/config";

// export default function HomeScreen(props) {
//   const [entityText, setEntityText] = useState("");
//   const [entities, setEntities] = useState([]);

//   // const entityRef = firebase.firestore().collection("entities");
//   // const userID = props.extraData.id;

//   // useEffect(() => {
//   //   entityRef
//   //     .where("authorID", "==", userID)
//   //     .orderBy("createdAt", "desc")
//   //     .onSnapshot(
//   //       (querySnapshot) => {
//   //         const newEntities = [];
//   //         querySnapshot.forEach((doc) => {
//   //           const entity = doc.data();
//   //           entity.id = doc.id;
//   //           newEntities.push(entity);
//   //         });
//   //         setEntities(newEntities);
//   //       },
//   //       (error) => {
//   //         console.log(error);
//   //       }
//   //     );
//   // }, []);

//   const onAddButtonPress = () => {
//     if (entityText && entityText.length > 0) {
//       const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//       const data = {
//         text: entityText,
//         authorID: userID,
//         createdAt: timestamp,
//       };
//       entityRef
//         .add(data)
//         .then((_doc) => {
//           setEntityText("");
//           Keyboard.dismiss();
//         })
//         .catch((error) => {
//           alert(error);
//         });
//     }
//   };

//   const renderEntity = ({ item, index }) => {
//     return (
//       <View style={styles.entityContainer}>
//         <Text style={styles.entityText}>
//           {index}. {item.text}
//         </Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Add new entity"
//           placeholderTextColor="#aaaaaa"
//           onChangeText={(text) => setEntityText(text)}
//           value={entityText}
//           underlineColorAndroid="transparent"
//           autoCapitalize="none"
//         />
//         <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
//           <Text style={styles.buttonText}>Add</Text>
//         </TouchableOpacity>
//       </View>
//       {entities && (
//         <View style={styles.listContainer}>
//           <FlatList
//             data={entities}
//             renderItem={renderEntity}
//             keyExtractor={(item) => item.id}
//             removeClippedSubviews={true}
//           />
//         </View>
//       )}
//     </View>
//   );
// }
