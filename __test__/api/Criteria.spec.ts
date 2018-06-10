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

    it("addQuery", () => {
        const data: any = [
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

        const expectedData: any = [
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

        let criteria = new Criteria(data);
        criteria.addQuery({
            value: "o",
        });
        assert.deepEqual(expectedData, criteria.list().data);

        const data2: any = [
            {id: 1, name: "John", surname: "Doe"},
            {name: "Jane", surname: "Roe", id: 2},
        ];

        const expectedData2: any = [
            {id: 1, name: "John", surname: "Doe"},
            {id: 2, name: "Jane", surname: "Roe"},
        ];

        criteria = new Criteria(data2);
        criteria.addQuery({
            value: "J",
        });
        assert.deepEqual(expectedData2, criteria.list().data);
    });

});
