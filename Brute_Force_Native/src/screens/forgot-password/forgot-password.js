import React , {useState} from 'react';
import { View, Text , Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../assets/TransparentPELogo.png';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import VisibleText from '../../components/text/text';

const ForgotPasswordScreen = () => {

    const [accountID, setAccountID] = useState('');

    const onNextPressed = () => {
        console.warn('Next');
    }

    const onForgotAccountIDPressed = () => {
        console.warn('Forgot ID');
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.root}>

            <VisibleText
                text='Portal ED'
                type='title_light'
            />

            <VisibleText
                text='Trouble Signing In?'
                type='title_bold'
            />

            <FieldInput 
                placeholder='Account ID' 
                value={accountID} 
                setValue={setAccountID}/>

            <SignInButton 
                text='Next' 
                onPress={onNextPressed}
                fieldType='blue_button'
                textType='button_white_bold'
                />

            <SignInButton 
                text="I don't know my Account ID"
                onPress={onForgotAccountIDPressed}
                fieldType='tertiary'
                textType='link'
                />

        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingVertical: '60%',
    }
});

export default ForgotPasswordScreen