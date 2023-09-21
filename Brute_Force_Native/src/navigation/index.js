import React from "react";
import { View, Text } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from '../screens/sign-in/sign-in';
import ForgotPasswordScreen from '../screens/forgot-password/forgot-password';
import PhoneNumberConfirmationScreen from '../screens/phone-number-confirmation/phone-number-confirmation';
import ParentView from '../../components/parentView'; // This should match what you've exported
import StudentOverview from '../../components/studentOverview';


const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}> 
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="PhoneNumberConfirmation" component={PhoneNumberConfirmationScreen} />
                <Stack.Screen name="ParentView" component={ParentView} />
                <Stack.Screen name="StudentOverview" component={StudentOverview} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation   