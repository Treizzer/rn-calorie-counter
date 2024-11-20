import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const staticInfo = {
  name: "Hugo Santana",
  uri: "https://static.vecteezy.com/system/resources/previews/007/404/906/non_2x/slice-of-pizza-cartoon-cartoon-illustration-cartoon-clipart-free-vector.jpg",
};

const Header = () => {
  const { canGoBack, goBack } = useNavigation();

  return (
    <View style={styles.container}>
      {
        canGoBack() ? (
          <View style={styles.arrowContainer}>
            <Button
              onPress={() => goBack()}
              icon={<Icon name="arrow-back" size={24} />}
              type="clear"
            />
          </View>
        ) :
          undefined
      }
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{`¡Hola, ${staticInfo.name}!`}</Text>
        <Text style={styles.subtitle}>Bienvenido a tu objetivo</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{ uri: staticInfo.uri }} style={styles.profileImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  name: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#808080",
    fontSize: 14,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  arrowContainer: {
    marginLeft: -12,
  },
});

export default Header;