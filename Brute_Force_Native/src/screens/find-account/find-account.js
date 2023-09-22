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

    const onNextPressed = () => {
        navigation.navigate('AccountFound')
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
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

            <SignInButton
                text='Next' 
                onPress={onNextPressed}
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

export default FindAccountScreen