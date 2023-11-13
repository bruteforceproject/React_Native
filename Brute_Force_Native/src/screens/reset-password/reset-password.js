import React , {useState} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import VisibleText from '../../components/text/text';
import { useNavigation, useRoute } from '@react-navigation/native';

const ResetPasswordScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const {userEmail} = route.params;

    const [password, setPassword] = useState('');

    const onFinish = async () => {
        try {
            const response = await fetch("http://10.0.0.244:8000/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: password
                }),
            });
        
            if (response.status === 200) {
                navigation.navigate("SignIn")
            }
          } catch (error) {
            console.error("Error:", error);
          }
    }

    return (
        <View style={styles.root}>

            <VisibleText
                text='Portal ED'
                type='title_light'
            />

            <VisibleText
                text='Fill in your new password'
                type='title_bold'
            />

            <FieldInput 
                placeholder='New password' 
                value={password} 
                setValue={setPassword}/>

            <SignInButton 
                text='Finish' 
                onPress={onFinish}
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

export default ResetPasswordScreen