import Criteria from "api/Criteria";
import Restrictions from "api/Restrictions";
import Order from "api/Order";

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

/** @test {api/Criteria} **/
describe("api/Criteria.js", () => {
    /** @test {api/Criteria#constructors} */
    it("constructors", () => {
        const criteria = new Criteria(data);
        chai.assert.equal(criteria.getFirstResult(), 0);
        chai.assert.equal(criteria.getMaxResult(), data.length);
        chai.assert.deepEqual(criteria.getRestrictions(), []);
    });
});
