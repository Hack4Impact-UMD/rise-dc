export const findDuration = (
  startingTime: string,
  endingTime: string
): number => {
  const startTimeHour: number = parseInt(startingTime.split(":")[0]);
  const endTimeHour: number = parseInt(endingTime.split(":")[0]);
  const startTimeMinutes: number = parseInt(startingTime.split(":")[1]);
  const endTimeMinutes: number = parseInt(endingTime.split(":")[1]);
  const startTime = startTimeHour * 60 + startTimeMinutes;
  const endTime = endTimeHour * 60 + endTimeMinutes;
  return endTime > startTime ? endTime - startTime : endTime - startTime + 1440;
};

export const durationToString = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  let hoursString = "";
  if (hours === 1) {
    hoursString = `${hours} hour `;
  } else if (hours > 1) {
    hoursString = `${hours} hours `;
  }
  let minutesString = "";
  if (minutes === 1) {
    minutesString = `${minutes} minute`;
  } else if (minutes > 1) {
    minutesString = `${minutes} minutes`;
  }

  if (hours + minutes == 0) {
    return "0 minutes";
  }

  return `${hoursString}${minutesString}`;
};

export const formatDate = (date: string): string => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[parseInt(date.split("-")[1]) - 1];
  const getEnding = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const ending = getEnding(parseInt(date.split("-")[2]));
  const finalDate =
    month +
    " " +
    parseInt(date.split("-")[2]) +
    ending +
    ", " +
    date.split("-")[0];
  return finalDate;
};
