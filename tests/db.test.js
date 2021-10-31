const Db = require("db.js");
const Sequelize = require("sequelize");
jest.mock("sequelize");

describe("Db", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("constructor", () => {
      test("constructor registration should instantiate with a client", () => {
        const aChannel = new Channel(MOCK_CHANNEL_NAME, MOCK_CLIENT);
        
        expect(aChannel.channelName).toBe(MOCK_CHANNEL_NAME);
        expect(aChannel.client).toBe(MOCK_CLIENT);
      });
    })

    describe("channel commands", () => {
      test("should be able to ping bot in channel", () => {
        const aChannel = new Channel(MOCK_CHANNEL_NAME, MOCK_CLIENT);
        
        aChannel.handleMessage({}, "!ping");
        
        expect(MOCK_CLIENT.say).toBeCalledWith(MOCK_CHANNEL_NAME, "squizzle bot online.");
      })
    })
})
