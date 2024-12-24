import { StyleSheet } from "react-native";

export const getStyles = (isDarkTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#000" : "#87CEEB",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      alignItems: "center",
      padding: 20,
      backgroundColor: isDarkTheme ? "#333" : "#FFFFFF",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      color: isDarkTheme ? "#FFF" : "#333",
      textAlign: "center",
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkTheme ? "#FFF" : "#333",
      textAlign: "center",
      marginBottom: 20,
    },
    subContent: {
      alignItems: "center",
      marginTop: 20,
      padding: 10,
      backgroundColor: isDarkTheme ? "#444" : "#FFFFFF",
    },
    qr: {
      Color: isDarkTheme ? "#FFFFFF" : "#000",
      BackgroundColor: isDarkTheme ? "#333" : "#FFFFFF",
    },
    input: {
      alignContent: "center",
      width: 230,
      borderWidth: 1,
      padding: 5,
      textAlign: "center",
      textAlignVertical: "center",
      color: isDarkTheme ? "#FFF" : "#000",
    },
  });
};
