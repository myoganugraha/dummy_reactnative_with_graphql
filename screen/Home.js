import {View, Text, StyleSheet, Platform, Button} from 'react-native';
import React from 'react';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('PlayerList');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //Instead of doing height and width 100%, just do flex: 1, and have justifyContent and ALignItems set to center.
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 23,
  },
});

export default Home;
