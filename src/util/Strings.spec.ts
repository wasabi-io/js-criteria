import Strings from "./Strings";
import { assert } from "chai";

describe("util/Strings.ts", () => {
    it("startWith", () => {
        assert.isOk(Strings.startsWith("Gol D. Roger", "Gol"));
        assert.isNotOk(Strings.startsWith("gol D. Roger", "Gol"));
    });

    it("endsWith", () => {
        assert.isOk(Strings.endsWith("Gol D. Roger", "er"));
        assert.isNotOk(Strings.endsWith("gol D. Roger", "Er"));
    })
});
