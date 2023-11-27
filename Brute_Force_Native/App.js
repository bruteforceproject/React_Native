import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './src/navigation';

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('@login_token');
        if (token !== null) {
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        // Error retrieving data
        console.error(error);
        setIsUserLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isUserLoggedIn === null) {
    return null; // or a loading screen until the check is completed
  }

  return (
    <SafeAreaView style={styles.root}>
      <Navigation isUserLoggedIn={isUserLoggedIn} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});
