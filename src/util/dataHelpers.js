export const convertDate = date => {
  const newDate = new Date(date);
  console.log(newDate);
  const displayDate = newDate.toDateString();
  console.log(displayDate);
  return displayDate
};
