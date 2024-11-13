import "@testing-library/jest-dom";
import { configure } from "@testing-library/dom";
import "fake-indexeddb/auto";

configure({ testIdAttribute: "id" });
