import React from 'react';
import {Text, StyleSheet} from 'react-native';

const VisibleText = ({ text, type}) => {
    return (
        <Text 
            style={[styles.text,
                    styles[`text_${type}`]
                    ]}> {text} 
        </Text>
    );
};

const styles =  StyleSheet.create({
    text: {
        color: 'rgb(73, 73, 73)',
        textAlign: 'center'
    },
    text_subtext: {
        margin: 10
    },
    text_title_light: {
        fontSize: 24,
        fontWeight: 'light',
        margin: 10
    },
    text_title_bold: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
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