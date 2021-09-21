import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const NewTweetButton = () => {
  const onPress = () => {
    console.warn("Hello there");
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={onPress}
      >
        <MaterialCommunityIcons name="feather" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default NewTweetButton;
