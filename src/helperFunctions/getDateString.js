// Days of the week and calendar months
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Helper function to obtain date in format dd MM DD
export const getDateString = (date) => {
  const dateValue = new Date(date * 1000);

  const dateString = [
    days[dateValue.getDay()],
    months[dateValue.getMonth()],
    dateValue.getDate(),
  ].join(" ");

  return dateString;
};
