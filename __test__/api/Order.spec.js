import Order from "api/Order";
import chai from "chai";

const data =[
    {
        name: "Hasan",
        age: 28
    },
    {
        name: "Kamil",
        age: 30
    },
    {
        name: "Seray",
        age: 30
    },
    {
        name: "Ertuğrul",
        age: 26
    }
]

/** @test {api/Restrictions.js} **/
describe("api/Order.js", () => {
    /** @test {api/Order#asc} **/
    it("asc", () => {
        let expected = [
            {
                name: "Ertuğrul",
                age: 26
            },
            {
                name: "Hasan",
                age: 28
            },
            {
                name: "Kamil",
                age: 30
            },
            {
                name: "Seray",
                age: 30
            }
        ];
        let result = Order.asc("age")(data);
        chai.assert.equal(expected[0].age,result[0].age);
        chai.assert.equal(expected[1].age,result[1].age);
        chai.assert.equal(expected[2].age,result[2].age);
        chai.assert.equal(expected[3].age,result[3].age);
    });
    /** @test {api/Order#desc} **/
    it("asc", () => {
        let expected = [
            {
                name: "Kamil",
                age: 30
            },
            {
                name: "Seray",
                age: 30
            },
            {
                name: "Hasan",
                age: 28
            },
            {
                name: "Ertuğrul",
                age: 26
            }
        ];
        let result = Order.desc("age")(data);
        chai.assert.equal(expected[0].age,result[0].age);
        chai.assert.equal(expected[1].age,result[1].age);
        chai.assert.equal(expected[2].age,result[2].age);
        chai.assert.equal(expected[3].age,result[3].age);
    });
});
