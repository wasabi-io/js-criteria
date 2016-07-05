import Restrictions from "api/Restrictions";
import chai from "chai";

const data = [
    {
        id: "1",
        name: "Luffy",
        surname: "Monkey D."
    },
    {
        id: "2",
        name: "Zoro",
        surname: "Roronoa"
    },
    {
        id: "3",
        name: "Nami",
        surname: ""
    },
    {
        id: "4",
        name: "Usop",
        surname: ""
    },
    {
        id: "5",
        name: "Sanji",
        surname: ""
    },
    {
        id: "6",
        name: "Chopper",
        surname: "Tony Tony"
    },
    {
        id: "7",
        name: "Robin",
        surname: "Nico"
    },
    {
        id: "8",
        name: "Franky",
        surname: ""
    },
    {
        id: "9",
        name: "Brook",
        surname: ""
    }
];
/** @test {api/Restrictions} **/
describe("api/Restrictions.js", () => {
    /** @test {api/Restrictions#gt} **/
    it("gt", () => {
        chai.assert.isFalse(Restrictions.gt("id", 5)(data[0]));
        chai.assert.isTrue(Restrictions.gt("id", 5)(data[6]));
    });
    /** @test {api/Restrictions#lt} **/
    it("lt", () => {
        chai.assert.isTrue(Restrictions.lt("id", 5)(data[0]));
        chai.assert.isFalse(Restrictions.lt("id", 5)(data[6]));
    });
    /** @test {api/Restrictions#like} **/
    it("like", () => {
        chai.assert.isFalse(Restrictions.like("name", "%an")(data[0]));
        chai.assert.isFalse(Restrictions.like("name", "%an")(data[4]));

        chai.assert.isFalse(Restrictions.like("name", "%a%")(data[0]));
        chai.assert.isTrue(Restrictions.like("name", "%a%")(data[4]));

        chai.assert.isFalse(Restrictions.like("name", "Us%")(data[0]));
        chai.assert.isTrue(Restrictions.like("name", "Us%")(data[3]));
    });
    /** @test {api/Restrictions#ilike} **/
    it("ilike", () => {
        chai.assert.isFalse(Restrictions.ilike("name", "%AN")(data[0]));
        chai.assert.isFalse(Restrictions.ilike("name", "%AN")(data[4]));

        chai.assert.isFalse(Restrictions.ilike("name", "%A%")(data[0]));
        chai.assert.isTrue(Restrictions.ilike("name", "%A%")(data[4]));

        chai.assert.isFalse(Restrictions.ilike("name", "US%")(data[0]));
        chai.assert.isTrue(Restrictions.ilike("name", "US%")(data[3]));
    });
    /** @test {api/Restrictions#between} **/
    it("between", () => {
        chai.assert.isFalse(Restrictions.between("id", 3, 5)(data[0]));
        chai.assert.isTrue(Restrictions.between("id", 3, 5)(data[3]));
    });
    /** @test {api/Restrictions#isNull} **/
    it("isNull", () => {
        chai.assert.isFalse(Restrictions.isNull("id")(data[0]));
        chai.assert.isTrue(Restrictions.isNull("field")(data[0]));
    });
    /** @test {api/Restrictions#isNotNull} **/
    it("isNotNull", () => {
        chai.assert.isTrue(Restrictions.isNotNull("id")(data[0]));
        chai.assert.isFalse(Restrictions.isNotNull("field")(data[0]));
    });
    /** @test {api/Restrictions#isEmpty} **/
    it("isEmpty", () => {
        const emptyData = {
            id: "2",
            name: "Zoro",
            surname: "Roronoa"
        };
        chai.assert.isFalse(Restrictions.isEmpty("name")(emptyData));
        chai.assert.isTrue(Restrictions.isEmpty("field")(emptyData));
        chai.assert.isTrue(Restrictions.isEmpty("example")(emptyData));
    });
    /** @test {api/Restrictions#isNotEmpty} **/
    it("isNotEmpty", () => {
        const emptyData = {
            id: "2",
            name: "Zoro",
            surname: "Roronoa"
        };
        chai.assert.isTrue(Restrictions.isNotEmpty("name")(emptyData));
        chai.assert.isFalse(Restrictions.isNotEmpty("field")(emptyData));
        chai.assert.isFalse(Restrictions.isNotEmpty("example")(emptyData));
    });
    /** @test {api/Restrictions#or} **/
    it("or", () => {
        let orData = {
            id: "2",
            name: "Zoro",
            surname: "Roronoa"
        };

        chai.assert.isTrue(Restrictions.or(Restrictions.ilike("name", "%o%"), Restrictions.gt("id", 2))(orData));
        chai.assert.isFalse(Restrictions.or(Restrictions.ilike("name", "%t%"), Restrictions.gt("id", 2))(orData));
    });
    /** @test {api/Restrictions#and} **/
    it("and", () => {
        let orData = {
            id: "2",
            name: "Zoro",
            surname: "Roronoa"
        };

        chai.assert.isTrue(Restrictions.and(Restrictions.ilike("name", "%O%"), Restrictions.gt("id", 1))(orData));
        chai.assert.isFalse(Restrictions.and(Restrictions.ilike("name", "%a%"), Restrictions.gt("id", 2))(orData));
        chai.assert.isFalse(Restrictions.and(Restrictions.ilike("name", "%t%"), Restrictions.gt("id", 2))(orData));
    });
});