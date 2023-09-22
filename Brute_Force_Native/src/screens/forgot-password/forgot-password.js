import React , {useState} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import VisibleText from '../../components/text/text';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {

    const [accountID, setAccountID] = useState('');
    const navigation = useNavigation();

    const onNextPressed = () => {
        navigation.navigate('PhoneNumberConfirmation')
    }

    const onForgotAccountIDPressed = () => {
        navigation.navigate('FindAccount')
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
        backgroundColor: 'white'
    }
});

export default ForgotPasswordScreen