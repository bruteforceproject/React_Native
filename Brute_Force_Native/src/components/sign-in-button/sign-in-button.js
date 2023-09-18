import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';

const SignInButton = ({ onPress, text, type='primary' }) => {
    return (
        <Pressable onPress={onPress} style={[styles.field, styles[`field_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}> {text} </Text>
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
    field_primary: {
        backgroundColor: '#3B71F3',
    },
    field_tertiary: {
        
    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    },
    text_tertiary: {
        fontWeight: 'light',
        color: 'gray'
    },
});

export default SignInButton