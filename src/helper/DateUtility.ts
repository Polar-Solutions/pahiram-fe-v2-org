function convertDateForHumanConsumption(inputDate: string) {
  // Parse the input date string
  const dateObject = new Date(inputDate);

  // Array of month names
  const monthNames = [
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

  // Get month, day, year, and time components
  const month = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear().toString().slice(-2);
  // const year = dateObject.getFullYear()
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  // Convert hours to 12-hour format
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Add leading zeros to minutes
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Construct the formatted string
  const formattedString = `${formattedHours}:${formattedMinutes}${ampm} ${day} ${month}${year}`;

  return formattedString;
}

export { convertDateForHumanConsumption };
