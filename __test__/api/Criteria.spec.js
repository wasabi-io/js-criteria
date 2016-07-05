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


describe("Criteria.js", () => {
    it("constructors", () => {
        const criteria = new Criteria(data);
        chai.assert.equal(criteria.getFirstResult(), 0);
        chai.assert.equal(criteria.getMaxResult(), data.length);
        chai.assert.deepEqual(criteria.getRestrictions(), []);
    });

    it("add", () => {
       let expectedResult = [
           {
               id: "5",
               name: "Sanji",
               surname: ""
           },
           {
               id: "8",
               name: "Franky",
               surname: ""
           }
        ];
        const criteria = new Criteria(data);
        criteria.add(Restrictions.gt("id", 2));
        criteria.add(Restrictions.__like("name", "%an%"));
        chai.assert.deepEqual(criteria.list(), expectedResult);
    });

    it("addOrder", () => {
        let expectedResult = [
            {
                id: "8",
                name: "Franky",
                surname: ""
            },
            {
                id: "5",
                name: "Sanji",
                surname: ""
            }
        ];
        const criteria = new Criteria(data);
        criteria.add(Restrictions.gt("id", 2));
        criteria.add(Restrictions.__like("name", "%an%"));
        criteria.addOrder(Order.asc("name"));
        chai.assert.deepEqual(criteria.list(), expectedResult);

        expectedResult = [
            {
                id: "5",
                name: "Sanji",
                surname: ""
            },
            {
                id: "8",
                name: "Franky",
                surname: ""
            }
        ];

        criteria.addOrder(Order.asc("id"));
        chai.assert.deepEqual(criteria.list(), expectedResult);
    });

    it("setFirstResult", () => {
        let expectedResult = [
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
        const criteria = new Criteria(data);
        criteria.setFirstResult(7);

        chai.assert.deepEqual(criteria.list(), expectedResult);
    });

    it("setMaxResults", () => {
        let expectedResult = [
            {
                id: "5",
                name: "Sanji",
                surname: ""
            },
            {
                id: "8",
                name: "Franky",
                surname: ""
            }
        ];
        const criteria = new Criteria(data);
        criteria.add(Restrictions.like("name", "%a%"));
        criteria.setFirstResult(2);
        criteria.setMaxResults(3);
        chai.assert.deepEqual(criteria.list(), expectedResult);
    });

    it("list", () => {
        let expectedResult = [
            {
                id: "3",
                name: "Nami",
                surname: ""
            },
            {
                id: "5",
                name: "Sanji",
                surname: ""
            },
            {
                id: "8",
                name: "Franky",
                surname: ""
            }
        ];
        const criteria = new Criteria(data);
        criteria.add(Restrictions.like("name", "%a%"));
        criteria.add(Restrictions.gt("id", 1));
        criteria.setMaxResults(3);
        chai.assert.deepEqual(criteria.list(), expectedResult);
    });
});
