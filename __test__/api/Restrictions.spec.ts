import Restrictions from "js-criteria/lib/api/Restrictions";
import {assert} from "chai";

describe("api/Restriction", () => {
    it("op", () => {
        const data = {
            name: "Gol D Roger"
        };
        let restriction = Restrictions.op("name", "===", "Gol D Roger");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("===", restriction.op);

        restriction = Restrictions.op("name", "!==", "Gol D Roger");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("!==", restriction.op);
    });

    it("isTrue", () => {
        let data: any = {
            name: true
        };

        let restriction = Restrictions.isTrue("name");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isTrue", restriction.op);
        data = {
            name: false
        };
        restriction = Restrictions.isTrue("name");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isTrue", restriction.op);
        data = {
            name: null
        };
        restriction = Restrictions.isTrue("name");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isTrue", restriction.op);
        data = {
            name: undefined
        };
        restriction = Restrictions.isTrue("name");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isTrue", restriction.op);

        data = {
            name: "something"
        };
        restriction = Restrictions.isTrue("name");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isTrue", restriction.op);
    });

    it("isFalse", () => {
        let data: any = {
            name: true
        };

        let restriction = Restrictions.isFalse("name");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isFalse", restriction.op);
        data = {
            name: false
        };
        restriction = Restrictions.isFalse("name");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isFalse", restriction.op);
        data = {
            name: null
        };
        restriction = Restrictions.isFalse("name");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isFalse", restriction.op);
        data = {
            name: undefined
        };
        restriction = Restrictions.isFalse("name");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isFalse", restriction.op);

        data = {
            name: "something"
        };
        restriction = Restrictions.isFalse("name");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isFalse", restriction.op);
    });

    it("eq", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Restrictions.eq("name", "kamil");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("eq", restriction.op);

        restriction = Restrictions.eq("name", "Kamil");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("eq", restriction.op);

        restriction = Restrictions.eq("name", "Kamil", true);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("eq", restriction.op);

        restriction = Restrictions.eq("name", "kamil", true);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("eq", restriction.op);
    });

    it("neq", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Restrictions.neq("name", "kamil");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("neq", restriction.op);

        restriction = Restrictions.neq("name", "Kamil");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("neq", restriction.op);

        restriction = Restrictions.neq("name", "Kamil", true);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("neq", restriction.op);

        restriction = Restrictions.neq("name", "kamil", true);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("neq", restriction.op);
    });

    it("lt", () => {
        const data = {
            name: 5
        };

        let restriction = Restrictions.lt("name", 6);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("lt", restriction.op);

        restriction = Restrictions.lt("name", 5);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("lt", restriction.op);

        restriction = Restrictions.lt("name", 4);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("lt", restriction.op);
    });

    it("lte", () => {
        const data = {
            name: 5
        };

        let restriction = Restrictions.lte("name", 6);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("lte", restriction.op);

        restriction = Restrictions.lte("name", 5);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("lte", restriction.op);

        restriction = Restrictions.lte("name", 4);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("lte", restriction.op);
    });

    it("gt", () => {
        const data = {
            name: 5
        };

        let restriction = Restrictions.gt("name", 4);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("gt", restriction.op);

        restriction = Restrictions.gt("name", 5);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("gt", restriction.op);

        restriction = Restrictions.gt("name", 6);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("gt", restriction.op);

    });

    it("gte", () => {
        const data = {
            name: 5
        };

        let restriction = Restrictions.gte("name", 4);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("gte", restriction.op);

        restriction = Restrictions.gte("name", 5);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("gte", restriction.op);

        restriction = Restrictions.gte("name", 6);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("gte", restriction.op);
    });

    it("between", () => {
        const data = {
            name: 5
        };

        let restriction = Restrictions.between("name", 4, 6);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("between", restriction.op);

        restriction = Restrictions.between("name", 4, 3);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("between", restriction.op);

        restriction = Restrictions.between("name", 6, 4);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("between", restriction.op);
    });

    it("startsWith", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Restrictions.startsWith("name", "ka");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("startsWith", restriction.op);

        restriction = Restrictions.startsWith("name", "Ka");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("startsWith", restriction.op);

        restriction = Restrictions.startsWith("name", "mi");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("startsWith", restriction.op);

        restriction = Restrictions.startsWith("name", "ka", true);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("startsWith", restriction.op);

        restriction = Restrictions.startsWith("name", "Ka", true);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("startsWith", restriction.op);

        restriction = Restrictions.startsWith("name", "mi", true);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("startsWith", restriction.op);
    });

    it("endsWith", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Restrictions.endsWith("name", "il");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("endsWith", restriction.op);

        restriction = Restrictions.endsWith("name", "IL");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("endsWith", restriction.op);

        restriction = Restrictions.endsWith("name", "mi");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("endsWith", restriction.op);

        restriction = Restrictions.endsWith("name", "il", true);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("endsWith", restriction.op);

        restriction = Restrictions.endsWith("name", "IL", true);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("endsWith", restriction.op);

        restriction = Restrictions.endsWith("name", "MI", true);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("endsWith", restriction.op);
    });

    it("like", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Restrictions.like("name", "mi");
        assert.isOk(restriction.predicate(data));

        restriction = Restrictions.like("name", "MI");
        assert.isOk(restriction.predicate(data));

        restriction = Restrictions.like("name", "MI", true);
        assert.isNotOk(restriction.predicate(data));

        restriction = Restrictions.like("name", "plapla");
        assert.isNotOk(restriction.predicate(data));
    });

    it("in", () => {
        const data = {
            name: "Roger"
        };

        let restriction = Restrictions.in("name", ["Roger", "Luffy", "Nami"]);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("in", restriction.op);

        restriction = Restrictions.in("name", ["roger", "luffy", "nami"]);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("in", restriction.op);

        restriction = Restrictions.in("name", ["Luffy", "Nami"]);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("in", restriction.op);

        restriction = Restrictions.in("name", ["Roger", "Luffy", "Nami"], true);
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("in", restriction.op);

        restriction = Restrictions.in("name", ["roger", "luffy", "nami"], true);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("in", restriction.op);

        restriction = Restrictions.in("name", ["Luffy", "Nami"]);
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("in", restriction.op);

    });

    it("isNull", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Restrictions.isNull("name");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isNull", restriction.op);

        restriction = Restrictions.isNull("deneme");
        assert.isOk(restriction.predicate(data));
        assert.equal("deneme", restriction.key);
        assert.equal("isNull", restriction.op);

    });

    it("isNotNull", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Restrictions.isNotNull("name");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isNotNull", restriction.op);

        restriction = Restrictions.isNotNull("deneme");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("deneme", restriction.key);
        assert.equal("isNotNull", restriction.op);
    });

    it("isEmpty", () => {
        const data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Restrictions.isEmpty("name");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isEmpty", restriction.op);

        restriction = Restrictions.isEmpty("deneme");
        assert.isOk(restriction.predicate(data));
        assert.equal("deneme", restriction.key);
        assert.equal("isEmpty", restriction.op);

        restriction = Restrictions.isEmpty("example");
        assert.isOk(restriction.predicate(data));
        assert.equal("example", restriction.key);
        assert.equal("isEmpty", restriction.op);

    });

    it("isNotEmpty", () => {
        const data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Restrictions.isNotEmpty("name");
        assert.isOk(restriction.predicate(data));
        assert.equal("name", restriction.key);
        assert.equal("isNotEmpty", restriction.op);

        restriction = Restrictions.isNotEmpty("deneme");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("deneme", restriction.key);
        assert.equal("isNotEmpty", restriction.op);

        restriction = Restrictions.isNotEmpty("example");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("example", restriction.key);
        assert.equal("isNotEmpty", restriction.op);

    });

    it("query", () => {
        const data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Restrictions.query("kamil");
        assert.isOk(restriction.predicate(data));
        assert.equal("", restriction.key);
        assert.equal("query", restriction.op);

        restriction = Restrictions.query("deneme");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("", restriction.key);
        assert.equal("query", restriction.op);

        restriction = Restrictions.query("example");
        assert.isNotOk(restriction.predicate(data));
        assert.equal("", restriction.key);
        assert.equal("query", restriction.op);

    });

    it("or", () => {
        const data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Restrictions.or(
            Restrictions.isNotNull("name"),
            Restrictions.eq("name", "kamil"),
            Restrictions.isNotEmpty("name")
        );
        assert.isOk(restriction.predicate(data));
        assert.equal("name:isNotNull-name:eq-name:isNotEmpty", restriction.key);
        assert.equal("or", restriction.op);

        restriction = Restrictions.or(
            Restrictions.isNull("name"),
            Restrictions.eq("name", "kamil")
        );
        assert.isOk(restriction.predicate(data));
        assert.equal("name:isNull-name:eq", restriction.key);
        assert.equal("or", restriction.op);

        restriction = Restrictions.or(
            Restrictions.isNull("name"),
            Restrictions.isEmpty("name")
        );
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name:isNull-name:isEmpty", restriction.key);
        assert.equal("or", restriction.op);

    });

    it("and", () => {
        const data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Restrictions.and(
            Restrictions.isNotNull("name"),
            Restrictions.eq("name", "kamil"),
            Restrictions.isNotEmpty("name")
        );
        assert.isOk(restriction.predicate(data));
        assert.equal("name:isNotNull-name:eq-name:isNotEmpty", restriction.key);
        assert.equal("and", restriction.op);

        restriction = Restrictions.and(
            Restrictions.isNull("name"),
            Restrictions.eq("name", "kamil")
        );
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name:isNull-name:eq", restriction.key);
        assert.equal("and", restriction.op);

        restriction = Restrictions.and(
            Restrictions.isNull("name"),
            Restrictions.isEmpty("name")
        );
        assert.isNotOk(restriction.predicate(data));
        assert.equal("name:isNull-name:isEmpty", restriction.key);
        assert.equal("and", restriction.op);

    });
});
