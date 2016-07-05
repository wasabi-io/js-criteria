import Validation from "util/Validation";
import chai from "chai";

/** @test {util/Validation} **/
describe("util/Validation.js", () => {
    /** @test {util/Validation#startsWith} **/
    it("startsWith", () => {
        chai.assert.isTrue(Validation.startsWith("Example String", "Ex"));
        chai.assert.isFalse(Validation.startsWith("Example String", "Sti"));
    });
    /** @test {util/Validation#endsWith} **/
    it("endsWith", () => {
        chai.assert.isTrue(Validation.endsWith("Example String", "ing"));
        chai.assert.isFalse(Validation.endsWith("Example String", "Ex"));
    });
});
