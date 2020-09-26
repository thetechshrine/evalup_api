const DateUtils = require('./interfaces/date-utils');

module.exports = class SimpleDateUtils extends DateUtils {
  isTheSameDay(date1, date2) {
    return date1.toLocaleDateString() === date2.toLocaleDateString();
  }

  isBeforeInTimeThan(date1, date2) {
    return date1.getTime() < date2.getTime();
  }

  isLaterInTimeThan(date1, date2) {
    return date1.getTime() > date2.getTime();
  }
};
