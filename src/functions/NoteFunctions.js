export const onAddButtonPress = () => {
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

export const deletenote = (id) => {
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

export const rendernote = ({ item, index }) => {
  return (
    <View style={styles.noteContainer}>
      <Text style={styles.noteText}>
        {index + 1}. {" " + item.text}
      </Text>
      <View style={styles.udContainer}>
        <MaterialIcons
          style={{ paddingRight: 16 }}
          name="edit"
          size={32}
          color="orange"
          onPress={() => {
            console.log("edit");
          }}
        ></MaterialIcons>
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
