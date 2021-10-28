const tmi = require("tmi.js");
jest.mock('tmi.js');


const bot = require('.././bot.js');

describe('on startup', () => {
  
  test.only('it should construct a new tmi client with channel configuration', () => {
    expect(tmi.client).toBeCalledWith({"channels": ["fakechannelname"], "identity": {"password": "fakeoauthtoken", "username": "fakebotname"}});
  });

  test('it should set up the onMessageHandler', () => {
    expect(true).toBe(false);
  });
  
  test('it should set up the onConnectedHandler', () => {
    expect(true).toBe(false);
  });
  
  test('it should connect the tmi client', () => {
    expect(true).toBe(false);
  });
})

