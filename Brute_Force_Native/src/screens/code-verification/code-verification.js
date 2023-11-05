import React , {useState, useRef} from 'react';
import { View, StyleSheet, ScrollView, TextInput} from 'react-native';
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

export default CodeVerificationScreen