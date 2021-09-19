import React from "react";
import { View } from "react-native";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer";
import { TweetType } from "../../types";

export type TweetProps = {
    tweet: TweetType,
};
const Tweet = ({tweet}: TweetProps) => {
  return (
    <View>
      <LeftContainer user={tweet.user} />
      <MainContainer />
    </View>
  );
};

export default Tweet;
