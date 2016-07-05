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
    }
];

describe("Order.js", () => {
    it("asc", () => {
        let expected = [
            {
                id: "1",
                name: "Luffy",
                surname: "Monkey D."
            },
            {
                id: "3",
                name: "Nami",
                surname: ""
            },
            {
                id: "2",
                name: "Zoro",
                surname: "Roronoa"
            }
        ];
        let sorterFunction = Order.asc("name");
        chai.assert.deepEqual(sorterFunction(data), expected);
    });

    it("desc", () => {
        let expected = [
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
                id: "1",
                name: "Luffy",
                surname: "Monkey D."
            },
        ];
        let sorterFunction = Order.desc("name");
        chai.assert.deepEqual(sorterFunction(data), expected);
    });
});
