
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

const ParentView = ({ navigation }) => {
 
  useEffect(() => {
    navigation.setOptions({
      title: 'Parent Portal',
      headerTitleAlign: 'center'
    });
  }, [navigation]);

  const navigateToStudentOverview = () => {
    navigation.navigate('StudentOverview');
  }
  
  
  const getButtonStyle = (text, id) => {
    const textLength = text.length;
    let styleName;

    if (id === 'textLength') {
      styleName = textLength <= 10 ? 'short' : textLength <= 20 ? 'medium' : 'long';
    } else {
      styleName = textLength <= 15 ? 'short' : textLength <= 25 ? 'medium' : 'long';
    }

    return styles[styleName];
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/TransparentPELogo.png")} style={{ width: 200, height: 200, marginTop: -150 }}/>
      {/* <Text numberOfLines={1} style={styles.PortalEdHeader}>Portal Ed</Text> */}
      <Text style={styles.GuardianName}>Parent Name</Text>

      <TouchableOpacity style={[styles.buttonContainer, getButtonStyle('Student Name', 'textLength')]}
                        onPress={navigateToStudentOverview}> 
        <View style={styles.buttonContent}>
          <Text numberOfLines={1} style={styles.studentName}>Student Name</Text>
          <Text style={styles.alertText}>2 Unacknowledged Alerts!</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonContainer, getButtonStyle('Another Student', 'textLength2')]}
                        onPress={navigateToStudentOverview}>
        <View style={styles.buttonContent}>
          <Text numberOfLines={1} style={styles.studentName}>Another Student</Text>
          <Text style={styles.studentId}>0 Unacknowledged Alerts</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PortalEdHeader: {
    fontSize: 36,
    marginBottom: 25,
  },
  GuardianName: {
    fontSize: 22,
    marginBottom: 20,
  },
  studentName: {
    fontSize: 20, 
  },
  alertText: {
    fontSize: 16,
    color: 'red',

  },
  buttonContainer: {
    backgroundColor: '#D9D9D9', 
    padding: 10, // Reduced padding
    borderRadius: 5,
    margin: 5,
    width: 267,  // Fixed width
    height: 120,  // Fixed height
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  buttonContent: {
    flexDirection: 'column',  // Set direction to column for vertical arrangement
    alignItems: 'center', // Align items to the center
  },
  short: {
    backgroundColor: '#D9D9D9',
  },
  medium: {
    backgroundColor: '#D9D9D9',
  },
  long: {
    backgroundColor: '#D9D9D9',
  },
  studentId: {
    marginLeft: 10,
    fontSize: 16,
  },
  studentId2: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ParentView;