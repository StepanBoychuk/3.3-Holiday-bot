require("dotenv").config();
const axios = require("axios");
const logger = require("./logger");

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
    return holiday.data;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = getHoliday;
