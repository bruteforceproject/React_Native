import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const AcknowledgeView = ({ route }) => {
  const navigation = useNavigation();
  const { studentId } = route.params;
  const [attendanceAlerts, setAttendanceAlerts] = useState([]);
  const [behaviorAlerts, setBehaviorAlerts] = useState([]);
  const [classDetails, setClassDetails] = useState({});
  const [teacherDetails, setTeacherDetails] = useState({});
  const [alertDescriptions, setAlertDescriptions] = useState({});
  const [academicAlerts, setAcademicAlerts] = useState([]);
  const [attendanceCheckboxes, setAttendanceCheckboxes] = useState({});
  const [behaviorCheckboxes, setBehaviorCheckboxes] = useState({});
  const [academicCheckboxes, setAcademicCheckboxes] = useState({});
  const [studentName, setStudentName] = useState('');
  const [completeStudentDetails, setCompleteStudentDetails] = useState({}); 

  const fetchUnacknowledgedAttendanceAlerts = async () => {
    try {
      const response = await fetch('http://192.168.0.19:8000/getUnacknowledgedAttendanceAlerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentID: studentId })
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
  
        setAttendanceAlerts(jsonResponse);
  
        // Initialize checkboxes state
        const initialAttendanceCheckboxes = {};
        jsonResponse.forEach(alert => {
          initialAttendanceCheckboxes[alert._id] = false;
        });
        setAttendanceCheckboxes(initialAttendanceCheckboxes);
      } else {
        console.error('Failed to fetch attendance alerts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching attendance alerts:', error);
    }
  };
  

  const fetchUnacknowledgedBehaviorAlerts = async () => {
    try {
      const response = await fetch('http://192.168.0.19:8000/getUnacknowledgedBehaviorAlerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentID: studentId })
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
  
        setBehaviorAlerts(jsonResponse);
  
        // Initialize checkboxes state
        const initialBehaviorCheckboxes = {};
        jsonResponse.forEach(alert => {
          initialBehaviorCheckboxes[alert._id] = false;
        });
        setBehaviorCheckboxes(initialBehaviorCheckboxes);
      } else {
        console.error('Failed to fetch behavior alerts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching behavior alerts:', error);
    }
  };
  
  

  const fetchUnacknowledgedAcademicAlerts = async () => {
  try {
    const response = await fetch('http://192.168.0.19:8000/getUnacknowledgedAcademicAlerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentID: studentId })
    });

    if (response.ok) {
      const jsonResponse = await response.json();

      setAcademicAlerts(jsonResponse);

      // Initialize checkboxes state
      const initialAcademicCheckboxes = {};
      jsonResponse.forEach(alert => {
        initialAcademicCheckboxes[alert._id] = false;
      });
      setAcademicCheckboxes(initialAcademicCheckboxes);
    } else {
      console.error('Failed to fetch academic alerts:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching academic alerts:', error);
  }
};

  
  
  

  const fetchAlertDescription = async (alertId) => {
    try {
      const response = await fetch('http://192.168.0.19:8000/getAlertDescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertID: alertId })
      });
      if (response.ok) {
        const data = await response.json();
        return data.alertDesc;
      } else {
        console.error('Failed to fetch alert description:', response.statusText);
        const errorText = await response.text(); // Get detailed error message
        console.error('Detailed error:', errorText);
      }
    } catch (error) {
      console.error('Error fetching alert description:', error);
    }
    return '';
  };

  const fetchClassDetails = async (classId) => {
    try {
      const response = await fetch('http://192.168.0.19:8000/getClass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class_id: classId })
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Class Details Fetched:', data);
        return data;
      } else {
        console.error('Failed to fetch class details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching class details:', error);
    }
    return null;
  };

  const fetchTeacherDetails = async (teacherId) => {
    try {
      const response = await fetch('http://192.168.0.19:8000/getTeacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacher_id: teacherId })
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Teacher Details Fetched:', data);
        return data;
      } else {
        console.error('Failed to fetch teacher details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching teacher details:', error);
    }
    return null;
  };

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch('http://192.168.0.19:8000/getStudentDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentID: studentId })
      });
  
      if (response.ok) {
        const studentDetails = await response.json();
        setStudentName(`${studentDetails.fname} ${studentDetails.lname}`);
      } else {
        console.error('Failed to fetch student details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const fetchCompleteStudentDetails = async () => {
    try {
      const response = await fetch('http://192.168.0.19:8000/getCompleteStudentDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentID: studentId })
      });

      if (response.ok) {
        const studentDetails = await response.json();
        setCompleteStudentDetails(studentDetails); // Store complete student details in state
      } else {
        console.error('Failed to fetch complete student details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching complete student details:', error);
    }
  };
  

  useEffect(() => {
    fetchUnacknowledgedAttendanceAlerts();
    fetchUnacknowledgedBehaviorAlerts();
    fetchUnacknowledgedAcademicAlerts();
    fetchStudentDetails();
    fetchCompleteStudentDetails();
  }, []);

  useEffect(() => {
    const fetchAllDetails = async () => {
      let newClassDetails = { ...classDetails };
      let newTeacherDetails = { ...teacherDetails };
  
      const classIDs = new Set([...attendanceAlerts, ...academicAlerts, ...behaviorAlerts].map(alert => alert.class_id));
      for (let classId of classIDs) {
        if (!newClassDetails[classId]) {
          const classInfo = await fetchClassDetails(classId);
          newClassDetails[classId] = classInfo;
  
          if (classInfo && classInfo.teacher_id && !newTeacherDetails[classInfo.teacher_id]) {
            const teacherInfo = await fetchTeacherDetails(classInfo.teacher_id);
            newTeacherDetails[classInfo.teacher_id] = teacherInfo;
          }
        }
      }
  
      setClassDetails(newClassDetails);
      setTeacherDetails(newTeacherDetails);
    };
  
    fetchAllDetails();
  }, [attendanceAlerts, academicAlerts, behaviorAlerts]);
  


  useEffect(() => {
    // New useEffect for fetching alert descriptions for behavior alerts
    const fetchBehaviorAlertDetails = async () => {
      const newAlertDescriptions = { ...alertDescriptions };

      for (const alert of behaviorAlerts) {
        if (!newAlertDescriptions[alert.alertID]) {
          const desc = await fetchAlertDescription(alert.alertID);
          newAlertDescriptions[alert.alertID] = desc;
        }
      }

      setAlertDescriptions(newAlertDescriptions);
    };

    if (behaviorAlerts.length > 0) {
      fetchBehaviorAlertDetails();
    }
  }, [behaviorAlerts]);

  const getAttendanceStatus = (color, date, classInfo, teacherInfo) => {
    console.log('Attendance Alert:', { color, date, classInfo, teacherInfo });
    const teacherName = teacherInfo ? `${teacherInfo.fname} ${teacherInfo.lname}` : '';
    switch (color) {
      case '#f2ca52':
        return `Late on ${date} in Period ${classInfo?.periodNumber} ${classInfo?.className} with ${teacherName}`;
      case '#f25d50':
        return `Absent on ${date} in Period ${classInfo?.periodNumber} ${classInfo?.className} with ${teacherName}`;
      default:
        return `Date: ${date}, Class: ${classInfo?.className}, Teacher: ${teacherName}`;
    }
    
  };

  const renderBehaviorAlert = (alert) => {
    const classInfo = classDetails[alert.class_id];
    const teacherInfo = teacherDetails[classInfo?.teacher_id];
    const alertDesc = alertDescriptions[alert.alertID];
  
    if (!classInfo || !teacherInfo) {
      return 'Loading...'; // This will display a loading message until the data is available
    }
  
    return `${alertDesc || 'N/A'} on ${alert.date} in Period ${classInfo.periodNumber} ${classInfo.className} with ${teacherInfo.fname} ${teacherInfo.lname}`;
  };

  const renderAcademicAlert = (alert) => {
    const classInfo = classDetails[alert.class_id];
    const teacherInfo = teacherDetails[classInfo?.teacher_id];

    if (!classInfo || !teacherInfo) {
      return 'Loading...'; // This will display a loading message until the data is available
    }
  
    return `Failed Learning objectives on ${alert.date} in Period ${classInfo?.periodNumber || 'N/A'} ${classInfo?.className || 'N/A'} with ${teacherInfo?.fname || 'N/A'} ${teacherInfo?.lname || 'N/A'}`;
  };

  const handleCheckboxChange = (alertType, alertId) => {
    let newCheckboxes = {};
  
    if (alertType === 'attendance') {
      newCheckboxes = { ...attendanceCheckboxes };
    } else if (alertType === 'behavior') {
      newCheckboxes = { ...behaviorCheckboxes };
    } else if (alertType === 'academic') {
      newCheckboxes = { ...academicCheckboxes };
    }
  
    newCheckboxes[alertId] = !newCheckboxes[alertId];
  
    if (alertType === 'attendance') {
      setAttendanceCheckboxes(newCheckboxes);
    } else if (alertType === 'behavior') {
      setBehaviorCheckboxes(newCheckboxes);
    } else if (alertType === 'academic') {
      setAcademicCheckboxes(newCheckboxes);
    }
  };

  const handleSubmit = async () => {
    const allAttendanceChecked = Object.values(attendanceCheckboxes).every(value => value);
    const allBehaviorChecked = Object.values(behaviorCheckboxes).every(value => value);
    const allAcademicChecked = Object.values(academicCheckboxes).every(value => value);

    if (allAttendanceChecked && allBehaviorChecked && allAcademicChecked) {
        try {
            // Example of API calls to acknowledge alerts, replace with your actual API calls
            const AtResponse = await fetch('http://192.168.0.19:8000/acknowledgeAcademicAlerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentID: studentId })
            });
            const BeResponse = await fetch('http://192.168.0.19:8000/acknowledgeBehaviorAlerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentID: studentId })
            });
            const AcResponse = await fetch('http://192.168.0.19:8000/acknowledgeAttendanceAlerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentID: studentId })
            });

            if (AtResponse.ok && BeResponse.ok && AcResponse.ok) {
                // Construct the myData object with studentId
                const myData = studentId;
                console.log('StudentID for student overview:', studentId);
                // Navigate to StudentOverview with the myData object
                navigation.navigate('StudentOverview', { myData: completeStudentDetails });
            } else {
                console.error('Failed to acknowledge alerts');
            }
        } catch (error) {
            console.error('Error acknowledging alerts:', error);
        }
    } else {
        alert('Please acknowledge all alerts before submitting.');
    }
};

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {studentName && <Text style={styles.warningText}>You must acknowledge the infractions of {studentName} to proceed.</Text>}

      {/* Displaying Unacknowledged Attendance Alerts */}
      {attendanceAlerts.map((alert, index) => {
        const classInfo = classDetails[alert.class_id];
        const teacherInfo = teacherDetails[classInfo?.teacher_id];
        return (
          <View key={index}>
            <Text style={styles.alert}>
              {getAttendanceStatus(alert.color, alert.date, classInfo, teacherInfo)}
            </Text>
            <CheckBox
              title="Acknowledge"
              checked={attendanceCheckboxes[alert._id]}
              onPress={() => handleCheckboxChange('attendance', alert._id)}
            />
          </View>
        );
      })}

      {/* Displaying Unacknowledged Behavior Alerts */}
      {behaviorAlerts.map((alert, index) => (
        <View key={index}>
          <Text style={styles.alert}>
            {renderBehaviorAlert(alert)}
          </Text>
          <CheckBox
            title="Acknowledge"
            checked={behaviorCheckboxes[alert._id]}
            onPress={() => handleCheckboxChange('behavior', alert._id)}
          />
        </View>
))}

{/* Displaying Unacknowledged Academic Alerts */}
{academicAlerts.map((alert, index) => (
  <View key={index}>
    <Text style={styles.alert}>
      {renderAcademicAlert(alert)}
    </Text>
    <CheckBox
      title="Acknowledge"
      checked={academicCheckboxes[alert._id]}
      onPress={() => handleCheckboxChange('academic', alert._id)}
    />
  </View>
))}

      {/* Repeat similar rendering for behavior and academic alerts */}

      <Button
        title="Submit Acknowledgements"
        onPress={handleSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 100, // Adjust this value as needed for more or less space
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  alert: {
    fontSize: 18,
    marginBottom: 5,
  },
  warningText: {
    color: 'red', // Makes the text red
    textAlign: 'center', // Centers the text horizontally
    alignSelf: 'center', // Centers the text within its container
    fontSize: 16, // You can adjust the font size as needed
    marginTop: 25, // Add some space above the text
    marginBottom: 10, // Add some space below the text
    fontSize: 23,
  },
  
});

export default AcknowledgeView;