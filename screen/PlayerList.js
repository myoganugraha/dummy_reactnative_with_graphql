//import React, and PureComponent to create a react class component
import React from 'react';
//import your UI from react-native
import {
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  View,
  FlatList,
} from 'react-native';
//Import the Query component from react apollo that will responsible for retrieving data from your graphql server.
import {Query} from 'react-apollo';
//import gql from graphql-tag for making queries to our graphql server.
import gql from 'graphql-tag';

const query = gql`
  query {
    players {
      position
      name
      team
      jerseyNumber
    }
  }
`;

const PlayerList = ({ navigation }) => {
  const _renderItem = ({item}) => {
    //Return the UI
    //It will return the text green or red depending if that player won a super bowl or not.
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemText}>Position: {item.position}</Text>
        <Text style={styles.itemText}>Name: {item.name}</Text>
        <Text style={styles.itemText}>Team: {item.team}</Text>
        <Text style={styles.itemText}>Jersey Number: {item.jerseyNumber}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/*Can use an array to override styles for your UI elements.*/}
      <Text style={[styles.itemText, styles.headerText]}>
        Top 25 NFL Players List
      </Text>
      <Query query={query}>
        {/* The props.children of the Query will be a callback with a response, and error parameter. */}
        {(response, error) => {
          console.log({ response })
          console.log({ error })
          if (error) {
            console.log('Response Error-------', error);
            return <Text style={styles.errorText}>{error}</Text>;
          }
          //If the response is done, then will return the FlatList
          if (response && response.data !== undefined) {
            console.log('response-data-------------', response);
            //Return the FlatList if there is not an error.
            return (
              <FlatList
                data={response.data.players}
                renderItem={(item) => _renderItem(item)}
              />
            );
          }

          return (
            <View/>
          )
        }}
      </Query>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //Instead of do 100% of height and width is doing flex: 1,
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    marginTop: 30,
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 8,
  },
  itemText: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 20,
  },
});

export default PlayerList;
