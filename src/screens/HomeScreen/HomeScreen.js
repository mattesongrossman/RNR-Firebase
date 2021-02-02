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
  Modal,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen(props) {
  const [noteText, setNoteText] = useState("");
  const [noteEdit, setNoteEdit] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
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
        <ScrollView>
          <Text style={styles.noteText}>
            {index + 1}. {" " + item.text}
          </Text>
        </ScrollView>
        <View style={styles.udContainer}>
          {/* <MaterialIcons
            style={{ paddingRight: 16 }}
            name="edit"
            size={32}
            color="orange"
            onPress={() => {
              console.log("test");
              setNoteEdit(!noteEdit);
            }}
          ></MaterialIcons> */}
          <MaterialIcons
            name="delete"
            size={32}
            color="red"
            onPress={() => {
              deletenote(item.id);
            }}
          ></MaterialIcons>
        </View>
      </View>
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
              style={{ width: "100%", top: 15 }}
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
