require("dotenv").config();
const telegramBot = require("node-telegram-bot-api");
const commands = require("./src/commands.js");
const logger = require("./src/logger.js");
const getHoliday = require("./src/getHoliday.js");
const { flagToCountry } = require("emoji-flags-to-country");
const lookup = require("country-code-lookup");
const holidaysHandler = require("./src/holidaysHadler.js");

const token = process.env.TELEGRAM_TOKEN;

const bot = new telegramBot(token, { polling: true });

bot.on("polling_error", logger.error);

bot.on("message", async (msg) => {
  //Check if message contain a command
  if (commands[msg.text]) {
    bot.sendMessage(msg.chat.id, commands[msg.text].text, {
      reply_markup: {
        keyboard: commands[msg.text].options.keyboard,
      },
    });
    return;
  }
  //Check if message contain a country flag emoji
  if (flagToCountry(msg.text)) {
    bot.sendMessage(
      msg.chat.id,
      await holidaysHandler(flagToCountry(msg.text))
    );
    return;
  }
  bot.sendMessage(
    msg.chat.id,
    "Unexpected command. Try /help to get possible commands"
  );
});
