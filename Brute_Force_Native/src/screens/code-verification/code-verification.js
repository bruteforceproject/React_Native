import React , {useState} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import VisibleText from '../../components/text/text';
import { useNavigation } from '@react-navigation/native';

const CodeVerificationScreen = () => {

    const [code, setCode] = useState('');
    const navigation = useNavigation();

    const onNextPressed = () => {
        navigation.navigate('ResetPassword')
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
                text='Enter the 4 digit code below'
                type='title_bold'
            />

            <FieldInput 
                placeholder='Code' 
                value={code} 
                setValue={setCode}/>

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

export default CodeVerificationScreen