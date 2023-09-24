import React from "react";
import { View, Text } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from '../screens/sign-in/sign-in';
import ForgotPasswordScreen from '../screens/forgot-password/forgot-password';
import FindAccountScreen from "../screens/find-account/find-account";
import AccountFoundScreen from "../screens/account-found/account-found";
import PhoneNumberConfirmationScreen from '../screens/phone-number-confirmation/phone-number-confirmation';
import CodeVerificationScreen from "../screens/code-verification/code-verification";
import ResetPasswordScreen from "../screens/reset-password/reset-password";
import ParentView from '../../components/parentView'; // This should match what you've exported
import StudentOverview from '../../components/studentOverview';
import AcknowledgeView from "../../components/acknowledgeView";


const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}> 
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="FindAccount" component={FindAccountScreen} />
                <Stack.Screen name="AccountFound" component={AccountFoundScreen} />
                <Stack.Screen name="PhoneNumberConfirmation" component={PhoneNumberConfirmationScreen} />
                <Stack.Screen name="CodeVerification" component={CodeVerificationScreen} />
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                <Stack.Screen name="ParentView" component={ParentView} />
                <Stack.Screen name="StudentOverview" component={StudentOverview} />
                <Stack.Screen name="AcknowledgeView" component={AcknowledgeView} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation   