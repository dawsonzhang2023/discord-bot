module.exports = {
  getCurrentDateCode() {
    const currentDate = new Date();
    const dateCode = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    return dateCode;
  },
};
