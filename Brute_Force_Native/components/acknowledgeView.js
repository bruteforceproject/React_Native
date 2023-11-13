import React, { useState, useEffect } from 'react';
import { CheckBox } from 'react-native-elements';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AcknowledgeView = ({ route, navigation }) => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
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

  const navigateToStudentOverview = () => {
    //navigation.navigate('StudentOverview'); //temporarily changing this to counselorview for testing purposes
    navigation.navigate('CounselorView');
  };

  return (
    <View style={styles.acknowledgeView}>
      <Text style={styles.heading}>You Must Acknowledge the Alerts to Proceed</Text>
      <Text> Student Name: {studentData.fname} {studentData.lname}</Text>
      <Text> studentID: {studentData.studentID}</Text>

    
    
    {/* Display Academics information if not acknowledged for all periods */}
    {academicsData.map((academic, index) => !academic?.acknowledged && (
        <React.Fragment key={index}>
          <Text> Academics color (Period {index + 1}): {academic?.color}</Text>
          <Text> Academics date (Period {index + 1}): {academic?.date}</Text>
        </React.Fragment>
      ))}

    {/* Display Behavior information if not acknowledged for all periods */}
    {behaviorData.map((behavior, index) => !behavior?.acknowledged && (
        <React.Fragment key={index}>
          <Text> Behavior color (Period {index + 1}): {behavior?.color}</Text>
          <Text> Behavior date (Period {index + 1}): {behavior?.date}</Text>
        </React.Fragment>
      ))}

    {/* Display Attendance information if not acknowledged for all periods */}
    {attendanceData.map((attendance, index) => !attendance?.acknowledged && (
        <React.Fragment key={index}>
          <Text> Attendance color (Period {index + 1}): {attendance?.color}</Text>
          <Text> Attendance date (Period {index + 1}): {attendance?.date}</Text>
        </React.Fragment>
      ))}

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
