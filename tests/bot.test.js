const tmi = require("tmi.js");
jest.mock('tmi.js');

describe('on startup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  test('it should construct a new tmi client with channel configuration', () => {
    const bot = require('.././bot.js');
    expect(tmi.client).toBeCalledWith({"channels": ["fakechannelname"], "identity": {"password": "fakeoauthtoken", "username": "fakebotname"}});
  });

  test('it should set up the handlers', () => {
    const mockClient = new MockClient();
    tmi.client = jest.fn(() => mockClient);
    const bot = require('.././bot.js');
    expect(mockClient.on).toBeCalledTimes(2);
    expect(mockClient.on).toHaveBeenNthCalledWith(1, "message", expect.anything());
    expect(mockClient.on).toHaveBeenNthCalledWith(2, "connected", expect.anything());
  });
  
  test('it should connect the tmi client', () => {
    const mockClient = new MockClient();
    tmi.client = jest.fn(() => mockClient);
    const bot = require('.././bot.js');
    expect(mockClient.connect).toBeCalledTimes(1);
  });
})

class MockClient {
  constructor() {
    this.on = jest.fn(() => console.log("ON WAS CALLED"));
    this.connect = jest.fn();
  }
}

