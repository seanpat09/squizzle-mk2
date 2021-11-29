"use strict";
const utils = require("./utils.js");

module.exports = class Pokemon {
  constructor(client, db) {
    this.client = client;
    this.db = db;
    this._intializePokemonTable();
    this.encounterActive = false;
    this.encounteredPokemon = undefined;
  }

  handleMessage(channelName, userstate, msg) {
    if (msg.startsWith("!addpokemon")) {
      const pokemonName = msg.replace("!addpokemon ", "").trim();
      if (pokemonName !== "") {
        this._addPokemon(channelName, userstate, pokemonName);
      }
    } else if (msg.startsWith("!removepokemon")) {
      const pokemonName = msg.replace("!removepokemon ", "").trim();
      if (pokemonName !== "") {
        this._removePokemon(channelName, userstate, pokemonName);
      }
    } else if (msg === "!viewwildpokemon") {
      this._viewWildPokemon(channelName);
    } else if (msg === "!encounter") {
      if (utils.isMod(userstate, channelName)) {
        this._startEncounter(channelName);
      }
    }
  }

  _intializePokemonTable() {
    this.db.defineTable("Pokemon", "pokemon", {
      name: {
        type: this.db.STRING_TYPE
      }
    });
  }

  _addPokemon(channelName, userstate, pokemonName) {
    if (utils.isMod(userstate, channelName)) {
      this.db.create("Pokemon", { name: pokemonName });
      this._viewWildPokemon(channelName);
    }
  }

  _removePokemon(channelName, userstate, pokemonName) {
    if (utils.isMod(userstate, channelName)) {
      this.db.deleteOne("Pokemon", { name: pokemonName });
    }
  }

  async _startEncounter(channelName) {
    if(this.encounterActive) {
      this.client.say(
        channelName,
        "BOP we are already in an encounter!"
      );
      return;
    }
    let pokemon = await this.db.findAll("Pokemon");
    this.encounteredPokemon = pokemon[Math.floor(Math.random()*pokemon.length)].name;
    this.encounterActive = true;
    this.client.say(
      channelName,
      `A wild ${this.encounteredPokemon} appeared!`
    );
  }

  async _viewWildPokemon(channelName) {
    let pokemon = await this.db.findAll("Pokemon");
    let pokemonList = pokemon.map(v => v.name).join(", ");

    this.client.say(
      channelName,
      `The following pokemon are in the wild!: ${pokemonList}`
    );
  }
}