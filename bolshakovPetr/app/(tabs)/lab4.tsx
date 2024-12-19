import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useShopList } from "../../hooks/useShopList";

export default function Lab4_1() {
  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const goods = useShopList((state) => state.goods);
  const addProduct = useShopList((state) => state.addProduct);
  const deleteProduct = useShopList((state) => state.deleteProduct);

  const handleAddProduct = () => {
    if (title) {
      addProduct(title);
      setTitle("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addBlock}>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
        <Pressable style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={goods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={{ flex: 1 }}>
              <Text>{item.name}</Text>
              <Text>Status: {item.completed ? "Bought" : "In progress"}</Text>
            </View>
            <Pressable
              style={styles.button}
              onPress={() => deleteProduct(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 30,
    width: 250,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2A4758",
    borderWidth: 1,
    width: 150,
    height: 50,
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: "center",
  },
  addBlock: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
});
