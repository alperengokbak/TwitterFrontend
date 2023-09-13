export const CurrentDateFormat = (creation_date) => {
  const dataObject = new Date(creation_date);
  const currentDate = new Date();
  const months = [
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
  const isSameDay =
    dataObject.getFullYear() === currentDate.getFullYear() &&
    dataObject.getMonth() === currentDate.getMonth() &&
    dataObject.getDate() === currentDate.getDate();

  let formattedDate = "";

  if (isSameDay) {
    const hour = dataObject.getHours();
    const minutes = dataObject.getMinutes();
    const amOrPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    formattedDate = `${formattedHour}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${amOrPm}`;
  } else {
    const day = dataObject.getDate();
    const month = months[dataObject.getMonth()];
    const monthDay = `${month < 10 ? "0" : ""}${month} ${
      day < 10 ? "0" : ""
    }${day}`;
    formattedDate = monthDay;
  }

  return formattedDate;
};
