import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

function StudentOverview() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Ariel Manalo</Text>
        <Text style={styles.id}>ID: 304314933</Text>
      </View>
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.body}>
        <PeriodCard
          period="Period 0: Chemistry"
          teacherName="B. Banana"
          academicsImgSource={require('../assets/academics.png')}
          attendanceImgSource={require('../assets/attendance.png')}
          behaviorImgSource={require('../assets/behavior.png')}
        />
        <PeriodCard
          period="Period 1: Biology"
          teacherName="A. Apple"
          academicsImgSource={require('../assets/academics.png')}
          attendanceImgSource={require('../assets/attendance.png')}
          behaviorImgSource={require('../assets/behavior.png')}
        />

        <PeriodCard
          period="Period 2: Math"
          teacherName="C. Cherry"
          academicsImgSource={require('../assets/academics.png')}
          attendanceImgSource={require('../assets/attendance.png')}
          behaviorImgSource={require('../assets/behavior.png')}
        />

        <PeriodCard
          period="Period 3: English"
          teacherName="M. Mango"
          academicsImgSource={require('../assets/academics.png')}
          attendanceImgSource={require('../assets/attendance.png')}
          behaviorImgSource={require('../assets/behavior.png')}
        />

        <PeriodCard
          period="Period 4: Art"
          teacherName="O. Orange"
          academicsImgSource={require('../assets/academics.png')}
          attendanceImgSource={require('../assets/attendance.png')}
          behaviorImgSource={require('../assets/behavior.png')}
        />

        <PeriodCard
          period="Period 5: Physical Education"
          teacherName="W. Watermelon"
          academicsImgSource={require('../assets/academics.png')}
          attendanceImgSource={require('../assets/attendance.png')}
          behaviorImgSource={require('../assets/behavior.png')}
        />

        <PeriodCard
          period="Period 6: History"
          teacherName="D. Dragonfruit"
          academicsImgSource={require('../assets/academics.png')}
          attendanceImgSource={require('../assets/attendance.png')}
          behaviorImgSource={require('../assets/behavior.png')}
        />

        <PeriodCard
          period="Period 7: Elective"
          teacherName="B. Blueberry"
          academicsImgSource={require('../assets/academics.png')}
          attendanceImgSource={require('../assets/attendance.png')}
          behaviorImgSource={require('../assets/behavior.png')}
        />
    
      </View>
      </ScrollView>
    </View>
  );
}

function PeriodCard({ period, teacherName, academicsImgSource, attendanceImgSource, behaviorImgSource }) {
  return (
    <View style={styles.periodCard}>
      <Text style={styles.periodText}><Text style={styles.boldText}>Period:</Text> {period}</Text>
      <View style={styles.imageContainer}>
        <Image source={academicsImgSource} style={styles.image} />
        <Image source={attendanceImgSource} style={styles.image} />
        <Image source={behaviorImgSource} style={styles.image} />
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
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
});

export default StudentOverview;