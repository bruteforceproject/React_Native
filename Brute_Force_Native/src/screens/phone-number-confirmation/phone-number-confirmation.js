import React , {useState} from 'react';
import { View, Text , Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import VisibleText from '../../components/text/text';
import { useNavigation } from '@react-navigation/native';

const PhoneNumberConfirmationScreen = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation();

    const onNextPressed = () => {
        navigation.navigate('CodeVerification')
    }

    const onBackPressed = () => {
        navigation.navigate('ForgotPassword')
    }

    return (
        <View style={styles.root}>

            <VisibleText
                text='Portal ED'
                type='title_light'
            />

            <VisibleText
                text='Confirm your phone number'
                type='title_bold'
            />

            <VisibleText
                text='Enter your phone number'
                type='subtext'
            />

            <FieldInput 
                placeholder='Phone Number' 
                value={phoneNumber} 
                setValue={setPhoneNumber}
                keyboardType={'number-pad'}    
                />

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

export default PhoneNumberConfirmationScreen