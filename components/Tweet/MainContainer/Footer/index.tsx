import { AntDesign, EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image } from "react-native";
import { TweetType } from "../../../../types";
import styles from "./styles";

export type FooterContainerProps = {
  tweet: TweetType;
};
const Footer = ({ tweet }: FooterContainerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer} >
          <FeatherIcon name="message-circle" />
          <Text style={styles.number}>{tweet.numberOfComments}</Text>
      </View>

      <View style={styles.iconContainer}>
          <EvilIcon name="retweet" />
          <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
      </View>

      <View style={styles.iconContainer}>
          <AntDesignIcon name="hearto" />
          <Text style={styles.number}>{tweet.numberOfLikes}</Text>
      </View>

      <EvilIcon name="share-google" />
    </View>
  );
};

export default Footer;

function FeatherIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
}) {
  return <Feather size={22} color={"grey"} style={{marginRight:5}} {...props} />;
}
function EvilIcon(props: {
  name: React.ComponentProps<typeof EvilIcons>["name"];
}) {
  return <EvilIcons size={33} color={"grey"} style={{marginRight:5}} {...props} />;
}
function AntDesignIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
}) {
  return <AntDesign size={20} color={"grey"} style={{marginRight:5}} {...props} />;
}
