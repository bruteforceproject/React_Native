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
        <ScrollView showsHorizontalScrollIndicator={false}>
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingVertical: '60%',
        backgroundColor: 'white'
    }
});

export default AccountFoundScreen