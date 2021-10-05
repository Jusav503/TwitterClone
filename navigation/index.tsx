import { useEffect, useState } from 'react';
import { FontAwesome, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProfilePicture from '../components/ProfilePicture';
import NewTweetScreen from '../screens/NewTweetcreen';
import { getUser } from '../graphql/queries';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// Displaying modals on top of all other content.
const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {

  const [user, setUser] = useState(null);

  useEffect( () => {
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

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen"  
        component={BottomTabNavigator}  
        options={{ 
          headerShown: true, 
          headerTitleAlign: 'center',
          headerTitle: () => (
            <TabBarIcon name="twitter" color={Colors.light.tint} />
          ),
          headerRight: () => (
            <MaterialCommunityIcon name="star-four-points-outline" color={Colors.light.tint} />
          ),
          headerLeft: () => (
            <ProfilePicture size={40} image={user?.image} />
          )
        }} 
      />
      <Stack.Screen name="NewTweet" component={NewTweetScreen} options={{headerShown: false}} />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

// A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
        headerShown: false
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <Octicon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <Ionicon name="search-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <Ionicon name="notifications-outline" color={color} size={22} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <Ionicon name="md-mail-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}


// Icons variables
function Octicon(props: {
  name: React.ComponentProps<typeof Octicons>['name'];
  color: string;
}) {
  return <Octicons size={25} style={{ marginBottom: -2 }} {...props} />;
}
function Ionicon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={25} style={{ marginBottom: -2 }} {...props} />;
}
function MaterialCommunityIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={25} style={{ marginBottom: -3 }} {...props} />;
}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}
