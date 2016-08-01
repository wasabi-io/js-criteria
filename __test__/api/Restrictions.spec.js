import Restrictions from "api/Restrictions";
import chai from "chai";

const data = {
    name: "Kamil",
    age: 30
};

/** @test {api/Restrictions.js} **/
describe("api/Restrictions.js", () => {
    /** @test {api/Restrictions#op} **/
    it("op", () => {
        chai.assert.isTrue(Restrictions.op("<", "age", "35")(data));
        chai.assert.isFalse(Restrictions.op("<", "age", "25")(data));
        chai.assert.isTrue(Restrictions.op(">", "age", "25")(data));
        chai.assert.isFalse(Restrictions.op(">", "age", "35")(data));
        chai.assert.isTrue(Restrictions.op("==", "age", "30")(data));
        chai.assert.isFalse(Restrictions.op("==", "age", "29")(data));
        chai.assert.isTrue(Restrictions.op(">=", "age", "30")(data));
        chai.assert.isTrue(Restrictions.op("<=", "age", "30")(data));
    });
    /** @test {api/Restrictions#eq} **/
    it("eq", () => {
        chai.assert.isTrue(Restrictions.eq("name", "Kamil", true)(data));
        chai.assert.isTrue(Restrictions.eq("age", 30, true)(data));
        chai.assert.isTrue(Restrictions.eq("name", "kamil", false)(data));
        chai.assert.isFalse(Restrictions.eq("name", "kamil", true)(data));
    });
    /** @test {api/Restrictions#lt} **/
    it("lt", () => {
        chai.assert.isTrue(Restrictions.lt("age",32)(data));
        chai.assert.isFalse(Restrictions.lt("age",30)(data));
        chai.assert.isFalse(Restrictions.lt("age",29)(data));
    });
    /** @test {api/Restrictions#lte} **/
    it("lte", () => {
        chai.assert.isTrue(Restrictions.lte("age",32)(data));
        chai.assert.isTrue(Restrictions.lte("age",30)(data));
        chai.assert.isFalse(Restrictions.lte("age",29)(data));
    });
    /** @test {api/Restrictions#gt} **/
    it("gt", () => {
        chai.assert.isTrue(Restrictions.gt("age",29)(data));
        chai.assert.isFalse(Restrictions.gt("age",30)(data));
        chai.assert.isFalse(Restrictions.gt("age",32)(data));
    });
    /** @test {api/Restrictions#gte} **/
    it("gte", () => {
        chai.assert.isTrue(Restrictions.gte("age",29)(data));
        chai.assert.isTrue(Restrictions.gte("age",30)(data));
        chai.assert.isFalse(Restrictions.gte("age",32)(data));
    });
    /** @test {api/Restrictions#between} **/
    it("between", () => {
        chai.assert.isTrue(Restrictions.between("age", 29 , 32)(data));
        chai.assert.isTrue(Restrictions.between("age", 29, 30)(data));
        chai.assert.isTrue(Restrictions.between("age", 32, 29)(data));
        chai.assert.isTrue(Restrictions.between("age", 32, 29)(data));
    });
    /** @test {api/Restrictions#startsWith} **/
    it("startsWith", () => {
        chai.assert.isTrue(Restrictions.startsWith("age", "3")(data));
        chai.assert.isTrue(Restrictions.startsWith("name","Ka")(data));
        chai.assert.isTrue(Restrictions.startsWith("name","ka")(data));
        chai.assert.isFalse(Restrictions.startsWith("name", "ka", true)(data));
    });
    /** @test {api/Restrictions#endsWith} **/
    it("endsWith", () => {
        chai.assert.isTrue(Restrictions.endsWith("age", "0")(data));
        chai.assert.isTrue(Restrictions.endsWith("name","il")(data));
        chai.assert.isFalse(Restrictions.endsWith("name", "İl", true)(data));
    });
    /** @test {api/Restrictions#contains} **/
    it("contains", () => {
        chai.assert.isTrue(Restrictions.contains("age", "3")(data));
        chai.assert.isTrue(Restrictions.contains("name","ami")(data));
        chai.assert.isTrue(Restrictions.contains("name","il")(data));
        chai.assert.isFalse(Restrictions.contains("name", "aka", true)(data));
    });
    /** @test {api/Restrictions#like} **/
    it("like", () => {
        chai.assert.isTrue(Restrictions.like("age", "3%")(data));
        chai.assert.isTrue(Restrictions.like("name","%ami%")(data));
        chai.assert.isTrue(Restrictions.like("name","%il")(data));
        chai.assert.isFalse(Restrictions.like("name", "%aka%", true)(data));
    });
    /** @test {api/Restrictions#in} **/
    it("in", () => {
        chai.assert.isTrue(Restrictions.in("age", ["30","31"])(data));
        chai.assert.isFalse(Restrictions.in("age", ["29","31"])(data));
        chai.assert.isTrue(Restrictions.in("name", ["Kamil"])(data));
        chai.assert.isTrue(Restrictions.in("name", ["kamil"])(data));
        chai.assert.isFalse(Restrictions.in("name", ["kamil"], true)(data));
    });
    /** @test {api/Restrictions#isNull} **/
    it("isNull", () => {
        chai.assert.isFalse(Restrictions.isNull("age")(data));
        chai.assert.isFalse(Restrictions.isNull("name")(data));
        chai.assert.isTrue(Restrictions.isNull("email")(data));
    });
    /** @test {api/Restrictions#isNotNull} **/
    it("isNotNull", () => {
        chai.assert.isTrue(Restrictions.isNotNull("age")(data));
        chai.assert.isTrue(Restrictions.isNotNull("name")(data));
        chai.assert.isFalse(Restrictions.isNotNull("email")(data));
    });
    /** @test {api/Restrictions#isEmpty} **/
    it("isEmpty", () => {
        chai.assert.isFalse(Restrictions.isEmpty("age")(data));
        chai.assert.isFalse(Restrictions.isEmpty("name")(data));
        chai.assert.isTrue(Restrictions.isEmpty("email")(data));
    });
    /** @test {api/Restrictions#isNotEmpty} **/
    it("isNotEmpty", () => {
        chai.assert.isTrue(Restrictions.isNotEmpty("age")(data));
        chai.assert.isTrue(Restrictions.isNotEmpty("name")(data));
        chai.assert.isFalse(Restrictions.isNotEmpty("email")(data));
    });
    /** @test {api/Restrictions#or} **/
    it("or", () => {

        let funcArray = [
            Restrictions.eq("name","kamil"),
            Restrictions.lt("age",29)
        ];
        chai.assert.isTrue(Restrictions.or.apply(Restrictions,funcArray)(data));
        funcArray = [
            Restrictions.eq("name","kemal"),
            Restrictions.lt("age",29)
        ];
        chai.assert.isFalse(Restrictions.or.apply(Restrictions,funcArray)(data));
    });
    /** @test {api/Restrictions#and} **/
    it("and", () => {
        let funcArray = [
            Restrictions.eq("name","kamil"),
            Restrictions.lt("age",32)
        ];
        chai.assert.isTrue(Restrictions.and.apply(Restrictions,funcArray)(data));
        funcArray = [
            Restrictions.eq("name","kamil"),
            Restrictions.lt("age",29)
        ];
        chai.assert.isFalse(Restrictions.and.apply(Restrictions,funcArray)(data));
    });
});
