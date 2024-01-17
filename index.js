require("dotenv").config();
const telegramBot = require("node-telegram-bot-api");
const responses = require("./src/responses.js");
const logger = require("./src/logger.js");
const getHoliday = require("./src/getHoliday.js");
const { flagToCountry } = require("emoji-flags-to-country");
const lookup = require("country-code-lookup");

const token = process.env.TELEGRAM_TOKEN;

const bot = new telegramBot(token, { polling: true });

bot.on("polling_error", logger.error);

Object.entries(responses).forEach(([command, response]) => {
  const regespCommand = new RegExp(command);
  bot.onText(regespCommand, (msg) => {
    try {
      bot.sendMessage(msg.chat.id, response.text, {
        reply_markup: {
          keyboard: response.options.keyboard,
        },
      });
    } catch (error) {
      logger.error(error);
    }
  });
});

bot.on("message", async (msg) => {
  const commandsList = Object.keys(responses);
  if (commandsList.includes(msg.text) || msg.text[0] === "/") {
    return;
  }

  const countryISOcode = flagToCountry(msg.text);
  if (!countryISOcode) {
    //Check if text/emoji is emoji country flag
    bot.sendMessage(msg.chat.id, "Please, send country flag emoji.");
    return;
  }
  const holiday = await getHoliday(countryISOcode); //Get country holiday if it exists

  if (!holiday) {
    bot.sendMessage(
      msg.chat.id,
      "Oops, something went wrong. Please try again."
    );
    return;
  }
  if (holiday[0]) {
    bot.sendMessage(
      msg.chat.id,
      `In ${holiday[0].location} today is ${holiday[0].name}`
    );
  } else {
    bot.sendMessage(
      msg.chat.id,
      `There are no holidays in ${
        lookup.byIso(countryISOcode).country
      } today that I know of.`
    );
  }
});
