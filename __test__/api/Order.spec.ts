import Order from "js-criteria/lib/api/Order";
import {assert} from "chai";

describe("api/Order", () => {
    it("asc", () => {
        const data = [
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
            },
            {
                name: "Chopper",
                age: 16
            }
        ];

        const expectedData = [
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
        assert.deepEqual(expectedData, Order.asc("name").sort(data));
    });

    it("desc", () => {
        const data = [
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
            },
            {
                name: "Chopper",
                age: 16
            }
        ];

        const expectedData = [
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
        assert.deepEqual(expectedData, Order.desc("name").sort(data));
    });
});
