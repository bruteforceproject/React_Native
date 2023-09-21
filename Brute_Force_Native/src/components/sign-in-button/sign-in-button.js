import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import VisibleText from '../text/text';

const SignInButton = ({ onPress, text, textType, fieldType='blue'}) => {
    return (
        <Pressable 
            onPress={onPress} 
            style={[styles.field,
                    styles[`field_${fieldType}`]
                    ]}>

            <VisibleText
                text={text}
                type={textType}
            />
        </Pressable>
    );
};

const styles =  StyleSheet.create({
    field: {
        width: '80%',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    field_blue_button: {
        backgroundColor: '#3B71F3',
    },
    field_tertiary: {
        
    }
});

export default SignInButton