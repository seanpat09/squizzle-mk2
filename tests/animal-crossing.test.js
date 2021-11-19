const AnimalCrossing = require(".././animal-crossing.js");
const utils = require(".././utils.js");
const MOCK_CLIENT = {
    say: jest.fn()
}

const MOCK_DB = {
    defineTable: jest.fn(),
    STRING_TYPE: "STRING",
    resetTable: jest.fn(),
    create: jest.fn(),
    deleteOne: jest.fn(),
    findAll: jest.fn()
}

const MOCK_CHANNEL_NAME = "squizzle-mock";

describe("Animal-Crossing", () => {
    describe("constructor", () => {
        let acHandler;
        beforeAll(() => {
            acHandler = new AnimalCrossing(MOCK_CLIENT, MOCK_DB);
        });
        
        afterAll(() => {
            jest.clearAllMocks();
        });
        
        test("should initialize with a client", () => {
            expect(acHandler.client).toBe(MOCK_CLIENT);
        });

        test("should initialize with a database", () => {
            expect(acHandler.db).toBe(MOCK_DB);
        });

        test("should initialize villager table", () => {
            expect(acHandler.db.defineTable).toBeCalledWith(
                "Villager", 
                "villagers", 
                {"name":
                    {"type": MOCK_DB.STRING_TYPE}
                })
        });
    });

    describe("handling messages", () => {
        const MOCK_VILLAGERS = [
            {name: "Hornsby"},
            {name: "Ione"}
        ];
        let acHandler;
        beforeEach(() => {
            acHandler = new AnimalCrossing(MOCK_CLIENT, MOCK_DB);
        });
        
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe("!showvillagers", () => {
            describe("user is mod", () => {
                beforeAll(() => {
                    utils.isMod = jest.fn().mockReturnValue(true);
                });
                test("should show villagers already found", async () => {
                    MOCK_DB.findAll.mockReturnValue(MOCK_VILLAGERS);
                    await acHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!showvillagers");
    
                    expect(MOCK_DB.findAll).toBeCalledWith("Villager");
                    expect(MOCK_CLIENT.say).toBeCalledWith(MOCK_CHANNEL_NAME,
                        "So far we found the following villagers: Hornsby, Ione"
                    );
                });
            })

            describe("user is not mod", () => {
                beforeAll(() => {
                    utils.isMod = jest.fn().mockReturnValue(false);
                });
                test("should not show villagers", async () => {
                    MOCK_DB.findAll.mockReturnValue(MOCK_VILLAGERS);
                    await acHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!showvillagers");
                    expect(MOCK_DB.findAll).not.toBeCalledWith("Villager");
                });
            })
        });


        describe("!startvillagerhunt", () => {
            describe("user is mod", () => {
                beforeEach( async () => {
                    utils.isMod = jest.fn().mockReturnValue(true);
                    MOCK_DB.findAll.mockReturnValue(MOCK_VILLAGERS);
                    await acHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!startvillagerhunt");
                });

                test("should reset villagers found", () => {
                    expect(MOCK_DB.resetTable).toBeCalledWith("Villager");
                });

                test("should show villagers already found", () => {
                    expect(MOCK_DB.findAll).toBeCalled();
                    expect(MOCK_CLIENT.say).toBeCalledWith(MOCK_CHANNEL_NAME, expect.anything());
                });
            });

            describe("user is not mod", () => {
                beforeEach( async () => {
                    utils.isMod = jest.fn().mockReturnValue(false);
                    MOCK_DB.findAll.mockReturnValue(MOCK_VILLAGERS);
                    await acHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!startvillagerhunt");
                });
                test("should reset villagers found", () => {
                    expect(MOCK_DB.resetTable).not.toBeCalledWith("Villager");
                });

                test("should show villagers already found", () => {
                    expect(MOCK_DB.findAll).not.toBeCalled();
                });
            });

        });

        describe("!addvillager", () => {
            describe("user is mod", () => {
                beforeEach( async () => {
                    utils.isMod = jest.fn().mockReturnValue(true);
                    MOCK_DB.findAll.mockReturnValue(MOCK_VILLAGERS);
                    await acHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!addvillager Hornsby");
                });

                test("should create villager", () => {
                    expect(MOCK_DB.create).toBeCalledWith("Villager", { name: "Hornsby" });
                });

                test("should show villagers already found", () => {
                    expect(MOCK_DB.findAll).toBeCalled();
                    expect(MOCK_CLIENT.say).toBeCalledWith(MOCK_CHANNEL_NAME, expect.anything());
                });
            });

            describe("user is not mod", () => {
                beforeEach( async () => {
                    utils.isMod = jest.fn().mockReturnValue(false);
                    MOCK_DB.findAll.mockReturnValue(MOCK_VILLAGERS);
                    await acHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!addvillager Hornsby");
                });
                test("should reset villagers found", () => {
                    expect(MOCK_DB.create).not.toBeCalled();
                });

                test("should show villagers already found", () => {
                    expect(MOCK_DB.findAll).not.toBeCalled();
                });
            });
        });

        describe("!removevillager", () => {
            describe("user is mod", () => {
                beforeEach( async () => {
                    utils.isMod = jest.fn().mockReturnValue(true);
                    MOCK_DB.findAll.mockReturnValue(MOCK_VILLAGERS);
                    await acHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!removevillager Hornsby");
                });

                test("should create villager", () => {
                    expect(MOCK_DB.deleteOne).toBeCalledWith("Villager", { name: "Hornsby" });
                });

                test("should show villagers already found", () => {
                    expect(MOCK_DB.findAll).toBeCalled();
                    expect(MOCK_CLIENT.say).toBeCalledWith(MOCK_CHANNEL_NAME, expect.anything());
                });
            });

            describe("user is not mod", () => {
                beforeEach( async () => {
                    utils.isMod = jest.fn().mockReturnValue(false);
                    MOCK_DB.findAll.mockReturnValue(MOCK_VILLAGERS);
                    await acHandler.handleMessage(MOCK_CHANNEL_NAME, {}, "!addvillager Hornsby");
                });
                test("should reset villagers found", () => {
                    expect(MOCK_DB.deleteOne).not.toBeCalled();
                });

                test("should show villagers already found", () => {
                    expect(MOCK_DB.findAll).not.toBeCalled();
                });
            });
        });
    });
});