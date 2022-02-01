const Screen = require("../src/screen")
describe("Screen", () => {
    let screen

    it("knows when capacity is invalid", () => {
        screen = new Screen("1", 101)
        expect(screen.invalidCapacity()).toEqual(true);
    })
})