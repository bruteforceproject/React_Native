import React , {useState} from 'react';
import { View, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import FieldInput from '../../components/field-inputs/field-input';
import SignInButton from '../../components/sign-in-button/sign-in-button';
import VisibleText from '../../components/text/text';
import { useNavigation, useRoute } from '@react-navigation/native';

const PhoneNumberConfirmationScreen = () => {

    const route = useRoute();
    const {userPhone ,userEmail} = route.params;

    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation();

    const onNextPressed = async () => {

        if(userPhone === phoneNumber){
            navigation.navigate("CodeVerification", { userPhone: userPhone, userEmail: userEmail })

            try {
                const response = await fetch("http://10.0.0.244:8000/start-verify", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    phone: phoneNumber
                    }),
                });
                
              } catch (error) {
                console.error("Error:", error);
              }
        }

        else {
            console.log("Wrong Number")
        }
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
                //keyboardType={'number-pad'}    
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