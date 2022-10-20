"use strict";
const utils = require("./utils.js");
const pokeDex = [
  "Pidgey",
  "Rattata",
  "Caterpie",
  "Weedle",
  "Nidoran ♀",
  "Nidoran ♂",
  "Diglett",
  "Dugtrio",
  "Spearow",
  "Sandshrew",
  "Jigglypuff",
  "Mankey",
  "Squirtle",
  "Charmander",
  "Bulbasaur",
  "Pikachu",
];

module.exports = class Pokemon {
  //For each pokeball, there is a 5% chance of catching the pokemon
  static MISS_RATE = 0.95;

  currentPokemon;
  currentTrainers;
  channelName;
  client;
  db;
  isActive = false;

  constructor(channelName, client, db) {
    this.channelName = channelName;
    this.client = client;
    this.db = db;
    this._intializePokemonTable();
  }

  handleMessage(channelName, userstate, msg) {
    if (utils.isMod(userstate, channelName)) {
      if (msg === "!encounter") {
        this._startEncounter();
      } else if (msg === "!pokebot_on") {
        this._activate();
      } else if (msg === "!pokebot_off") {
        this._deactivate();
      }
    }

    if (!this.isActive) {
      return;
    }
    if (msg === "!pokeball") {
      this._handlePokeball(userstate.username);
    } else if (msg === "!pokedex") {
      this.pokedex();
    }
  }

  _activate() {
    if (this.isActive) {
      this.client.say(this.channelName, "pokebot is already online.");
    } else {
      this.client.say(this.channelName, "pokebot activated.");
      this.intervalId = setInterval(() => {
        this._encounter();
      }, 600000);
      this.isActive = true;
    }
  }

  _deactivate() {
    if (!this.isActive) {
      this.client.say(this.channelName, "pokebot is already offline.");
    } else {
      this.client.say(this.channelName, "pokebot deactivated.");
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isActive = false;
    }
  }

  _intializePokemonTable() {
    this.db.defineTable("Pokemon", "pokemon", {
      name: {
        type: this.db.STRING_TYPE,
      },
    });
  }

  _startEncounter() {
    if (!this.isActive) {
      this.client.say(
        this.channelName,
        `pokebot is offline. Use !pokebot_on to reactivate`
      );
      return;
    }
    if (this.currentPokemon) {
      this.client.say(
        this.channelName,
        `A pokemon battle is already in progress!`
      );
    } else {
      this._encounter();
    }
  }
  _encounter() {
    if (this.currentPokemon) {
      return;
    }
    this.currentTrainers = new Set();
    this.currentPokemon = this._getPokemon();
    this.client.say(
      this.channelName,
      `A wild ${this.currentPokemon} appeared! Use !pokeball to catch it for the next 60 seconds!`
    );
    setTimeout(() => this._attemptCatch(), 60000);
  }

  _handlePokeball(username) {
    if (this.currentPokemon) {
      if (this.currentTrainers.has(username)) {
        this.client.say(
          this.channelName,
          `BOP BOP BOP ${username} you already threw a pokeball!`
        );
        return;
      }
      this.currentTrainers.add(username);
    } else {
      this.client.say(
        this.channelName,
        `BOP BOP BOP ${username} there are no pokemon to catch!`
      );
    }
  }

  _attemptCatch() {
    let pokeballPlural =
      this.currentTrainers.size === 1 ? "Poke Ball" : "Poke Balls";

    let chance =
      (1 - Math.pow(Pokemon.MISS_RATE, this.currentTrainers.size)) * 100;

    let roll = Math.floor(Math.random() * 100);

    console.log(chance, roll);

    const isCaught = chance > roll;

    if (isCaught) {
      this.client.say(
        this.channelName,
        `Community threw ${this.currentTrainers.size} ${pokeballPlural}. We caught ${this.currentPokemon}!`
      );
      this._storePokemon(this.currentPokemon);
    } else {
      this.client.say(
        this.channelName,
        `Community threw ${this.currentTrainers.size} ${pokeballPlural}. ${this.currentPokemon} got away!`
      );
    }

    this.currentPokemon = null;
    this.currentTrainers = new Set();
  }

  _getPokemon() {
    return pokeDex[Math.floor(Math.random() * pokeDex.length)];
  }

  _storePokemon(pokeName) {
    this.db.create("Pokemon", { name: pokeName });
    console.log("New pokemon inserted in the database");
  }

  async pokedex() {
    const entries = await this.db.findAll("Pokemon");
    const pokelist = entries.map((v) => `${v.name}`).join(", ");
    this.client.say(
      this.channelName,
      `Here are all the pokemon we have caught so far! ${pokelist}`
    );
  }
};
