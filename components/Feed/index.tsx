import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { API, graphqlOperation } from "aws-amplify";

import Tweet from "../Tweet";
import { listTweets } from "../../graphql/queries";

const Feed = () => {

  const [tweets, setTweets] = useState([]);

  useEffect( () => {
    const fetchTweets = async () => {
      try{
        const tweetsData = await API.graphql(graphqlOperation(listTweets));
        setTweets(tweetsData.data.listTweets.items)
      }catch(e){
        console.log(e);
      }
    }
    fetchTweets();
  }, [])

  return (
    <View style={{width: "100%"}}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id }
      />
    </View>
  );
};

export default Feed;
