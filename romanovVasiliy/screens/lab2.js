import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "../redux/actions";

const Lab2 = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [loading, setLoading] = React.useState(true);
  const [newUserName, setNewUserName] = React.useState("");
  const [newUserEmail, setNewUserEmail] = React.useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const usersWithId = data.results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          picture: user.picture.large,
          age: user.dob.age,
          city: user.location.city,
        }));

        // Добавляем пользователей в Redux store
        usersWithId.forEach((user) => dispatch(addUser(user)));
      } catch (error) {
        console.error("Ошибка при загрузке пользователей:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  // Функция для добавления нового пользователя
  const handleAddUser = () => {
    if (newUserName && newUserEmail) {
      const lastUserId =
        users.length > 0
          ? parseInt(users[users.length - 1].id.split("-")[0])
          : 0;
      const newUser = {
        id: `${lastUserId + 1}-custom`,
        name: newUserName,
        email: newUserEmail,
        age: Math.floor(Math.random() * (60 - 18 + 1)) + 18,
        city: "Новый Город",
      };
      dispatch(addUser(newUser));
      setNewUserName("");
      setNewUserEmail("");
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Загрузка...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image source={{ uri: item.picture }} style={styles.userImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>Возраст: {item.age}</Text>
              <Text>Город: {item.city}</Text>
            </View>
            <Button
              title="Удалить"
              onPress={() => dispatch(deleteUser(item.id))}
              color="#ff4d4d"
            />
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Имя пользователя"
          value={newUserName}
          onChangeText={setNewUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email пользователя"
          value={newUserEmail}
          onChangeText={setNewUserEmail}
        />
        <Button
          title="Добавить пользователя"
          onPress={handleAddUser}
          color="#4CAF50"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  userContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  inputContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Lab2;
