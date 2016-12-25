import Types from "./Types";
import { assert } from "chai";
describe("util/Types.ts", () => {
    it("isString", () => {
        assert.isOk(Types.isString("deneme"));
        assert.isNotOk(Types.isString(3));
        assert.isNotOk(Types.isString({}));
        assert.isNotOk(Types.isString(new Date()));
        assert.isNotOk(Types.isString(["example"]));
        assert.isNotOk(Types.isString(false));
    })
});
