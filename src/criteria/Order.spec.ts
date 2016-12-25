import Order from "./Order";
import { assert } from "chai";

describe("criteria/Order.ts", () => {
    it("asc", () => {
        let data = [
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
        assert.deepEqual(expectedData, Order.asc("name")(data));
    });

    it("desc", () => {
        let data = [
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

        let expectedData = [
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
        assert.deepEqual(expectedData, Order.desc("name")(data));
    });
});
