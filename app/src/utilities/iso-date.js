class ISODate {
  static getDate() {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  }

  static getYear() {
    const today = new Date();
    return today.toISOString().slice(0, 4);
  }

  static getPadded(str) {
    return `00${str}`.slice(-2);
  }

  static getDateAndTime() {
    const today = new Date();
    return today.toISOString();
  }
}

export default ISODate;
