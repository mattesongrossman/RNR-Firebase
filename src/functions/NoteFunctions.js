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
