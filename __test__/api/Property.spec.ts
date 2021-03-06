import Property from "js-criteria/lib/api/Property";
import {assert} from "chai";
import Predicates from "js-criteria/lib/api/Predicates";

describe("api/Property", () => {
    it("forName.op", () => {
        const data = {
            name: "Gol D Roger"
        };
        let restriction = Property.forName("name").op("===", "Gol D Roger");
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").op("!==", "Gol D Roger");
        assert.isNotOk(restriction.predicate(data));
    });

    it("forName.eq", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").eq("kamil");
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").eq("Kamil");
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").eq("Kamil", true);
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("name").eq("kamil", true);
        assert.isOk(restriction.predicate(data));
    });

    it("forName.lt", () => {
        const data = {
            name: 5
        };

        let restriction = Property.forName("name").lt(6);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").lt(5);
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("name").lt(4);
        assert.isNotOk(restriction.predicate(data));
    });

    it("forName.lte", () => {
        const data = {
            name: 5
        };

        let restriction = Property.forName("name").lte(6);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").lte(5);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").lte(4);
        assert.isNotOk(restriction.predicate(data));
    });

    it("forName.gt", () => {
        const data = {
            name: 5
        };

        let restriction = Property.forName("name").gt(4);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").gt(5);
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("name").gt(6);
        assert.isNotOk(restriction.predicate(data));
    });

    it("forName.gte", () => {
        const data = {
            name: 5
        };

        let restriction = Property.forName("name").gte(4);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").gte(5);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").gte(6);
        assert.isNotOk(restriction.predicate(data));
    });

    it("forName.between", () => {
        const data = {
            name: 5
        };

        let restriction = Property.forName("name").between(4, 6);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").between(4, 3);
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("name").between(6, 4);
        assert.isOk(restriction.predicate(data));
    });

    it("forName.startsWith", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").startsWith("ka");
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").startsWith("Ka");
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").startsWith("mi");
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("name").startsWith("ka", true);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").startsWith("Ka", true);
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("name").startsWith("mi", true);
        assert.isNotOk(restriction.predicate(data));
    });

    it("forName.endsWith", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").endsWith("il");
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").endsWith("IL");
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").endsWith("mi");
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("name").endsWith("il", true);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").endsWith("IL", true);
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("name").endsWith("MI", true);
        assert.isNotOk(restriction.predicate(data));
    });

    it("forName.like", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").like( "mi");
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").like("MI");
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").like("MI", true);
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("name").like("plapla");
        assert.isNotOk(restriction.predicate(data));
    });

    it("forName.in", () => {
        const data = {
            name: "Roger"
        };

        let restriction = Property.forName("name").in(["Roger", "Luffy", "Nami"]);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").in(["roger", "luffy", "nami"]);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").in(["Luffy", "Nami"]);
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("name").in(["Roger", "Luffy", "Nami"], true);
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("name").in(["roger", "luffy", "nami"], true);
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("name").in(["Luffy", "Nami"]);
        assert.isNotOk(restriction.predicate(data));

    });

    it("forName.isNull", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").isNull();
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("deneme").isNull();
        assert.isOk(restriction.predicate(data));

    });

    it("forName.isNotNull", () => {
        const data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").isNotNull();
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("deneme").isNotNull();
        assert.isNotOk(restriction.predicate(data));

    });

    it("forName.isEmpty", () => {
        const data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Property.forName("name").isEmpty();
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("deneme").isEmpty();
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("example").isEmpty();
        assert.isOk(restriction.predicate(data));

    });

    it("forName.isNotEmpty", () => {
        const data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Property.forName("name").isNotEmpty();
        assert.isOk(restriction.predicate(data));

        restriction = Property.forName("deneme").isNotEmpty();
        assert.isNotOk(restriction.predicate(data));

        restriction = Property.forName("example").isNotEmpty();
        assert.isNotOk(restriction.predicate(data));

    });
});
