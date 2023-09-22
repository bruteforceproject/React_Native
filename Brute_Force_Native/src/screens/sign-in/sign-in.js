import React , {useState} from 'react';
import { View, Text , Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../assets/TransparentPELogo.png';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {

    const [accountID, setAccountID] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('ParentView')
    }

    const onForgotPressed = () => {
        navigation.navigate('ForgotPassword')
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.root}>
            <Image source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode='contain' 
            />

            <FieldInput 
                placeholder='Account ID' 
                value={accountID} 
                setValue={setAccountID}/>

            <FieldInput 
                placeholder='Password' 
                value={password} 
                setValue={setPassword}
                secureTextEntry
                />
        
            <SignInButton 
                text='Sign In' 
                onPress={onSignInPressed}
                fieldType='blue_button'
                textType='button_white_bold'
                />

            <SignInButton 
                text='Forgot Account ID or password?' 
                onPress={onForgotPressed}
                type='tertiary'
                textType='link'
                />

        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 100,
    },

    logo: {
        width: '70%',
        maxWidth: 300,
        height: 100, 
        maxHeight: 300,
    },
});

export default SignInScreen