class ISODate {
  static getDate(str) {
    let today = new Date();
    let date = ISODate.getYear();

    if (str) today = new Date(str);
    if (str.toString().length === 4) date = str.toString();
    else date = today.toISOString().slice(0, 10);
    return date;
  }

  static getYear() {
    const today = new Date();
    return today.toISOString().slice(0, 4);
  }

  static getPadded(str) {
    let num = str;
    if (isNaN(num)) num = '00';
    return `00${num}`.slice(-2);
  }

  static getDateAndTime() {
    const today = new Date();
    return today.toISOString();
  }
}

export default ISODate;
