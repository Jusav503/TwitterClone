import { EvilIcons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API, graphqlOperation, Auth } from "aws-amplify";

import ProfilePicture from "../components/ProfilePicture";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import { createTweet } from "../graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../graphql/queries";

export default function NewTweetScreen() {
  const [tweet, setTweet] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const navigation = useNavigation();
  const [user, setUser] = React.useState(null);

  React.useEffect( () => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      if(!userInfo){
        return;
      }

      try{
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }));
        if(userData){
          setUser(userData.data.getUser);
        }
      }catch (e) {
        console.log(e);
      }
    }
    fetchUser();
  }, [])

  const onPostTweet = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      if(!currentUser){
        return;
      }
      const newTweet = {
        content: tweet,
        image: imageUrl,
        userID: currentUser.attributes.sub,
      };
      await API.graphql(graphqlOperation(createTweet, { input: newTweet }));
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EvilIcons name="close" size={35} color={Colors.light.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPostTweet}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.newTweetContainer}>
        <ProfilePicture
          image={user?.image}
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
