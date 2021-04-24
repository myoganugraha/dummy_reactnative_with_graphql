/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Platform} from 'react-native';
//import your ApolloProvider from react-apollo to wrap your app.
import {ApolloProvider} from 'react-apollo';
//import ApolloClient, InMemoryCache, and HttpLink to define your client to cnnect to your graphql server.//#endregion
import {ApolloClient, InMemoryCache, HttpLink} from 'apollo-client-preset';
import Home from './screen/Home';
import PlayersList from './screen/PlayerList';

import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const client = new ApolloClient({
  //Assign to your cache property a instance of a InMemoryCache
  cache: new InMemoryCache(),
  //Assign your link with a new instance of a HttpLink linking to your graphql server.
  link: new HttpLink({
    uri: Platform.select({
      ios: 'http://localhost:4000/graphql',
      android: 'http://10.0.2.2:4000/graphql',
    }),
  }),
});

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="PlayerList" component={PlayersList} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
