import "@testing-library/jest-dom";
require("fake-indexeddb/auto");

import { configure } from "@testing-library/dom";
configure({ testIdAttribute: "id" });
