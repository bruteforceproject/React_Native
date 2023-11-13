
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ParentView = ({ route, navigation }) => {
  const { parent_id } = route.params;
  const [students, setStudents] = useState([]);
  const [parent, setParent] = useState(null);


  const fetchUnacknowledgedAlertsCount = async (studentID) => {
    try {
      const response = await fetch('http://localhost:8000/countUnacknowledgedAlerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentID })
      });
      if (response.ok) {
        const data = await response.json();
        console.log(`Academics alerts count for student ${studentID}:`, data.count);
        return data.count;
      } else {
        console.error('Failed to fetch alerts count:', response.statusText);
        return 0;
      }
    } catch (error) {
      console.error('Error fetching alerts count:', error);
      return 0;
    }
  };




  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8000/getStudentsByParent', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ parent_id: parent_id }),
      });
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error('Failed to fetch students:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }

    
  };






    // Function to fetch parent details
    const fetchParent = async () => {
      try {
        const response = await fetch('http://localhost:8000/getParent', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ parent_id: parent_id }),
        });
        if (response.ok) {
          const data = await response.json();
          setParent(data);
        } else {
          console.error('Failed to fetch parent:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching parent:', error);
      }
      


    };

    const fetchUnacknowledgedBehaviorAlertsCount = async (studentID) => {
      try {
        const response = await fetch('http://localhost:8000/countUnacknowledgedBehaviorAlerts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentID })
        });
        if (response.ok) {
          const data = await response.json();
          console.log(`Behavior alerts count for student ${studentID}:`, data.count);
          return data.count;
        } else {
          console.error('Failed to fetch behavior alerts count:', response.statusText);
          return 0;
        }
      } catch (error) {
        console.error('Error fetching behavior alerts count:', error);
        return 0;
      }
    };


    const fetchUnacknowledgedAttendanceAlertsCount = async (studentID) => {
      try {
        const response = await fetch('http://localhost:8000/countUnacknowledgedAttendanceAlerts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentID })
        });
        if (response.ok) {
          const data = await response.json();
          return data.count;
        } else {
          console.error('Failed to fetch attendance alerts count:', response.statusText);
          return 0;
        }
      } catch (error) {
        console.error('Error fetching attendance alerts count:', error);
        return 0;
      }
    };
    

    

    const updateStudentsWithAlertsCount = async () => {
      const updatedStudents = await Promise.all(students.map(async (student) => {
        const academicsCount = await fetchUnacknowledgedAlertsCount(student.studentID);
        const behaviorCount = await fetchUnacknowledgedBehaviorAlertsCount(student.studentID);
        const attendanceCount = await fetchUnacknowledgedAttendanceAlertsCount(student.studentID);
        const totalAlertsCount = academicsCount + behaviorCount + attendanceCount;
        return { ...student, alertsCount: totalAlertsCount };
      }));
      setStudents(updatedStudents);
    };

    // const updateStudentsWithAlertsCount = async () => {
    //   const updatedStudents = await Promise.all(students.map(async (student) => {
    //     const count = await fetchUnacknowledgedAlertsCount(student.studentID);
    //     return { ...student, alertsCount: count };
    //   }));
    //   setStudents(updatedStudents);
    // };




  useEffect(() => {
    // Function to fetch students
    

    // Function to fetch parent details
    

    

    fetchStudents();
    fetchParent();
  }, [parent_id]);


  useEffect(() => {
    if (students.length > 0) {
      updateStudentsWithAlertsCount();
    }
  }, [students]);


  // Example function called when a student button is pressed
const onStudentPress = (student) => {
  console.log("Student button pressed:", student.fname, student.lname, student.studentID);
  // Check if the alerts count is zero
  if (student.alertsCount === 0) {
    // Navigate to StudentOverview and pass the studentID
    navigation.navigate('StudentOverview', { studentId: student.studentID });
  } else {
    // Handle the case when there are alerts (if needed)
    console.log("There are alerts for this student.");
  }
};


  return (
    <View style={styles.container}>
      {parent && (
        <Text style={styles.parentName}>{parent.fname} {parent.lname}</Text>
      )}
      {students.map((student, index) => (
        <View key={index}>
          <Button
            title={`${student.fname} ${student.lname} (${student.studentID}) - Alerts: ${student.alertsCount || 0}`}
            onPress={() => onStudentPress(student)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50, // Adds padding at the top of the container
    alignItems: 'center', // Centers content horizontally
    // Remove justifyContent if you do not want vertical centering
  },
  parentName: {
    fontSize: 40, // larger font size
    textAlign: 'center', // centers text horizontally
    marginVertical: 20, // adds space above and below the text
    // Add more styling as needed
  },
  button: {
    width: 200, // Fixed width
    height: 100, // Fixed height
    justifyContent: 'center', // Center items vertically inside the button
    alignItems: 'center', // Center items horizontally inside the button
    backgroundColor: '#007AFF', // Button color
    padding: 10,
    borderRadius: 5,
    marginTop: 10, // Add space between buttons
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  studentId: {
    fontSize: 16,
    color: 'white',
  },
  alertCount: {
    fontSize: 14,
    color: 'white',
    marginTop: 5, // Space between ID and alert count
  },
});

export default ParentView;