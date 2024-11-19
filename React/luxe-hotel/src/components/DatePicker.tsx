import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function TestCalendar() {
  // Set the default value to your desired range
  const startDate = new Date(2024, 10, 17); // October 17, 2024
  const endDate = new Date(2024, 10, 27); // October 27, 2024
  const value = [startDate, endDate];

  const tileClassName = ({ date }) => {
    const isInRange = date >= startDate && date <= endDate;
    if (isInRange) return "react-calendar__tile--range";
    if (date.toDateString() === startDate.toDateString()) return "react-calendar__tile--rangeStart";
    if (date.toDateString() === endDate.toDateString()) return "react-calendar__tile--rangeEnd";
    return null;
  };

  // Define your min and max dates here
  const minDate = new Date(2024, 10, 17); // October 17, 2024
  const maxDate = new Date(2024, 10, 27); // October 27, 2024

  return (
    <Calendar
      onChange={() => {}} // Disable date selection by providing a no-op function
      value={value}
      tileClassName={tileClassName}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}
