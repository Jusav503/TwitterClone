import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import config from "./aws-exports";
import { getUser } from "./graphql/queries";
import { createUser } from "./graphql/mutations";

Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return "https://i.pinimg.com/originals/fd/1b/43/fd1b43e4ae73a3d6205e7bd64784daba.jpg";
  };
  const saveUserToDB = async (user) => {
    await API.graphql(graphqlOperation(createUser, { input: user }));
  };

  useEffect(() => {
    const updateUser = async () => {
      //Get current aunthenticated user
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true,});

      if (userInfo) {
        //Check if user alredy exists in db
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );
        console.log(userData);

        if (!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage(),
          };
          await saveUserToDB(user);
        } else {
          console.log("User alredy exists");
        }
      }

      //If it doesn't create the user in the db
    };
    updateUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
