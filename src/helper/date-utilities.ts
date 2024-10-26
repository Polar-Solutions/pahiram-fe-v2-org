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

function convertDatesToApiFormat(
  obj: Record<string, any>
): Record<string, any> {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (
        typeof obj[key] === "string" &&
        obj[key].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
      ) {
        obj[key] = obj[key].replace("T", " ").concat(":00");
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        convertDatesToApiFormat(obj[key]);
      }
    }
  }
  return obj;
}

const formatDateTimeToHumanFormat = (dateString: string | undefined | null): string | null => {
  if(!dateString){
    return null
  }
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // Enables AM/PM format
  };
  return date.toLocaleString(undefined, options);
};

export { convertDateForHumanConsumption, convertDatesToApiFormat, formatDateTimeToHumanFormat };
