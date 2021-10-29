const tmi = require("tmi.js");
jest.mock("tmi.js");

const Channel = require("channel.js");
jest.mock("channel.js");

const mockedChannels = {};

describe("Bot", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("on startup", () => {
    describe("channel registration", () => {
      test("it should construct new tmi client with channel configuration for each channel", () => {
        const bot = require(".././bot.js");
        const expectedChannels = ["squizzleflip", "squizzle_mk1"];
        const expectedOptions = {
          channels: expectedChannels,
          identity: { password: "fakeoauthtoken", username: "fakebotname" }
        };
        expect(tmi.client).toBeCalledWith();
      });
    });

    test("it should set up the handlers", () => {
      const mockClient = new MockClient();
      tmi.client = jest.fn(() => mockClient);
      const bot = require(".././bot.js");
      expect(mockClient.on).toBeCalledTimes(2);
      expect(mockClient.on).toHaveBeenNthCalledWith(
        1,
        "message",
        expect.anything()
      );
      expect(mockClient.on).toHaveBeenNthCalledWith(
        2,
        "connected",
        expect.anything()
      );
    });

    test("it should connect the tmi client", () => {
      const mockClient = new MockClient();
      tmi.client = jest.fn(() => mockClient);
      const bot = require(".././bot.js");
      expect(mockClient.connect).toBeCalledTimes(1);
    });
  });
  
  describe("message handling", () => {
    let bot;
    let mockClient;
    beforeEach(() => {
      mockClient = new MockClient();
      tmi.client = jest.fn(() => mockClient);
      
      bot = require(".././bot.js");
    });

    test("it should only pass messages to the channel they were said in", () => {
        mockClient.mockMessage("squizzleflip", {}, "!ping", false);
        expect(tmi.client).toBeCalledWith();
    })
  });
});

class MockClient {
  constructor() {
    this.on = jest.fn(
      (eventName, handler) => {
        this.eventHandlers = this.eventHandlers || {};
        this.eventHandlers[eventName] = handler;
      }
    );
    this.connect = jest.fn();
  }
  
  mockMessage(channel, user, msg, self) {
    this.eventHandlers.message(channel, user, msg, self);
  }
}

class MockChannel{
  constructor(channelName, client) {
    this.handleMessage = jest.fn();
    mockedChannels[channelName] = this;
  }
}
