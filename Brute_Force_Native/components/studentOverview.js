import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
const goodColor = "#558c3b";
const okColor = "#f2ca52";
const badColor = "#f25d50";

function StudentOverview({route,navigation}) {
  const [studentData, setStudentData] = useState({});
  const [classData, setClassData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [academicsData, setAcademicsData] = useState([]);
  const [behaviorData, setBehaviorData] = useState([]);
  
  useEffect(() => {
    // Ensure that the studentData is available before proceeding
    const { myData } = route.params;
    if (myData) {
      const studentData = myData;
      setStudentData(studentData);

      const periodFields = [
        studentData.period0,
        studentData.period1,
        studentData.period2,
        studentData.period3,
        studentData.period4,
        studentData.period5,
        studentData.period6,
        studentData.period7,
      ];

      // Fetch class and teacher data
      const fetchData = async () => {
        const combinedDataPromises = periodFields.map(async (periodID) => {
          try {
            // Fetch attendance data
            const attendanceResponse = await fetch('http://localhost:8000/getAttendance', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ studentID: studentData.studentID, class_id: periodID }),
            });
            if (!attendanceResponse.ok) {
              throw new Error("Network response not ok");
            }
            const attendanceInfo = await attendanceResponse.json();

            // Fetch behavior data
            const behaviorResponse = await fetch('http://localhost:8000/getBehavior', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ studentID: studentData.studentID, class_id: periodID }),
            });
            if (!behaviorResponse.ok) {
              throw new Error("Network response not ok");
            }
            const behaviorInfo = await behaviorResponse.json();

            // Fetch academics data
            const academicsResponse = await fetch('http://localhost:8000/getAcademics', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ studentID: studentData.studentID, class_id: periodID }),
            });
            if (!academicsResponse.ok) {
              throw new Error("Network response not ok");
            }
            const academicsInfo = await academicsResponse.json();

            // Fetch class data
            const classResponse = await fetch('http://localhost:8000/getClass', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ class_id: periodID }),
            });
            if (!classResponse.ok) {
              throw new Error("Network response not ok");
            }
            const classInfo = await classResponse.json();

            // Fetch teacher data based on classInfo
            const teacherResponse = await fetch('http://localhost:8000/getTeacher', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ teacher_id: classInfo?.teacher_id }),
            });
            if (!teacherResponse.ok) {
              throw new Error("Network response not ok");
            }
            const teacherInfo = await teacherResponse.json();

            return { classInfo, teacherInfo, attendanceInfo, academicsInfo, behaviorInfo };
          } catch (error) {
            console.error("Error fetching class and teacher info:", error);
            return { classInfo: null, teacherInfo: null, attendanceData: null, academicsData: null, behaviorData: null };
          }
        });

        const combinedData = await Promise.all(combinedDataPromises);
        const classInfo = combinedData.map((data) => data.classInfo);
        const teacherInfo = combinedData.map((data) => data.teacherInfo);
        const attendanceInfo = combinedData.map((data) => data.attendanceInfo);
        const academicsInfo = combinedData.map((data) => data.academicsInfo);
        const behaviorInfo = combinedData.map((data) => data.behaviorInfo);
        setClassData(classInfo);
        setTeacherData(teacherInfo);
        setAttendanceData(attendanceInfo);
        setAcademicsData(academicsInfo);
        setBehaviorData(behaviorInfo);

      };

      fetchData();
      
    }

    
  }, [route.params]);
  
  return (
    
    <View style={styles.container}>


      <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('StudentHistory');
            }}
          >
            <Text style={styles.name}>
              Student Name: {studentData.fname} {studentData.lname}</Text>
            <Text style={styles.id}>Student ID: {studentData.studentID}</Text>
          </TouchableOpacity>
        
      </View>
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.body}>
        <PeriodCard
          period= {classData[0]?.className}
          teacherName= {teacherData[0]?.fname + ' ' + teacherData[0]?.lname} 
          academicsImgSource={require('../assets/academics.png')}
          academicsColor={String(academicsData[0]?.color).toLowerCase()}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {String(attendanceData[0]?.color).toLowerCase()}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {String(behaviorData[0]?.color).toLowerCase()}
        />
        <PeriodCard
          period= {classData[1]?.className}
          teacherName= {teacherData[1]?.fname + ' ' + teacherData[1]?.lname}
          academicsImgSource={require('../assets/academics.png')}
          academicsColor={String(academicsData[1]?.color).toLowerCase()}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {String(attendanceData[1]?.color).toLowerCase()}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {String(behaviorData[1]?.color).toLowerCase()}
        />

        <PeriodCard
          period= {classData[2]?.className}
          teacherName= {teacherData[2]?.fname + ' ' + teacherData[2]?.lname}
          academicsImgSource={require('../assets/academics.png')}
          academicsColor={String(academicsData[2]?.color).toLowerCase()}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {String(attendanceData[2]?.color).toLowerCase()}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {String(behaviorData[2]?.color).toLowerCase()}
        />

        <PeriodCard
          period= {classData[3]?.className}
          teacherName= {teacherData[3]?.fname + ' ' + teacherData[3]?.lname}
          academicsImgSource={require('../assets/academics.png')}
          academicsColor={String(academicsData[3]?.color).toLowerCase()}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {String(attendanceData[3]?.color).toLowerCase()}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {String(behaviorData[3]?.color).toLowerCase()}
        />

        <PeriodCard
          period= {classData[4]?.className}
          teacherName= {teacherData[4]?.fname + ' ' + teacherData[4]?.lname}
          academicsImgSource={require('../assets/academics.png')}
          academicsColor={String(academicsData[4]?.color).toLowerCase()}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {String(attendanceData[4]?.color).toLowerCase()}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {String(behaviorData[4]?.color).toLowerCase()}
        />

        <PeriodCard
          period= {classData[5]?.className}
          teacherName= {teacherData[5]?.fname + ' ' + teacherData[5]?.lname}
          academicsImgSource={require('../assets/academics.png')}
          academicsColor={String(academicsData[5]?.color).toLowerCase()}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {String(attendanceData[5]?.color).toLowerCase()}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {String(behaviorData[5]?.color).toLowerCase()}
        />

        <PeriodCard
          period= {classData[6]?.className}
          teacherName= {teacherData[6]?.fname + ' ' + teacherData[6]?.lname}
          academicsImgSource={require('../assets/academics.png')}
          academicsColor={String(academicsData[6]?.color).toLowerCase()}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {String(attendanceData[6]?.color).toLowerCase()}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {String(behaviorData[6]?.color).toLowerCase()}
        />

        <PeriodCard
          period= {classData[7]?.className}
          teacherName= {teacherData[7]?.fname + ' ' + teacherData[7]?.lname}
          academicsImgSource={require('../assets/academics.png')}
          academicsColor={String(academicsData[7]?.color).toLowerCase()}
          attendanceImgSource={require('../assets/attendance.png')}
          attendanceColor = {String(attendanceData[7]?.color).toLowerCase()}
          behaviorImgSource={require('../assets/behavior.png')}
          behaviorColor = {String(behaviorData[7]?.color).toLowerCase()}
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

      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => {
          navigation.navigate('CounselorView'); // Navigate to CounselorView
        }}
      >
        <Text style={styles.goToCounselorViewButtonText}>Go to Counselor View</Text>
      </TouchableOpacity>
    </View>
  );
}

function PeriodCard({ period, teacherName, academicsImgSource, attendanceImgSource, behaviorImgSource, academicsColor, attendanceColor, behaviorColor }) {
  console.log(academicsColor);
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

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },

  goToCounselorViewButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

});

export default StudentOverview;