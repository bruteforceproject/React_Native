import React , {useState, useRef} from 'react';
import { View, StyleSheet, ScrollView, TextInput} from 'react-native';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import VisibleText from '../../components/text/text';
import { useNavigation } from '@react-navigation/native';

const CodeVerificationScreen = () => {

    const [code, setCode] = useState('');
    const navigation = useNavigation();
    const inputRefs = useRef<Array<TextInput>>([])

    const onNextPressed = () => {
        //navigation.navigate('ResetPassword')
    }

    const onBackPressed = () => {
        //navigation.navigate('ForgotPassword')
    }

    const onCodeInput = (text, index) => {
        if (text.maxLength !==0) { 
            return inputRefs.current[index + 1].focus()
        }
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

            <View style={styles.container}>
                {[...new Array(4)].map((index) => (
                    <TextInput
                        ref={ref => {
                            if (ref && !inputRefs.current.includes(ref)) {
                                inputRefs.current = [...inputRefs.current, ref]
                            }
                        }}
                        key={index}
                        style={styles.input}
                        maxLength={1}
                        contextMenuHidden
                        selectTextOnFocus
                        editable={true}
                        keyboardType='decimal-pad'
                        onChangeText={text => onCodeInput(text, index)}
                    />
                ))}
            </View>

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
    },
    container: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        fontSize: 24,
        textAlign: 'center',
        width: 45,
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    
});

export default CodeVerificationScreen