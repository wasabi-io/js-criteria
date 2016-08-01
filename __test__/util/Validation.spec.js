import Validation from "util/Validation";
import chai from "chai";

/** @test {api/Criteria} **/
describe("util/Validation.js", () => {
    /** @test {api/Criteria#constructors} */
    it("startsWith", () => {
        chai.assert.isTrue(Validation.startsWith("kamil", "ka"), "must be true without using position");
        chai.assert.isFalse(Validation.startsWith("kamil", "ami"), "must be false without using position");
        chai.assert.isTrue(Validation.startsWith("kamil", "a",1), "must be true with using position");
        chai.assert.isFalse(Validation.startsWith("kamil", "m",1), "must be false with using position");
    });
    it("endsWith", () => {
        chai.assert.isTrue(Validation.endsWith("kamil", "il"), "must be true without using position");
        chai.assert.isFalse(Validation.endsWith("kamil", "mi"), "must be false without using position");
        chai.assert.isTrue(Validation.endsWith("kamil", "mi",4), "must be true with using position");
        chai.assert.isFalse(Validation.endsWith("kamil", "kam",4), "must be false with using position");
    });
});
