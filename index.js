require("dotenv").config();
const telegramBot = require("node-telegram-bot-api");
const responses = require("./src/responses.js");
const getHoliday = require("./src/getHoliday.js");
const { emojiCountryCode } = require("country-code-emoji");

const token = process.env.TELEGRAM_TOKEN;

const bot = new telegramBot(token, { polling: true });

bot.on("polling_error", console.error);

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
      console.error(error);
    }
  });
});

bot.on("message", async (msg) => {
  try {
    const result = await getHoliday(emojiCountryCode(msg.text));
    bot.sendMessage(msg.chat.id, result);
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message.includes("flag argument must be a flag emoji")
    ) {
      bot.sendMessage(
        msg.chat.id,
        "Wrong input. Please, send country flag emoji"
      );
    } else {
      console.error(error);
      bot.sendMessage(msg.chat.id, "Something went wrong");
    }
  }
});
