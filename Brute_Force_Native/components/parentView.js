
import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo1.png';
import { useFocusEffect } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView,  Alert, View, Text, Image, Button,TouchableOpacity, StyleSheet } from 'react-native';

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
        const response = await fetch('http://192.168.0.19:8000/countUnacknowledgedAttendanceAlerts', {
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

    const fetchCompleteStudentDetails = async () => {
  try {
    const response = await fetch('http://localhost:8000/getCompleteStudentDetails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentID: studentId })
    });

    if (response.ok) {
      const studentDetails = await response.json();
      // Do something with the full student details
      // For example, store in state or pass to another component
    } else {
      console.error('Failed to fetch complete student details:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching complete student details:', error);
  }
};

useFocusEffect(
  React.useCallback(() => {
    const fetchData = async () => {
      await fetchStudents();
      await fetchParent();
      if (students.length > 0) {
        await updateStudentsWithAlertsCount();
      }
    };

    fetchData();

    return () => {
      // Cleanup (if needed)
    };
  }, [parent_id])
);


  useEffect(() => {
  
    fetchStudents();
    fetchParent();
  }, [parent_id]);


  useEffect(() => {
    if (students.length > 0) {
      updateStudentsWithAlertsCount();
    }
  }, [students.length]);


  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "No",
          onPress: () => console.log("Logout Cancelled"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@login_token');
              navigation.navigate('SignIn');
            } catch (e) {
              console.error('Logout failed', e);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };
  
  const performLogout = async () => {
    try {
      await AsyncStorage.removeItem('@login_token');
      navigation.navigate('SignInScreen');
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  
  
  


  
  const onStudentPress = async (student) => {
    console.log("Student button pressed:", student.fname, student.lname, student.studentID);
  
    // Update the alert count for the selected student
    const academicsCount = await fetchUnacknowledgedAlertsCount(student.studentID);
    const behaviorCount = await fetchUnacknowledgedBehaviorAlertsCount(student.studentID);
    const attendanceCount = await fetchUnacknowledgedAttendanceAlertsCount(student.studentID);
    const totalAlertsCount = academicsCount + behaviorCount + attendanceCount;
  
    // Check if the updated alerts count is zero
    if (totalAlertsCount === 0) {
      // Navigate to StudentOverview and pass the studentID
      navigation.navigate('StudentOverview', { myData: student });
    } else {
      navigation.navigate('AcknowledgeView', { studentId: student.studentID });
      console.log("There are alerts for this student.");
    }
  };


return (
  <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>

    <Image source={Logo} style={styles.logo} resizeMode='contain' />
    
    {parent && (
      <Text style={styles.parentName}>{parent.fname} {parent.lname}</Text>
    )}

    {students.map((student, index) => (
      <TouchableOpacity
        key={index}
        style={styles.button}
        onPress={() => onStudentPress(student)}
      >
        <Text style={styles.buttonText}>
          {student.fname} {student.lname} ({student.studentID})
        </Text>
        <Text style={styles.alertCount}>
          Alerts: {student.alertsCount || 0}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },

container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: 50,
},
parentName: {
  fontSize: 40,
  textAlign: 'center',
  marginTop: 30,
  marginBottom: 20,
},
button: {
  fontSize: 25,
  width: 300, // Fixed width for all buttons
  minHeight: 100, // Minimum height for all buttons
  backgroundColor: '#007AFF', // Button color
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  padding: 20,
  borderRadius: 5,
  marginVertical: 10, // Space between buttons
},
buttonText: {
  fontSize: 18,
  color: 'white',
  fontWeight: 'bold',
},
alertCount: {
  fontSize: 16,
  color: 'white',
  marginTop: 5, // Space between name/ID and alert count
},
logo: {
  width: '70%',
  maxWidth: 300,
  height: 100,
  marginBottom: 50, 
  maxHeight: 300,
  marginTop: 50, 
},
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: 50,
},
logoutButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  padding: 10,
  backgroundColor: 'red',
  borderRadius: 5,
  marginTop: 30,
},
logoutButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
});
export default ParentView;