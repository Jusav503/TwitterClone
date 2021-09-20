import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image } from "react-native";
import { TweetType } from "../../../types";
import styles from "./styles";
import Footer from "./Footer";

export type MainContainerProps = {
  tweet: TweetType;
};
const MainContainer = ({ tweet }: MainContainerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.tweetHeaderContainer}>
        <View style={styles.tweetHeaderNames}>
          <Text style={styles.name} >{tweet.user.name}</Text>
          <Text style={styles.username}>@ {tweet.user.username}</Text>
          <Text style={styles.createdAt}>47s</Text>
        </View>
        <Ionicons style={styles.chevron} name="chevron-down" />
      </View>

      <View>
        <Text style={styles.content} >{tweet.content}</Text>
        {!!tweet.image && <Image style={styles.image} source={{ uri: tweet.image }} />}
      </View>

      <Footer tweet={tweet} />

    </View>
  );
};

export default MainContainer;
