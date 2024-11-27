import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from '../ThemeContext';

const menuItems = [
  { id: 1, title: "Lab1" },
  { id: 2, title: "Lab2" },
  { id: 3, title: "Lab3" },
  { id: 4, title: "Lab4" },
];

function LabHeader({ colors }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, { color: colors.text }]}>
        Laboratory work
        {"\n"}
        Nikiforov Arsen
        {"\n"}
        FIIT-21
      </Text>
    </View>
  );
}

function LabButton({ title, onPress, colors }) {
  return (
    <TouchableOpacity 
      style={[styles.buttonContainer, { borderColor: colors.text }]} 
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );
}

function Home({ navigation }) {
  const { colors } = React.useContext(ThemeContext);

  const handleNavigation = (path) => {
    navigation.navigate(path);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LabHeader colors={colors} />
      {menuItems.map((lab) => (
        <LabButton 
          key={lab.id} 
          title={lab.title} 
          onPress={() => handleNavigation(lab.title.replace(' ', ''))}
          colors={colors}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 480,
    width: "100%",
    paddingLeft: 65,
    paddingRight: 65,
    paddingTop: 226,
    paddingBottom: 226,
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
    fontFamily: "Pixelify Sans, sans-serif",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 1.4,
  },
  headerContainer: {
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
    textAlign: "center",
  },
  buttonContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 21,
    width: 184,
    maxWidth: "100%",
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 12,
    paddingBottom: 12,
  },
  buttonText: {
    textAlign: "center",
  },
});

export default Home;