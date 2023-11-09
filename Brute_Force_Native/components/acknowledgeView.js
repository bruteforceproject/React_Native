import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const AcknowledgeView = ({ navigation }) => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const navigateToStudentOverview = () => {
    //navigation.navigate('StudentOverview'); //temporarily changing this to counselorview for testing purposes
    navigation.navigate('CounselorView');
  }

  return (
    <View style={styles.acknowledgeView}>
      <Text style={styles.heading}>You Must Acknowledge the Alerts to Proceed</Text>
      <Text> Jane Doe has 2 infractions that must be acknowledged</Text>

      <View style={styles.infractionContainer}>
        <Text>Jane Doe was Absent from Period 3 Chemistry with Mr.Brimberry on 5/11</Text>
        <CheckBox
          title="I acknowledge the attendance infraction above"
          checked={checkbox1}
          onPress={() => setCheckbox1(!checkbox1)}
        />
      </View>

      <View style={styles.infractionContainer}>
        <Text>Jane Doe engaged in violent activity against a student in History with Ms. Frizzle on 5/12</Text>
        <CheckBox
          title="I acknowledge the behavioral infraction above"
          checked={checkbox2}
          onPress={() => setCheckbox2(!checkbox2)}
        />
      </View>

      <Button
        title="Submit"
        onPress={navigateToStudentOverview}
        disabled={!checkbox1 || !checkbox2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  acknowledgeView: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1
  },
  heading: {
    fontSize: 30,
    color: 'red',
    marginBottom: 10,
    marginTop: 25
  },
  infractionContainer: {
    marginVertical: 10
  }
});

export default AcknowledgeView;