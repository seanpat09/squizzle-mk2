const Channel = require('.././channel.js');

const MOCK_CHANNEL_NAME = "myChannel";
const MOCK_CLIENT = {};

describe("Channel", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("registration", () => {
      test("registration should instantiate with a client", () => {
        const aChannel = new Channel(MOCK_CHANNEL_NAME, MOCK_CLIENT);
        
        expect(aChannel.chan
      });
    })

    describe("channel commands", () => {
      test("should be able to ping bot in channel", () => {
        expect(false).toBe(true);
      })
    })
})

