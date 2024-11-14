// PersistenceService.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SaveToLocalStorage, LoadFromLocalStorage } from "./PersistenceService";

describe("PersistenceService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should save data to localStorage", () => {
    const key = "test_key";
    const value = "test_data";
    const SetItemMock = vi.spyOn(Storage.prototype, "setItem");
    SaveToLocalStorage(key, value);
    expect(SetItemMock).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it("should load data from localStorage", () => {
    const key = "test_key";
    const value = { data: "test_data" };
    const GetItemMock = vi.spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(value));
    const result = LoadFromLocalStorage(key);
    expect(GetItemMock).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  it("should return null if key does not exist in localStorage", () => {
    const key = "test_key_without_value";
    const GetItemMock = vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
    const result = LoadFromLocalStorage(key);
    expect(GetItemMock).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });
});
