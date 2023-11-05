import React , {useState} from 'react';
import { View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/logo1.png';
import FieldInput from '../../components/field-inputs/field-input';
import VisibleText from '../../components/text/text';
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
     
        <View style={styles.root}>
            <Image source={Logo} 
                style={styles.logo} 
                resizeMode='contain' 
            />

            <VisibleText
                text='Portal ED'
                type='title_bold'
            />

            <VisibleText
                text='Sign in to your Portal ED account'
                type='subtext'
            />

            <FieldInput 
                placeholder='Email' 
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
                text='Forgot email or password?' 
                onPress={onForgotPressed}
                fieldType='tertiary'
                textType='link'
                />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex:1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: '25%',
    },

    logo: {
        width: '70%',
        maxWidth: 300,
        height: 100,
        marginBottom: 50, 
        maxHeight: 300,
    },
});

export default SignInScreen