import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParentView from './components/parentView'; // This should match what you've exported
import StudentOverview from './components/studentOverview';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ParentView">
        <Stack.Screen name="ParentView" component={ParentView} />
        <Stack.Screen name="StudentOverview" component={StudentOverview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
