const Channel = require('.././channel.js');

const MOCK_CHANNEL_NAME = "myChannel";
const MOCK_CLIENT = {
  say: jest.fn()
};

describe("Channel", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("registration", () => {
      test("registration should instantiate with a client", () => {
        const aChannel = new Channel(MOCK_CHANNEL_NAME, MOCK_CLIENT);
        
        expect(aChannel.name).toBe(MOCK_CHANNEL_NAME);
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

