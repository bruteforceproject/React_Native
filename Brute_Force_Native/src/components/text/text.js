import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';

const VisibleText = ({ text, type}) => {
    return (
        <Text 
            style={[styles[`text_${type}`]
                    ]}> {text} </Text>
    );
};

const styles =  StyleSheet.create({
    text_body: {
        color: 'black',
    },
    text_subtext: {
        color: 'black',
        margin: 10
    },
    text_title_light: {
        fontSize: 24,
        fontWeight: 'light',
        color: 'black',
        margin: 10
    },
    text_title_bold: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        margin: 10
    },
    text_link: {
        fontWeight: 'light',
        color: 'gray'
    },
    text_button_white_bold: {
        fontWeight: 'bold',
        color: 'white'
    },
});

export default VisibleText