const keyboard = [
  ["🇺🇦", "🇵🇱", "🇬🇧", "🇰🇷"],
  ["🇺🇸", "🇸🇪", "🇯🇵", "🇬🇷"],
];

const responses = {
  start: {
    text: "Welcome! Select a country from the keyboard or send me its flag emoji",
    options: {
      keyboard: keyboard,
    },
  },
  help: {
    text: "Here is the keyboard with some of the available countries:",
    options: {
      keyboard: keyboard,
    },
  },
};

module.exports = responses;
