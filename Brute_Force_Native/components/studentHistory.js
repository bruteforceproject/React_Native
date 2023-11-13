import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

const StudentHistory = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState('all');
  const [markedDates, setMarkedDates] = useState({});

  const events = [
    { date: '2023-11-10', description: 'Math Test', category: 'Academic', status: 'good' },
    { date: '2023-11-09', description: 'Late Arrival', category: 'Attendance', status: 'yellow' },
    { date: '2023-11-08', description: 'Class Participation', category: 'Behavior', status: 'green' },
    { date: '2023-11-12', description: 'Science Project', category: 'Academic', status: 'bad' },
    { date: '2023-11-15', description: 'Missed Homework', category: 'Academic', status: 'bad' },
    { date: '2023-11-14', description: 'Group Presentation', category: 'Academic', status: 'good' },
    { date: '2023-10-05', description: 'Unexcused Absence', category: 'Attendance', status: 'red' },
    { date: '2023-09-30', description: 'Sports Day Participation', category: 'Behavior', status: 'green' },
    { date: '2023-09-25', description: 'Late Submission', category: 'Academic', status: 'yellow' },
    { date: '2023-09-18', description: 'Perfect Attendance', category: 'Attendance', status: 'green' },
    { date: '2023-09-10', description: 'Disturbing Class', category: 'Behavior', status: 'red' },
    { date: '2023-08-30', description: 'Art Competition Winner', category: 'Academic', status: 'good' },
    { date: '2023-08-22', description: 'Tardiness', category: 'Attendance', status: 'yellow' },
    { date: '2023-08-15', description: 'Helping Peers', category: 'Behavior', status: 'green' },
    { date: '2023-08-05', description: 'Book Report', category: 'Academic', status: 'good' },
    { date: '2023-07-28', description: 'School Play Lead Role', category: 'Behavior', status: 'green' },
    { date: '2023-07-20', description: 'Failed Quiz', category: 'Academic', status: 'bad' },
    { date: '2023-07-12', description: 'School Picnic', category: 'Behavior', status: 'green' },
    { date: '2023-07-05', description: 'Absent due to Illness', category: 'Attendance', status: 'yellow' }
];

  
useEffect(() => {
  setMarkedDates(getMarkedDates(events));
}, [events]);

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

  const handleMonthChange = (month) => {
    const monthStr = month.month < 10 ? `0${month.month}` : month.month.toString();
    const yearStr = month.year.toString();
    
    // Filter events for the selected month and update the markedDates state
    const monthEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === month.year &&
             (eventDate.getMonth() + 1) === month.month;
    });
  
    setMarkedDates(getMarkedDates(monthEvents));
    
    // Update the filter for the events list to reflect the selected month
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
  

  const filteredEvents = events.filter(event => isWithinPeriod(event.date, filter));

  const renderEventTiles = (category) => {
  return events
    .filter(event => {
      return filter === 'all' || event.date.startsWith(filter);
    })
    .filter(event => event.category === category)
      .map((event, index) => (
        <View key={index} style={styles.eventTile}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(event.status) }]} />
          <Text style={styles.eventDateText}>{new Date(event.date).toLocaleDateString()}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
      ));
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/logo1.png')} style={styles.logo} />
      <Calendar
        // Other props...
        markedDates={markedDates}
        markingType={'dot'}
        onMonthChange={(month) => {
    handleMonthChange(month);
  }}
        // The rest of your calendar props
        theme={{
          calendarBackground: '#ffffff',
          monthTextColor: '#000000',
          dayTextColor: '#000000',
          todayTextColor: '#00adf5',
          arrowColor: '#00adf5',
          dotColor: '#f25d50',
        }}
        enableSwipeMonths={true}
  // Render custom arrows if necessary
  renderArrow={(direction) => (
    <View>
      {direction === 'left' ? (
        <Text>{'<'}</Text> // Replace with your custom left arrow icon
      ) : (
        <Text>{'>'}</Text> // Replace with your custom right arrow icon
      )}
    </View>
  )}
/>
      <View style={styles.filterButtons}>
        <TouchableOpacity onPress={() => setFilter('all')} style={styles.filterButton}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('week')} style={styles.filterButton}>
          <Text>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('month')} style={styles.filterButton}>
          <Text>Month</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Academic</Text>
        <ScrollView style={styles.scrollContainer}>
          {renderEventTiles('Academic')}
        </ScrollView>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Attendance</Text>
        <ScrollView style={styles.scrollContainer}>
          {renderEventTiles('Attendance')}
        </ScrollView>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Behavior</Text>
        <ScrollView style={styles.scrollContainer}>
          {renderEventTiles('Behavior')}
        </ScrollView>
      </View>
      <Button title="Back to Student Overview" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
