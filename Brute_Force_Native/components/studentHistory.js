import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const StudentHistory = () => {
  const navigation = useNavigation();
  const [attendanceEvents, setAttendanceEvents] = useState([]);
  const [academicEvents, setAcademicEvents] = useState([]);
  const [behaviorEvents, setBehaviorEvents] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchCategoryData = async (endpoint, setCategoryEvents) => {
      try {
        const response = await fetch(`http://localhost:8000/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentID: 'your_student_id', class_id: 'your_class_id' }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const fetchedEvents = await response.json();
        setCategoryEvents(fetchedEvents);
      } catch (error) {
        // Log the error to the console instead of setting it to the state
        console.error(`Error fetching ${endpoint} data:`, error);
      }
    };
  
    fetchCategoryData('getAttendance', setAttendanceEvents);
    fetchCategoryData('getAcademics', setAcademicEvents);
    fetchCategoryData('getBehavior', setBehaviorEvents);
  }, []);
  
  
  useEffect(() => {
    // Combine all events for marking dates on the calendar
    const combinedEvents = [...attendanceEvents, ...academicEvents, ...behaviorEvents];
    setMarkedDates(getMarkedDates(combinedEvents));
  }, [attendanceEvents, academicEvents, behaviorEvents]);

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

   // Updated handleMonthChange function
   const handleMonthChange = (month) => {
    const monthStr = month.month < 10 ? `0${month.month}` : month.month.toString();
    const yearStr = month.year.toString();
    
    const filterEventsByMonth = (events) => {
      return events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === month.year &&
               (eventDate.getMonth() + 1) === month.month;
      });
    };
  
    const monthAttendanceEvents = filterEventsByMonth(attendanceEvents);
    const monthAcademicEvents = filterEventsByMonth(academicEvents);
    const monthBehaviorEvents = filterEventsByMonth(behaviorEvents);
  
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
    let categoryEvents = [];
    switch (category.toLowerCase()) {
      case 'academic':
        categoryEvents = academicEvents;
        break;
      case 'attendance':
        categoryEvents = attendanceEvents;
        break;
      case 'behavior':
        categoryEvents = behaviorEvents;
        break;
      default:
        return <Text>No such category</Text>;
    }

    if (categoryEvents.length === 0) {
      return <Text style={styles.noEventsText}>No events in this category</Text>;
    }

    return categoryEvents.filter(event => isWithinPeriod(event.date, filter)).map((event, index) => (
      <EventTile
        key={index}
        date={event.date}
        status={event.status}
        category={event.category}
        description={event.description}
      />
    ));
  };

  const allEvents = [...attendanceEvents, ...academicEvents, ...behaviorEvents];

  const filteredEvents = allEvents.filter(event => isWithinPeriod(event.date, filter));


  const EventTile = ({ date, status, category, description }) => {
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
        <Text>{category}</Text>
        <Text>{description}</Text>
      </View>
    );
  };

  console.log('Rendering main component');


  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching events: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {error && <Text style={styles.errorText}>Error fetching events: {error.message}</Text>}

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

        {/* Display error message at the bottom or in a less obstructive way */}
    {error && <Text style={styles.errorText}>Error fetching events: {error.message}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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