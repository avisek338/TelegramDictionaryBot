
import TelegramBot from 'node-telegram-bot-api';
const token = '7204693891:AAE3RmvXdy-61dbRY-C62IVz-oYhyAYbWfs';
const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/define (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const word = match[1].trim(); 
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data && data[0] && data[0].meanings && data[0].meanings.length > 0) {
            const definitions = data[0].meanings[0].definitions;
            const definitionMessage = definitions.map((def, index) => `${index + 1}. ${def.definition}`).join('\n');
            bot.sendMessage(chatId, `Definitions of ${word}:\n${definitionMessage}`);
        } else {
            bot.sendMessage(chatId, `No definitions found for the word "${word}".`);
        }
    } catch (e) {
        bot.sendMessage(chatId, `Error fetching definition: ${e.message}`);
    }
});


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = `
    Welcome to the Dictionary Bot!
    Use the following commands:
    /start - Display this welcome message
    /define [word] - Get the definition of a word
    Please enter a command to get started!
    `;
    bot.sendMessage(chatId, welcomeMessage);
});
