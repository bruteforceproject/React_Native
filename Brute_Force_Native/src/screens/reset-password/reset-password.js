import React , {useState} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import VisibleText from '../../components/text/text';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {

    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const onFinish = () => {
        navigation.navigate('SignIn')
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