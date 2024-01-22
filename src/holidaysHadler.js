const getHoliday = require("./getHoliday");
const lookup = require("country-code-lookup");

const holidaysHandler = async (countryISOcode) => {
  const holidayData = await getHoliday(countryISOcode);
  if (!holidayData) {
    return "Oops, something went wrong. Please try again";
  }
  if (holidayData[0]) {
    return `In ${holidayData[0].location} today is ${holidayData[0].name}`;
  } else {
    return `There are no holidays in ${
      lookup.byIso(countryISOcode).country
    } today that I know of.`;
  }
};

module.exports = holidaysHandler;
