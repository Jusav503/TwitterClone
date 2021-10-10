import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { API, graphqlOperation, Auth } from "aws-amplify";

import { TweetType } from "../../../../types";
import styles from "./styles";
import { createLike } from "../../../../graphql/mutations";

export type FooterContainerProps = {
  tweet: TweetType;
};
const Footer = ({ tweet }: FooterContainerProps) => {
  const [myLike, setMyLike] = useState(null);
  const [user, setUser] = useState(null);

  console.log(tweet);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);

      const searchedLike = await tweet.likes.items.find(
        (like) => like.userID === currentUser.attributes.sub
      );
      setMyLike(searchedLike);
    };
    fetchUser();
  }, []);
  const onLike = async () => {
    if (!user) {
      return;
    }

    const like = {
      userID: user.attributes.sub,
      tweetID: tweet.id,
    };
    try {
      const res = await API.graphql(
        graphqlOperation(createLike, { input: like })
      );

      setMyLike(res.data.createLike);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FeatherIcon name="message-circle" />
        <Text>{tweet.numberOfComments}</Text>
      </View>

      <View style={styles.iconContainer}>
        <EvilIcon name="retweet" />
        <Text>{tweet.numberOfRetweets}</Text>
      </View>

      <TouchableOpacity onPress={onLike}>
        <View style={styles.iconContainer}>
          <AntDesignIcon
            name={!myLike ? "hearto" : "heart"}
            color={!myLike ? "grey" : "red"}
          />
          <Text>{tweet.numberOfLikes}</Text>
        </View>
      </TouchableOpacity>

      <EvilIcon name="share-google" />
    </View>
  );
};

export default Footer;

function FeatherIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
}) {
  return (
    <Feather size={15} color={"grey"} style={{ marginRight: 5 }} {...props} />
  );
}
function EvilIcon(props: {
  name: React.ComponentProps<typeof EvilIcons>["name"];
}) {
  return (
    <EvilIcons size={25} color={"grey"} style={{ marginRight: 5 }} {...props} />
  );
}
function AntDesignIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
}) {
  return (
    <AntDesign size={15} color={"grey"} style={{ marginRight: 5 }} {...props} />
  );
}
