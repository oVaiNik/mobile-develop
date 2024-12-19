import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, editTask, toggleTask } from "../store/store";

export default function Lab4() {
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (title) {
      dispatch(addTask(title));
      setTitle("");
    }
  };

  const handleEditTask = () => {
    if (newTitle && editId !== null) {
      dispatch(editTask({ id: editId, name: newTitle }));
      setEditId(null);
      setNewTitle("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введите название задачи"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Добавить задачу" onPress={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <View style={styles.taskTextContainer}>
              <Text style={styles.taskTitle}>{item.name}</Text>
              <Text style={styles.taskStatus}>
                Статус: {item.completed ? "Завершено" : "В процессе"}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Удалить"
                onPress={() => dispatch(deleteTask(item.id))}
              />
              <Button
                title="Редактировать"
                onPress={() => {
                  setEditId(item.id);
                  setNewTitle(item.name);
                }}
              />
              <Button
                title="Завершить"
                onPress={() => dispatch(toggleTask(item.id))}
              />
            </View>
          </View>
        )}
      />

      {editId && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Новое название задачи"
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <Button title="Сохранить изменения" onPress={handleEditTask} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  taskTextContainer: {
    flex: 2,
    marginRight: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  taskTitle: { fontSize: 16, fontWeight: "bold" },
  taskStatus: { fontSize: 14, color: "gray" },
  editContainer: { marginTop: 20 },
});
