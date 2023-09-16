import React , {useState} from 'react';
import { View, Text , Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/TransparentPELogo.png';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';

const SignInScreen = () => {

    const [accountID, setAccountID] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    return (
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

            <SignInButton/>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },

    logo: {
        width: '70%',
        maxWidth: 300,
        height: 100, 
        maxHeight: 300,
    },
});

export default SignInScreen