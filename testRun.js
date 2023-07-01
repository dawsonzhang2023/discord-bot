const currentDate = new Date();
console.log(currentDate);

// output  date

const dateCode = `${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1
}-${currentDate.getDate()}`;

console.log(dateCode);
