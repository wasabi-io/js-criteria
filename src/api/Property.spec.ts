import Property from "./Property";
import { assert } from "chai";

describe("criteria/Property.ts", () => {
    it("forName.op", () => {
        let data = {
            name: "Gol D Roger"
        };
        let restriction = Property.forName("name").op("===", "Gol D Roger");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").op("!==", "Gol D Roger");
        assert.isNotOk(restriction(data));
    });

    it("forName.eq", () => {
        let data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").eq("kamil");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").eq("Kamil");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").eq("Kamil", true);
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").eq("kamil", true);
        assert.isOk(restriction(data));
    });

    it("forName.lt", () => {
        let data = {
            name: 5
        };

        let restriction =Property.forName("name").lt(6);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").lt(5);
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").lt(4);
        assert.isNotOk(restriction(data));
    });

    it("forName.lte", () => {
        let data = {
            name: 5
        };

        let restriction = Property.forName("name").lte(6);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").lte(5);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").lte(4);
        assert.isNotOk(restriction(data));
    });

    it("forName.gt", () => {
        let data = {
            name: 5
        };

        let restriction = Property.forName("name").gt(4);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").gt(5);
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").gt(6);
        assert.isNotOk(restriction(data));
    });

    it("forName.gte", () => {
        let data = {
            name: 5
        };

        let restriction = Property.forName("name").gte(4);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").gte(5);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").gte(6);
        assert.isNotOk(restriction(data));
    });

    it("forName.between", () => {
        let data = {
            name: 5
        };

        let restriction = Property.forName("name").between(4, 6);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").between(4, 3);
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").between(6, 4 );
        assert.isOk(restriction(data));
    });

    it("forName.startsWith", () => {
        let data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").startsWith("ka");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").startsWith("Ka");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").startsWith("mi");
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").startsWith("ka", true);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").startsWith("Ka", true);
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").startsWith("mi", true);
        assert.isNotOk(restriction(data));
    });

    it("forName.endsWith", () => {
        let data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").endsWith("il");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").endsWith("IL");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").endsWith("mi");
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").endsWith("il", true);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").endsWith("IL", true);
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").endsWith("MI", true);
        assert.isNotOk(restriction(data));
    });

    it("forName.contains", () => {
        let data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").contains("il");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").contains("IL");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").contains("mi");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").contains("il", true);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").contains("IL", true);
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").contains("MI", true);
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").contains("plapla");
        assert.isNotOk(restriction(data));
    });


    it("forName.like", () => {
        let data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").like("%il");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").like("%IL");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").like("%mi%");
        assert.isOk(restriction(data));

        restriction = Property.forName("name").like("%il", true);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").like("%IL", true);
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").like("%MI%", true);
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").like("%plapla%");
        assert.isNotOk(restriction(data));
    });


    it("forName.in", () => {
        let data = {
            name: "Roger"
        };

        let restriction = Property.forName("name").in(["Roger", "Luffy", "Nami"]);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").in(["roger", "luffy", "nami"]);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").in(["Luffy", "Nami"]);
        assert.isNotOk(restriction(data));


        restriction = Property.forName("name").in(["Roger", "Luffy", "Nami"], true);
        assert.isOk(restriction(data));

        restriction = Property.forName("name").in(["roger", "luffy", "nami"], true);
        assert.isNotOk(restriction(data));

        restriction = Property.forName("name").in(["Luffy", "Nami"]);
        assert.isNotOk(restriction(data));

    });

    it("forName.isNull", () => {
        let data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").isNull();
        assert.isNotOk(restriction(data));

        restriction = Property.forName("deneme").isNull();
        assert.isOk(restriction(data));

    });

    it("forName.isNotNull", () => {
        let data = {
            name: "kamil"
        };

        let restriction = Property.forName("name").isNotNull();
        assert.isOk(restriction(data));

        restriction = Property.forName("deneme").isNotNull();
        assert.isNotOk(restriction(data));

    });

    it("forName.isEmpty", () => {
        let data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Property.forName("name").isEmpty();
        assert.isNotOk(restriction(data));

        restriction = Property.forName("deneme").isEmpty();
        assert.isOk(restriction(data));

        restriction = Property.forName("example").isEmpty();
        assert.isOk(restriction(data));

    });


    it("forName.isNotEmpty", () => {
        let data = {
            name: "kamil",
            deneme: ""
        };

        let restriction = Property.forName("name").isNotEmpty();
        assert.isOk(restriction(data));

        restriction = Property.forName("deneme").isNotEmpty();
        assert.isNotOk(restriction(data));

        restriction = Property.forName("example").isNotEmpty();
        assert.isNotOk(restriction(data));

    });

});
