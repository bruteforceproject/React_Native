import React , {useState} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import VisibleText from '../../components/text/text';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const onBackPressed = () => {
        navigation.navigate('SignIn')
    }
    const onNextPressed = async () => {
        try {
            const response = await fetch("http://ip:8000/email-verification", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({email: email}),
            });
        
            if (response.status === 200) {
                const data = await response.json();
                let userPhone = data.userPhone;
                let userEmail = data.userEmail;
                userEmail = userEmail.toString();
                console.log(userEmail)
                console.log(userPhone)
                navigation.navigate("PhoneNumberConfirmation", { userPhone: userPhone, userEmail: userEmail })
            }
          } catch (error) {
            console.error("Error:", error);
          }
    }

    const onForgotAccountIDPressed = () => {
        navigation.navigate('FindAccount')
    }

    return (
        <View style={styles.root}>

            <VisibleText
                text='Portal ED'
                type='title_light'
            />

            <VisibleText
                text='Trouble Signing In?'
                type='title_bold'
            />

            <VisibleText
                text='Enter your email'
                type='subtext'
            />

            <FieldInput 
                placeholder='Email' 
                value={email} 
                setValue={setEmail}/>

            
            <View style={styles.row}>
                <SignInButton 
                    text='Back' 
                    onPress={onBackPressed}
                    fieldType='row'
                    textType='button_white_bold'
                    />

                <SignInButton 
                    text='Next' 
                    onPress={onNextPressed}
                    fieldType='row'
                    textType='button_white_bold'
                    />
            </View>

            <SignInButton 
                text="I don't know my email"
                onPress={onForgotAccountIDPressed}
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
        paddingVertical: '50%',
    },

    row: {
        flexDirection: 'row'
    }
});

export default ForgotPasswordScreen