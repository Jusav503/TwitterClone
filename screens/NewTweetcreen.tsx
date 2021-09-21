import { EvilIcons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePicture from "../components/ProfilePicture";

import { View } from "../components/Themed";
import Colors from "../constants/Colors";

export default function NewTweetScreen() {
  const [tweet, setTweet] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const onPostTweet = () => {
    console.log(`posting the tweet: ${tweet} Image:${imageUrl}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <EvilIcons name="close" size={35} color={Colors.light.tint} />
        <TouchableOpacity style={styles.button} onPress={onPostTweet}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.newTweetContainer}>
        <ProfilePicture
          image={
            "https://estaticos-cdn.sport.es/clip/24a12ea8-9380-4181-ba6c-dda114a22c30_media-libre-aspect-ratio_default_0.jpg"
          }
        />
        <View style={styles.inputsContainer}>
          <TextInput
            value={tweet}
            onChangeText={(value: string) => setTweet(value)}
            style={styles.tweetInput}
            multiline={true}
            numberOfLines={3}
            placeholder={"Whatsup?"}
          />
          <TextInput
            style={styles.imageInput}
            placeholder={"Image url"}
            value={imageUrl}
            onChangeText={(value: string) => setImageUrl(value)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },
  button: { backgroundColor: Colors.light.tint, borderRadius: 30 },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  newTweetContainer: { flexDirection: "row", padding: 15 },
  inputsContainer: { marginLeft: 10 },
  tweetInput: { height: 100, maxHeight: 300, fontSize: 20 },
  imageInput: {},
});
