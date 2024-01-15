require("dotenv").config();
const axios = require("axios");
const lookup = require("country-code-lookup");

const getHoliday = async (country) => {
  try {
    const currentDate = new Date();
    const holiday = await axios.get("https://holidays.abstractapi.com/v1/", {
      params: {
        api_key: process.env.ABSTRACT_API_TOKEN,
        country: country,
        year: currentDate.getUTCFullYear(),
        month: currentDate.getUTCMonth() + 1,
        day: currentDate.getUTCDate(),
      },
    });
    if (holiday.data[0]) {
      return `In ${holiday.data[0].location} today is ${holiday.data[0].name}.`;
    } else {
      return `There are no holidays in ${
        lookup.byIso(country).country
      } today that I know of.`;
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = getHoliday;
