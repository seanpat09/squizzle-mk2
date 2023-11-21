"use strict";
const utils = require("./utils.js");

module.exports = class Guess {
  constructor(client, db) {
    this.client = client;
    this.db = db;
    this._intializeGuessTable();
    this._guessActive = false;
  }

  handleMessage(channelName, userstate, msg) {
    let message = msg.toLowerCase();
    if (message.startsWith("!guess")) {
      const guessVal = message.replace("!guess ", "").trim();
      console.log("!guess");
      if (guessVal !== "") {
        this._addGuess(userstate.username, guessVal);
      }
    } else if (
      message.startsWith("!getwinners") &&
      utils.isMod(userstate, channelName)
    ) {
      const winningGuess = message.replace("!getwinners ", "").trim();
      if (winningGuess !== "") {
        this._getWinners(channelName, winningGuess);
      }
    } else if (message === "!endguess" && utils.isMod(userstate, channelName)) {
      this._endGuess(channelName);
    }
  }

  _intializeGuessTable() {
    this.db.defineTable("Guess", "guesses", {
      name: {
        type: this.db.STRING_TYPE,
      },
      guess: {
        type: this.db.STRING_TYPE,
      },
    });
  }

  async _addGuess(guesser, value) {
    const guess = await this.db.findOne("Guess", { where: { name: guesser } });
    if (guess) {
      guess.guess = value;
      await guess.save();
    } else {
      this.db.create("Guess", { name: guesser, guess: value });
    }
  }

  async _getWinners(channelName, winningGuess) {
    let winners = await this.db.findAll("Guess", {
      where: { guess: winningGuess },
    });
    if (!winners.length) {
      this.client.say(
        channelName,
        `Sorry, no one guessed ${winningGuess}. Better luck next time!`
      );
      return;
    }
    let winnerList = winners.map((v) => `${v.name}`).join(", ");

    this.client.say(channelName, `Congrats to our winners ${winnerList}`);
  }

  async _endGuess(channelName) {
    this.client.say(channelName, `Step on up, use the command !guess and guess the playthrough time and win a prize! Just type !guess and your guess, simple as typing !guess 1:57`);
    this.db.resetTable("Guess");
  }
};
