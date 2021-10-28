const tmi = require("tmi.js");
jest.mock('tmi.js');

describe('on startup', () => {
  
  test('it should construct a new tmi client with channel configuration', () => {
    const bot = require('.././bot.js');
    expect(tmi.client).toBeCalledWith({"channels": ["fakechannelname"], "identity": {"password": "fakeoauthtoken", "username": "fakebotname"}});
  });

  test.only('it should set up the onMessageHandler', () => {
    const mockClient = new MockClient();
    tmi.client = jest.fn(() => mockClient);
    const bot = require('.././bot.js');
    expect(mockClient.on).toBeCalledWith("message");
  });
  
  test('it should set up the onConnectedHandler', () => {
    expect(true).toBe(false);
  });
  
  test('it should connect the tmi client', () => {
    expect(true).toBe(false);
  });
})

class MockClient {
  constructor() {
    this.on = jest.fn(() => console.log("ON WAS CALLED"));
    this.connect = jest.fn();
  }
}

