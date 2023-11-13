import React , {useState} from 'react';
import { View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/logo1.png';
import FieldInput from '../../components/field-inputs/field-input';
import VisibleText from '../../components/text/text';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = async () => {
        try {
            const response = await fetch("http://localhost:8000/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({email: email, password: password}),
            });
        
            if (response.status === 200) {
                const data = await response.json();
                let parent_id = data.userId;
                parent_id = parent_id.toString();
                console.log(parent_id)
                // variable name: variable value
                navigation.navigate("ParentView", { parent_id: parent_id })
            }
          } catch (error) {
            console.error("Error:", error);
          }
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
                value={email} 
                setValue={setEmail}/>

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