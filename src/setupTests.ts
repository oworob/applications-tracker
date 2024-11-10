import "@testing-library/jest-dom";
import { configure } from "@testing-library/dom";

require("fake-indexeddb/auto");

configure({ testIdAttribute: "id" });
