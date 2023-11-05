import React , {useState} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import VisibleText from '../../components/text/text';
import { useNavigation } from '@react-navigation/native';

const FindAccountScreen = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const onBackPressed = () => {
        navigation.navigate('ForgotPassword')
    }

    const onNextPressed = () => {
        navigation.navigate('AccountFound')
    }

    return (
        <View style={styles.root}>

            <VisibleText
                text='Portal ED'
                type='title_light'
            />

            <VisibleText
                text='Fill the information below to find your Account ID'
                type='title_bold'
            />

            <FieldInput 
                placeholder='first name' 
                value={firstName} 
                setValue={setFirstName}/>

            <FieldInput 
                placeholder='last name' 
                value={lastName} 
                setValue={setLastName}/>

            <FieldInput 
                placeholder='email address' 
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

export default FindAccountScreen