import React, { useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import DateTime from "../../components/DateTime";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { onAddButtonPress } from "../../functions/NoteFunctions";

export default function HomeScreen(props) {
  const [noteText, setNoteText] = useState("");
  const [entities, setEntities] = useState([]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
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
        <DateTime />
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
