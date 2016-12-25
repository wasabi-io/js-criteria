import Restrictions from "./Restrictions";
import { assert } from "chai";
import Criteria from "./Criteria";
import Order from "./Order";

describe("criteria/Criteria.ts", () => {
    it("add", () => {
        let data = [
            {
                name: "Nami",
                age: 16
            },
            {
                name: "Monkey D. Luffy",
                age: 16
            },
            {
                name: "Gol D. Roger",
                age: 32
            },
            {
                name: "Chopper",
                age: 16
            }
        ];

        let expectedData = [
            {
                name: "Gol D. Roger",
                age: 32
            }
        ];

        let criteria = new Criteria(data);
        criteria.add(Restrictions.eq("name", "Gol D. Roger"));
        assert.deepEqual(expectedData, criteria.list());

        criteria.add(Restrictions.eq("age", 32));
        assert.deepEqual(expectedData, criteria.list());

        criteria.add(Restrictions.eq("age", 16));
        assert.deepEqual([], criteria.list());
    });

    it("addOrder", () => {
        let data = [
            {
                name: "Nami",
                age: 16
            },
            {
                name: "Monkey D. Luffy",
                age: 16
            },
            {
                name: "Gol D. Roger",
                age: 32
            },
            {
                name: "Chopper",
                age: 16
            }
        ];

        let expectedData = [
            {
                name: "Chopper",
                age: 16
            },
            {
                name: "Gol D. Roger",
                age: 32
            },
            {
                name: "Monkey D. Luffy",
                age: 16
            },
            {
                name: "Nami",
                age: 16
            }
        ];

        let criteria = new Criteria(data);
        criteria.addOrder(Order.asc("name"));
        assert.deepEqual(expectedData, criteria.list());
    });

});
