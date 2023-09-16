import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/screens/sign-in/sign-in';
import ParentView from './components/parentView'; // This should match what you've exported
import StudentOverview from './components/studentOverview';
import { SafeAreaView , StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <SafeAreaView style={styles.root}>
      <SignInScreen/>
    </SafeAreaView>
   
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="ParentView">
    //     <Stack.Screen name="ParentView" component={ParentView} />
    //     <Stack.Screen name="StudentOverview" component={StudentOverview} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
});