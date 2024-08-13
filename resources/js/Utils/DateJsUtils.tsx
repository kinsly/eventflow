import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

//This was used to fix time format passed HH:mm:ss to convert 12 hour return invalid date. (getTimeInAMPM)
dayjs.extend(customParseFormat);

/**
 * 
 * @param monthNumber 
 * @returns name of the Month
 */
export const getMonthName = (monthNumber:number) => {
  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error('Invalid month number. Must be between 1 and 12.');
  }
  
  const date = dayjs().month(monthNumber - 1);
  return date.format('MMMM');
};

/**
 * 
 * @param dateString YYYY-MM-DD
 * @returns day of the month
 */
export const getDayOfMonth = (dateString:string) => {
  const date = dayjs(dateString);
  const dayOfMonth = date.format('D');
  return dayOfMonth;
};

/**
 * 
 * @param dateString YYYY-MM-Dd
 * @returns day name like wednesday
 */
export const getDayName = (dateString:string) => {
  const date = dayjs(dateString);
  const dayAbbreviation = date.format('dddd');
  return dayAbbreviation;
};

/**
 * 
 * @param dateString YYYY-MM-DD
 * @returns return abbrivation of the day name - wed
 */
export const getDayNameAbbr = (dateString:string) => {
  const date = dayjs(dateString);
  const dayAbbreviation = date.format('ddd');
  return dayAbbreviation;
};


/**
 * @param dateString YYYY-MM-DD
 * Return month name in short
 */
export const getMonthAbbr = (dateString:string) => {

  const date = dayjs(dateString, 'YYYY-MM-DD');
  return date.format('MMM');

}

/**
 * 
 * @param timeString 02:20:00
 * return time in AM or PM
 */
export const getTimeInAMPM = (timeString:string) => {
  
  if (timeString) {
    const formattedTime = dayjs(timeString, 'HH:mm:ss').format('hh:mm A');
    return formattedTime;
  }
  return "";
  
}

/**
 * Check provided date string to DB is today
 * @param dateString YYYY-MM-DD
 * @returns boolean
 */
export const isToday = (dateString:string) => {
  // Parse the date string using the format
  const parsedDate = dayjs(dateString, 'YYYY-MM-DD');

  // Check if the parsed date is valid
  if (!parsedDate.isValid()) {
    return false;
  }

  // Get today's date
  const today = dayjs();

  // Compare year, month, and day of the parsed date and today's date
  return (
    parsedDate.year() === today.year() &&
    parsedDate.month() === today.month() &&
    parsedDate.date() === today.date()
  );
};

