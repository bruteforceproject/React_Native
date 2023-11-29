import React, { useState } from 'react'; // Import useState
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const StudentHistory = ({ route }) => {
  const navigation = useNavigation();
  // Ensure classData is also passed from the StudentOverview component
  const { attendanceData, academicsData, behaviorData, studentName, studentID, classData } = route.params;
  const [filter, setFilter] = useState('all'); // Add this state if needed for filtering

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'good':
      case 'green':
        return '#558c3b';
      case 'satisfactory':
      case 'yellow':
        return '#f2ca52';
      case 'bad':
      case 'red':
        return '#f25d50';
      default:
        return 'black';
    }
  };

  console.log("Attendance Data:", attendanceData);
  console.log("Academics Data:", academicsData);
  console.log("Behavior Data:", behaviorData);
  console.log("Class Data:", classData);

 
  const getClassNameById = (class_id, classData) => {
    // Assuming classData is correctly passed as an array of objects
    const classInfo = classData.find(c => c.class_id === class_id);
    return classInfo ? classInfo.className : 'Unknown Class';
  };

  const getMarkedDates = (events) => {
    const newMarkedDates = {};
    events.forEach(event => {
      if (getStatusColor(event.status) === '#f25d50') { // Assuming 'red' events have this color
        newMarkedDates[event.date] = { 
          marked: true, 
          dotColor: '#f25d50', 
          activeOpacity: 0 
        };
      }
    });
    return newMarkedDates;
  };

  const [markedDates, setMarkedDates] = useState({});

  // Updated handleMonthChange function
  const handleMonthChange = (month) => {
    const monthStr = month.month < 10 ? `0${month.month}` : month.month.toString();
    const yearStr = month.year.toString();

    // You need to define monthAttendanceEvents, monthAcademicEvents, and monthBehaviorEvents
    const monthAttendanceEvents = filterEventsByMonth(attendanceData, month);
    const monthAcademicEvents = filterEventsByMonth(academicsData, month);
    const monthBehaviorEvents = filterEventsByMonth(behaviorData, month);

    const monthEvents = [...monthAttendanceEvents, ...monthAcademicEvents, ...monthBehaviorEvents];
    setMarkedDates(getMarkedDates(monthEvents));
    setFilter(`${yearStr}-${monthStr}`);
  };

  const isWithinWeek = (date) => {
    const now = new Date();
    const startOfWeek = now.getDate() - now.getDay();
    const endOfWeek = startOfWeek + 6; // last day is Saturday

    const dateToCheck = new Date(date);
    return (
      dateToCheck.getDate() >= startOfWeek &&
      dateToCheck.getDate() <= endOfWeek &&
      dateToCheck.getMonth() === now.getMonth() &&
      dateToCheck.getFullYear() === now.getFullYear()
    );
  };

  const isWithinMonths = (date, startMonth, endMonth, startYear, endYear) => {
    const dateToCheck = new Date(date);
    const startDate = new Date(startYear, startMonth - 1, 1); // months are 0-indexed in JS
    const endDate = new Date(endYear, endMonth, 0); // the zeroth day of the next month is the last day of the current month
  
    return dateToCheck >= startDate && dateToCheck <= endDate;
  };
  
  const isWithinPeriod = (date, period) => {
    const now = new Date();
    switch (period) {
      case 'week':
        return isWithinWeek(date);
      case 'month':
        // Example: Check within a range from January (1) to March (3) of the current year
        return isWithinMonths(date, 1, 3, now.getFullYear(), now.getFullYear());
      default:
        return true; // 'all' filter
    }
  };
  

  const renderEventTiles = (category) => {
    const categoryLower = category.toLowerCase();
    console.log(`Received category: ${category}, converted to lowercase: ${categoryLower}`);
  
    let events;
    switch (categoryLower) {
      case 'attendance':
        events = attendanceData;
        break;
      case 'academics':
        events = academicsData;
        break;
      case 'behavior':
        events = behaviorData;
        break;
      default:
        console.error(`Unknown category: ${category}`);
        return <Text style={styles.noEventsText}>Unknown category.</Text>;
    }
    // Ensure events is an array and has content
    if (!Array.isArray(events) || events.length === 0) {
      console.error(`The events for category ${category} is not an array or is empty:`, events);
      return <Text style={styles.noEventsText}>No events available for this category.</Text>;
    }

    return events.map((event, index) => (
      <EventTile
        key={index}
        date={event.date}
        color={event.color}
        className={getClassNameById(event.class_id, classData)}
        description={category === 'Behavior' ? event.description : ''}
      />
    ));
  };

  const filterEventsByMonth = (events, month) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === month.year &&
             (eventDate.getMonth() + 1) === month.month;
    });
  };

  const EventTile = ({ date, color, className, description }) => {
    const formattedDate = moment(date).format('dddd, MM/DD/YYYY');
    
    return (
      <View style={styles.eventTile}>
        <View style={[styles.statusCircle, { backgroundColor: color }]} />
        <View style={styles.eventDetails}>
          <Text style={styles.eventDate}>{formattedDate}</Text>
          <Text style={styles.className}>{className}</Text>
          {description && <Text style={styles.eventDescription}>{description}</Text>}
        </View>
      </View>
    );
  };
  
  
  
  

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/logo1.png')} style={styles.logo} />
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{studentName}</Text>
        <Text style={styles.studentId}>Student ID: {studentID}</Text>
      </View>
      <Calendar
        // Calendar props...
        markedDates={markedDates}
        markingType={'dot'}
        onMonthChange={handleMonthChange}
        // Other calendar props
      />
      <View style={styles.filterButtons}>
        {/* Filter buttons... */}
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Academics</Text>
        <ScrollView style={styles.scrollContainer}>
          {renderEventTiles('Academics', academicsData)}
        </ScrollView>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Attendance</Text>
        <ScrollView style={styles.scrollContainer}>
          {renderEventTiles('Attendance', attendanceData)}
        </ScrollView>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Behavior</Text>
        <ScrollView style={styles.scrollContainer}>
          {renderEventTiles('Behavior', behaviorData)}
        </ScrollView>
      </View>

      <Button title="Back to Student Overview" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({

  eventTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statusCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 10, // Space between the circle and text
  },
  eventDetails: {
    flex: 1,
  },
   statusCircle: {
    width: 20, // Adjust the size as needed
    height: 20, // Adjust the size as needed
    borderRadius: 10, // Make it circular
    marginLeft: 10, // Space from left edge of tile
  },
  eventText: {
    flex: 1,
    marginLeft: 10, // Space between circle and text
  },
  eventTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  eventDate: {
    fontSize: 16,
    marginBottom: 5, // Add some space between the date and class name
  },
  eventClass: {
    fontSize: 14,
    color: 'grey', // Optional: style the class name differently if desired
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
    alignSelf: 'center', // Center the dot vertically within the tile
  },
  
  studentInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  studentId: {
    fontSize: 16,
  },
  noEventsText: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  categoryContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    maxHeight: 200,
  },
  eventTile: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  eventDateText: {
    marginRight: 10,
  },
  eventDescription: {
    flex: 1,
  },
});

export default StudentHistory;