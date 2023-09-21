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
        
    }

    const onBackPressed = () => {
        navigation.navigate('ForgotPassword')
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
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
                setValue={setPhoneNumber}/>

            <SignInButton 
                text='Next' 
                onPress={onNextPressed}
                fieldType='blue_button'
                textType='button_white_bold'
                />

            <SignInButton 
                text='Back' 
                onPress={onBackPressed}
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

export default PhoneNumberConfirmationScreen