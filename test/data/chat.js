// import { describe } from "node:test";
import { chats } from "../../data/chats.js";

import { it } from "node:test";

describe("Test Suit: chat data", () => {
    it("Save to localStorage", () => {
        spyOn(localStorage, "setItem");
    });
});
