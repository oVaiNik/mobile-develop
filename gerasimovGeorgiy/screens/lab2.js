import { Button, SafeAreaView, Text, View,ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

const Lab2 = () => {
  const [data, setData] = useState({});
  const getData = () => {
    axios.get("https://catfact.ninja/fact").then(({ data }) => {
      setData(data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <View
        style={{
          margin: 20,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{data?.fact}</Text>
        <Button
          title={"press"}
          onPress={() => {
            getData();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Lab2;
