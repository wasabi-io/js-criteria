import {assert} from "chai";
import Criteria from "js-criteria/lib/api/Criteria";
import Order from "js-criteria/lib/api/Order";
import Restrictions from "js-criteria/lib/api/Restrictions";

describe("api/Criteria", () => {
    it("add", () => {
        const data = [
            {
                name: "Nami",
                age: 16,
            },
            {
                name: "Monkey D. Luffy",
                age: 16,
            },
            {
                name: "Gol D. Roger",
                age: 32,
            },
            {
                name: "Chopper",
                age: 16,
            },
        ];

        const expectedData = [
            {
                name: "Gol D. Roger",
                age: 32,
            },
        ];

        const criteria = new Criteria(data);
        criteria.add(Restrictions.eq("name", "Gol D. Roger"));
        assert.deepEqual(expectedData, criteria.list().data);

        criteria.add(Restrictions.eq("age", 32));
        assert.deepEqual(expectedData, criteria.list().data);

        criteria.add(Restrictions.eq("age", 16));
        assert.deepEqual([], criteria.list().data);
    });

    it("addOrder", () => {
        const data = [
            {
                name: "Nami",
                age: 16,
            },
            {
                name: "Monkey D. Luffy",
                age: 16,
            },
            {
                name: "Gol D. Roger",
                age: 32,
            },
            {
                name: "Chopper",
                age: 16,
            },
        ];

        const expectedData = [
            {
                name: "Chopper",
                age: 16,
            },
            {
                name: "Gol D. Roger",
                age: 32,
            },
            {
                name: "Monkey D. Luffy",
                age: 16,
            },
            {
                name: "Nami",
                age: 16,
            },
        ];

        const criteria = new Criteria(data);
        criteria.addOrder(Order.asc("name"));
        assert.deepEqual(expectedData, criteria.list().data);
    });

    it("clear", () => {
        const data = [
            {
                name: "Nami",
                age: 16,
            },
            {
                name: "Monkey D. Luffy",
                age: 16,
            },
            {
                name: "Gol D. Roger",
                age: 32,
            },
            {
                name: "Chopper",
                age: 16,
            },
        ];

        const criteria = new Criteria(data);
        criteria.add(Restrictions.eq("name", "Gol D. Roger"));
        criteria.addOrder(Order.asc("name"));
        criteria.clear();
        assert.deepEqual(data, criteria.list().data);
    });
});
