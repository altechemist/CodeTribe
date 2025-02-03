import React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar as RNCalendar, CalendarProps } from 'react-native-calendars';

const Calendar: React.FC<CalendarProps> = (props) => {
  return <RNCalendar {...props} style={styles.calendar} />;
};

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Calendar;
