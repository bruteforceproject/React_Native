import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';

const MyCalendar = ({ onRangeChange }) => {
  const onVisibleMonthsChange = (months) => {
    const start = months[0].dateString;
    const end = months[months.length - 1].dateString;
    onRangeChange({ start, end });
  };

  return (
    <Calendar
      onVisibleMonthsChange={onVisibleMonthsChange}
      // other props...
    />
  );
};

const StudentHeader = ({ studentName, studentId }) => {
  return (
    <View style={styles.studentHeader}>
      <Text style={{ fontSize: 20 }}>{studentName}</Text>
      <Text>ID: {studentId}</Text>
    </View>
  );
};

const GoBack = () => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('StudentOverview');
  };

  return (
    <Button title="Go back to Student Overview" onPress={handleClick} />
  );
};

const GoBackhome = () => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('Home');
  };

  return (
    <Button title="Go back to home page" onPress={handleClick} />
  );
};

const EventTile = ({ date, status }) => {
  const formattedDate = moment(date).format('dddd, MM/DD/YYYY');

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'green';
      case 'satisfactory': return 'yellow';
      case 'bad': return 'red';
      default: return 'black';
    }
  };

  return (
    <View style={styles.eventTile}>
      <View style={[styles.statusCircle, { backgroundColor: getStatusColor(status) }]} />
      <Text style={styles.eventDate}>{formattedDate}</Text>
    </View>
  );
};

const StudentHistory = () => {
    const studentName = "Ariel Manalo";
    const studentId = "301234641";
    const [dateRange, setDateRange] = useState({ start: null, end: null });
  
    const handleRangeChange = (range) => {
      setDateRange({ start: moment(range.start), end: moment(range.end) });
    };
  
    const events = [
      //... your events data
    ];
  
    const filteredEvents = events.filter((event) => {
      const eventDate = moment(event.date);
      if (!dateRange.start || !dateRange.end) {
        return true;
      }
      return eventDate.isBetween(dateRange.start, dateRange.end, 'day', '[]');
    });
  
    const renderEventTiles = (category) => {
      return filteredEvents
        .filter((event) => event.category === category)
        .map((event, index) => (
          <EventTile key={index} date={event.date} status={event.status} />
        ));
    };
  
    return (
      <ScrollView style={styles.container}>
        <StudentHeader studentName={studentName} studentId={studentId} />
        <MyCalendar onRangeChange={handleRangeChange} />
        <View style={styles.eventsContainer}>
          <Text style={styles.eventCategoryLabel}>Academic</Text>
          <View style={styles.box}>{renderEventTiles("Academic")}</View>
          <Text style={styles.eventCategoryLabel}>Behavior</Text>
          <View style={styles.box}>{renderEventTiles("Behavior")}</View>
          <Text style={styles.eventCategoryLabel}>Attendance</Text>
          <View style={styles.box}>{renderEventTiles("Attendance")}</View>
        </View>
        <GoBack />
        <GoBackhome />
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      paddingTop: 10,
    },
  
    studentHeader: {
      alignItems: 'center',
      marginBottom: 20,
    },
  
    studentName: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  
    studentId: {
      fontSize: 18,
      color: '#777',
      marginTop: 5,
    },
  
    calendarContainer: {
      marginHorizontal: 20,
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
  
    eventsContainer: {
      marginHorizontal: 20,
    },
  
    eventCategoryLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
    },
  
    box: {
      borderWidth: 1,
      borderColor: '#e1e1e1',
      borderRadius: 4,
      marginBottom: 10,
      padding: 5,
      backgroundColor: 'white',
    },
  
    backButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 20,
      alignItems: 'center',
      marginTop: 10,
    },
  
    backButtonHome: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 20,
      alignItems: 'center',
      marginTop: 10,
    },
  
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  
    eventTile: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
  
    statusDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 5,
    },
  
    eventDateText: {
      fontSize: 16,
    },
  });
  

export default StudentHistory;
