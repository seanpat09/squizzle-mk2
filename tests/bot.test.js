const tmi = require("tmi.js");
jest.mock("tmi.js");

const Channel = require(".././channel.js");
jest.mock(".././channel.js");

const Bot = require(".././bot.js");

describe("Bot", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("on startup", () => {
    describe("channel registration", () => {
      test("it should construct new tmi client with channel configuration for each channel", () => {
        const squizzlebot = new Bot();
        const expectedChannels = ["squizzleflip", "squizzle_mk2"];
        const expectedOptions = {
          channels: expectedChannels,
          identity: { password: "fakeoauthtoken", username: "fakebotname" }
        };
        expect(tmi.client).toBeCalledWith(expectedOptions);
      });
    });

    test("it should set up the handlers", () => {
      const mockClient = new MockClient();
      tmi.client = jest.fn(() => mockClient);
      const squizzlebot = new Bot();
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
      const squizzlebot = new Bot();
      expect(mockClient.connect).toBeCalledTimes(1);
    });
  });

  describe("message handling", () => {
    let mockClient;
    beforeEach(() => {
      mockClient = new MockClient();
      tmi.client = jest.fn(() => mockClient);

      const squizzlebot = new Bot();
      expect(Channel.mock.instances).toHaveLength(2);
      Channel.mock.instances[0].channelName = "#squizzleflip";
      Channel.mock.instances[1].channelName = "#squizzle_mk2";
    });

    test("it should only pass messages to the channel they were said in", () => {
      mockClient.mockMessage("#squizzleflip", {}, "!ping", false);
      expect(Channel.mock.instances[0].handleMessage.mock.calls.length).toBe(1);
      expect(Channel.mock.instances[1].handleMessage.mock.calls.length).toBe(0);
    });
  });
});

class MockClient {
  constructor() {
    this.on = jest.fn((eventName, handler) => {
      this.eventHandlers = this.eventHandlers || {};
      this.eventHandlers[eventName] = handler;
    });
    this.connect = jest.fn();
  }

  mockMessage(channel, user, msg, self) {
    this.eventHandlers.message(channel, user, msg, self);
  }
}
