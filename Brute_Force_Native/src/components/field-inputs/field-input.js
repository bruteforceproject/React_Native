import React from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';

const FieldInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.field}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles =  StyleSheet.create({
    field: {
        backgroundColor: 'white',
        width: '80%',
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    input: {},
})

export default FieldInput