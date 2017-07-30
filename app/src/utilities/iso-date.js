class ISODate {
  static getDate() {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  }

  static getDateAndTime() {
    const today = new Date();
    return today.toISOString();
  }
}

export default ISODate;
