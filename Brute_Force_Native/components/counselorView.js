import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const logo = require('../assets/logo1.png'); // Make sure to import your logo

function CounselorView() {
  const [studentID, setStudentID] = useState('');
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8000/getStudents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentID,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log('testing', data);
          navigation.navigate('StudentOverview', { myData: data });
        } else {
          alert('Error: \nStudent ID is not found!');
          console.log(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('/');
          }}
        >
          <Text style={styles.logoutButton}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.labelContainer}>
          <Text style={styles.studentIdText}>Student ID:</Text>
        </View>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.inputSearch}
            placeholder="Search..."
            onChangeText={(text) => setStudentID(text)}
          />
          <Button
            title="Search"
            onPress={async () => {
              if (studentID) {
                await getData();
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'flex-end',
  },
  logoutButton: {
    fontSize: 16,
    color: 'blue',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  labelContainer: {
    marginTop: 10,
  },
  studentIdText: {
    fontSize: 18,
  },
  searchBar: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  inputSearch: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
});

export default CounselorView;
