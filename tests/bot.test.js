const tmi = require("tmi.js");
jest.mock("tmi.js");

const Channel = require("channel.js");
jest.mock("channel.js");

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
    test("it should only pass messages to the channel they were said in", () => {
    
    })
  });
});

class MockClient {
  constructor() {
    this.on = jest.fn(() => console.log("ON WAS CALLED"));
    this.connect = jest.fn();
  }
}
