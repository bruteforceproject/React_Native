import React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import VisibleText from '../../components/text/text';
import { useNavigation } from '@react-navigation/native';

const AccountFoundScreen = () => {

    const navigation = useNavigation();

    const onBackToSignIn = () => {
        navigation.navigate('SignIn')
    }

    return (
        <View style={styles.root}>

            <VisibleText
                text='Portal ED'
                type='title_bold'
            />

            <VisibleText
                text='Account ID found'
                type='title_light'
            />

            <VisibleText
                text='Your Account ID is:'
                type='text_subtext'
            />

            <SignInButton
                text='Back to Sign In' 
                onPress={onBackToSignIn}
                fieldType='blue_button'
                textType='button_white_bold' 
                />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex:1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: '50%',
    },
});

export default AccountFoundScreen