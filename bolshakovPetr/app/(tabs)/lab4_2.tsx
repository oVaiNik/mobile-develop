// lab4_2.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { useShopList } from "../../hooks/useShopList";

export default function Lab4_2() {
  const goods = useShopList((state) => state.goods);
  const toggleProductStatus = useShopList((state) => state.toggleProductStatus);

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text>{item.name}</Text>
      <Text style={styles.statusText}>
        Status: {item.completed ? "Bought" : "In progress"}
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => toggleProductStatus(item.id)}
      >
        <Text style={styles.buttonText}>
          {item.completed ? "In progress" : "Buy"}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goods</Text>
      <FlatList
        data={goods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productContainer: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
  },
  statusText: {
    marginVertical: 10,
    fontSize: 14,
    color: "gray",
  },
  button: {
    backgroundColor: "#2A4758",
    borderWidth: 1,
    width: 150,
    height: 50,
    padding: 10,
    borderRadius: 20,
  },
});
