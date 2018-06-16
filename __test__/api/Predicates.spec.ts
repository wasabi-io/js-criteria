import Predicates from "js-criteria/lib/api/Predicates";
import {assert} from "chai";

describe("api/Predicate", () => {
    it("op", () => {
        const data = {
            name: "Gol D Roger"
        };
        let restriction = Predicates.op("name", "===", "Gol D Roger");
        assert.isOk(restriction(data));

        restriction = Predicates.op("name", "!==", "Gol D Roger");
        assert.isNotOk(restriction(data));
    });

    it("isTrue", () => {
        let data: any = {
            name: true
        };

        let restriction = Predicates.isTrue("name");
        assert.isOk(restriction(data));
        data = {
            name: false
        };
        restriction = Predicates.isTrue("name");
        assert.isNotOk(restriction(data));
        data = {
            name: null
        };
        restriction = Predicates.isTrue("name");
        assert.isNotOk(restriction(data));
        data = {
            name: undefined
        };
        restriction = Predicates.isTrue("name");
        assert.isNotOk(restriction(data));

        data = {
            name: "something"
        };
        restriction = Predicates.isTrue("name");
        assert.isOk(restriction(data));
    });

    it("isFalse", () => {
        let data: any = {
            name: true
        };

        let restriction = Predicates.isFalse("name");
        assert.isNotOk(restriction(data));
        data = {
            name: false
        };
        restriction = Predicates.isFalse("name");
        assert.isOk(restriction(data));
        data = {
            name: null
        };
        restriction = Predicates.isFalse("name");
        assert.isOk(restriction(data));
        data = {
            name: undefined
        };
        restriction = Predicates.isFalse("name");
        assert.isOk(restriction(data));

        data = {
            name: "something"
        };
        restriction = Predicates.isFalse("name");
        assert.isNotOk(restriction(data));
    });

    it("eq", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Predicates.eq("name", "kamil");
        assert.isOk(restriction(data));

        restriction = Predicates.eq("name", "Kamil");
        assert.isOk(restriction(data));

        restriction = Predicates.eq("name", "Kamil", true);
        assert.isNotOk(restriction(data));

        restriction = Predicates.eq("name", "kamil", true);
        assert.isOk(restriction(data));
    });

    it("neq", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Predicates.neq("name", "kamil");
        assert.isNotOk(restriction(data));

        restriction = Predicates.neq("name", "Kamil");
        assert.isNotOk(restriction(data));

        restriction = Predicates.neq("name", "Kamil", true);
        assert.isOk(restriction(data));

        restriction = Predicates.neq("name", "kamil", true);
        assert.isNotOk(restriction(data));
    });

    it("lt", () => {
        const data = {
            name: 5
        };

        let restriction = Predicates.lt("name", 6);
        assert.isOk(restriction(data));

        restriction = Predicates.lt("name", 5);
        assert.isNotOk(restriction(data));

        restriction = Predicates.lt("name", 4);
        assert.isNotOk(restriction(data));
    });

    it("lte", () => {
        const data = {
            name: 5
        };

        let restriction = Predicates.lte("name", 6);
        assert.isOk(restriction(data));

        restriction = Predicates.lte("name", 5);
        assert.isOk(restriction(data));

        restriction = Predicates.lte("name", 4);
        assert.isNotOk(restriction(data));
    });

    it("gt", () => {
        const data = {
            name: 5
        };

        let restriction = Predicates.gt("name", 4);
        assert.isOk(restriction(data));

        restriction = Predicates.gt("name", 5);
        assert.isNotOk(restriction(data));

        restriction = Predicates.gt("name", 6);
        assert.isNotOk(restriction(data));
    });

    it("gte", () => {
        const data = {
            name: 5
        };

        let restriction = Predicates.gte("name", 4);
        assert.isOk(restriction(data));

        restriction = Predicates.gte("name", 5);
        assert.isOk(restriction(data));

        restriction = Predicates.gte("name", 6);
        assert.isNotOk(restriction(data));
    });

    it("between", () => {
        const data = {
            name: 5
        };

        let restriction = Predicates.between("name", 4, 6);
        assert.isOk(restriction(data));

        restriction = Predicates.between("name", 4, 3);
        assert.isNotOk(restriction(data));

        restriction = Predicates.between("name", 6, 4);
        assert.isOk(restriction(data));
    });

    it("startsWith", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Predicates.startsWith("name", "ka");
        assert.isOk(restriction(data));

        restriction = Predicates.startsWith("name", "Ka");
        assert.isOk(restriction(data));

        restriction = Predicates.startsWith("name", "mi");
        assert.isNotOk(restriction(data));

        restriction = Predicates.startsWith("name", "ka", true);
        assert.isOk(restriction(data));

        restriction = Predicates.startsWith("name", "Ka", true);
        assert.isNotOk(restriction(data));

        restriction = Predicates.startsWith("name", "mi", true);
        assert.isNotOk(restriction(data));
    });

    it("endsWith", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Predicates.endsWith("name", "il");
        assert.isOk(restriction(data));

        restriction = Predicates.endsWith("name", "IL");
        assert.isOk(restriction(data));

        restriction = Predicates.endsWith("name", "mi");
        assert.isNotOk(restriction(data));

        restriction = Predicates.endsWith("name", "il", true);
        assert.isOk(restriction(data));

        restriction = Predicates.endsWith("name", "IL", true);
        assert.isNotOk(restriction(data));

        restriction = Predicates.endsWith("name", "MI", true);
        assert.isNotOk(restriction(data));
    });

    it("contains", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Predicates.contains("name", "il");
        assert.isOk(restriction(data));

        restriction = Predicates.contains("name", "IL");
        assert.isOk(restriction(data));

        restriction = Predicates.contains("name", "mi");
        assert.isOk(restriction(data));

        restriction = Predicates.contains("name", "il", true);
        assert.isOk(restriction(data));

        restriction = Predicates.contains("name", "IL", true);
        assert.isNotOk(restriction(data));

        restriction = Predicates.contains("name", "MI", true);
        assert.isNotOk(restriction(data));

        restriction = Predicates.contains("name", "plapla");
        assert.isNotOk(restriction(data));
    });

    it("like", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Predicates.like("name", "%il");
        assert.isOk(restriction(data));

        restriction = Predicates.like("name", "%IL");
        assert.isOk(restriction(data));

        restriction = Predicates.like("name", "%mi%");
        assert.isOk(restriction(data));

        restriction = Predicates.like("name", "%il", true);
        assert.isOk(restriction(data));

        restriction = Predicates.like("name", "%IL", true);
        assert.isNotOk(restriction(data));

        restriction = Predicates.like("name", "%MI%", true);
        assert.isNotOk(restriction(data));

        restriction = Predicates.like("name", "%plapla%");
        assert.isNotOk(restriction(data));
    });

    it("in", () => {
        const data = {
            name: "Roger"
        };

        let restriction = Predicates.in("name", ["Roger", "Luffy", "Nami"]);
        assert.isOk(restriction(data));

        restriction = Predicates.in("name", ["roger", "luffy", "nami"]);
        assert.isOk(restriction(data));

        restriction = Predicates.in("name", ["Luffy", "Nami"]);
        assert.isNotOk(restriction(data));

        restriction = Predicates.in("name", ["Roger", "Luffy", "Nami"], true);
        assert.isOk(restriction(data));

        restriction = Predicates.in("name", ["roger", "luffy", "nami"], true);
        assert.isNotOk(restriction(data));

        restriction = Predicates.in("name", ["Luffy", "Nami"]);
        assert.isNotOk(restriction(data));

    });

    it("isNull", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Predicates.isNull("name");
        assert.isNotOk(restriction(data));

        restriction = Predicates.isNull("deneme");
        assert.isOk(restriction(data));

    });

    it("isNotNull", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Predicates.isNotNull("name");
        assert.isOk(restriction(data));

        restriction = Predicates.isNotNull("deneme");
        assert.isNotOk(restriction(data));

    });

    it("isEmpty", () => {
        const data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Predicates.isEmpty("name");
        assert.isNotOk(restriction(data));

        restriction = Predicates.isEmpty("deneme");
        assert.isOk(restriction(data));

        restriction = Predicates.isEmpty("example");
        assert.isOk(restriction(data));

    });

    it("isNotEmpty", () => {
        const data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Predicates.isNotEmpty("name");
        assert.isOk(restriction(data));

        restriction = Predicates.isNotEmpty("deneme");
        assert.isNotOk(restriction(data));

        restriction = Predicates.isNotEmpty("example");
        assert.isNotOk(restriction(data));

    });

    it("or", () => {
        const data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Predicates.or(
            Predicates.isNotNull("name"),
            Predicates.eq("name", "kamil"),
            Predicates.isNotEmpty("name")
        );
        assert.isOk(restriction(data));

        restriction = Predicates.or(
            Predicates.isNull("name"),
            Predicates.eq("name", "kamil")
        );
        assert.isOk(restriction(data));

        restriction = Predicates.or(
            Predicates.isNull("name"),
            Predicates.isEmpty("name")
        );
        assert.isNotOk(restriction(data));

    });

    it("and", () => {
        const data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Predicates.and(
            Predicates.isNotNull("name"),
            Predicates.eq("name", "kamil"),
            Predicates.isNotEmpty("name")
        );
        assert.isOk(restriction(data));

        restriction = Predicates.and(
            Predicates.isNull("name"),
            Predicates.eq("name", "kamil")
        );
        assert.isNotOk(restriction(data));

        restriction = Predicates.and(
            Predicates.isNull("name"),
            Predicates.isEmpty("name")
        );
        assert.isNotOk(restriction(data));

    });
});
