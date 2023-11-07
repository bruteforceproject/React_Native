import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const goodColor = "#558c3b";
const okColor = "#f2ca52";
const badColor = "#f25d50";

function StudentOverview({navigation}) {

  //const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('StudentHistory');
            }}
          >
            <Text style={styles.name}>Ariel Manalo</Text>
            <Text style={styles.id}>ID: 304314933</Text>
          </TouchableOpacity>
        
      </View>
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.body}>
        <PeriodCard
          period="Period 0: Chemistry"
          teacherName="B. Banana"
          academicsImgSource={require('../assets/academics.png')}
          academicsColor = {goodColor}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {okColor}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {badColor}
        />
        <PeriodCard
          period="Period 1: Biology"
          teacherName="A. Apple"
          academicsImgSource={require('../assets/academics.png')}
          academicsColor={goodColor}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {goodColor}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {okColor}
        />

        <PeriodCard
          period="Period 2: Math"
          teacherName="C. Cherry"
          academicsImgSource={require('../assets/academics.png')}
          academicsColor = {badColor}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {okColor}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {badColor}
        />

        <PeriodCard
          period="Period 3: English"
          teacherName="M. Mango"
          academicsImgSource={require('../assets/academics.png')}
          academicsColor = {okColor}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {okColor}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {okColor}
        />

        <PeriodCard
          period="Period 4: Art"
          teacherName="O. Orange"
          academicsImgSource={require('../assets/academics.png')}
          academicsColor = {goodColor}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {okColor}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {goodColor}
        />

        <PeriodCard
          period="Period 5: Physical Education"
          teacherName="W. Watermelon"
          academicsImgSource={require('../assets/academics.png')}
          academicsColor = {goodColor}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {goodColor}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {okColor}
        />

        <PeriodCard
          period="Period 6: History"
          teacherName="D. Dragonfruit"
          academicsImgSource={require('../assets/academics.png')}
          academicsColor = {goodColor}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {goodColor}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {goodColor}
        />

        <PeriodCard
          period="Period 7: Elective"
          teacherName="B. Blueberry"
          academicsImgSource={require('../assets/academics.png')}
          academicsColor = {goodColor}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {badColor}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {goodColor}
        />
    
      </View>
      </ScrollView>

      <TouchableOpacity
        style = {styles.goBackButton}
        onPress = {() => {
          navigation.navigate('ParentView');
        }}
      >
        <Text style={styles.goBackButtonText}>Back to Parent View</Text>
      </TouchableOpacity>
    </View>
  );
}

function PeriodCard({ period, teacherName, academicsImgSource, attendanceImgSource, behaviorImgSource, academicsColor, attendanceColor, behaviorColor }) {
  return (
    <View style={styles.periodCard}>
      <Text style={styles.periodText}><Text style={styles.boldText}>Period:</Text> {period}</Text>
      <View style={styles.imageContainer}>
        <Image source={academicsImgSource} style={[styles.image, {backgroundColor: academicsColor}]} />
        <Image source={attendanceImgSource} style={[styles.image, {backgroundColor: attendanceColor}]} />
        <Image source={behaviorImgSource} style={[styles.image, {backgroundColor: behaviorColor}]} />
      </View>
      <Text style={styles.teacherText}><Text style={styles.boldText}>Teacher Name:</Text> {teacherName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 16,
  },
    
  body: {}, //allows for scroll

  periodCard: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
  },
  periodText: {
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },

  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
  },
  teacherText: {
    fontSize: 16,
    marginTop: 10,
  },

  goBackButton: {
    backgroundColor: '#007aff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },

  goBackButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

});

export default StudentOverview;