import { describe, it, expect, vi, beforeEach } from "vitest";
import { ApiGetApplications, ApiGetApplication, ApiAddApplication, ApiUpdateApplication, ApiDeleteApplication, ApiClearAllApplications } from "./ApplicationsService";
import { dbPromise } from "db/db";
import { TestIApiApplications, TestIApplications } from "assets/test-data/TestApplications";

vi.mock("db/db", () => ({
  dbPromise: Promise.resolve({
    getAll: vi.fn(),
    get: vi.fn(),
    add: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    clear: vi.fn(),
  }),
}));

describe("ApplicationsService", () => {
  let DBMock: any;

  beforeEach(async () => {
    DBMock = await dbPromise;
  });

  it("should get all applications", async () => {
    const ApplicationsMock = TestIApiApplications;
    DBMock.getAll.mockResolvedValue(ApplicationsMock);
    const applications = await ApiGetApplications();
    expect(applications).toEqual(ApplicationsMock);
    expect(DBMock.getAll).toHaveBeenCalledWith("applications");
  });

  it("should get application by id", async () => {
    const ApplicationsMock = TestIApiApplications;
    DBMock.get.mockResolvedValue(ApplicationsMock[0]);
    const application = await ApiGetApplication(1);
    expect(application).toEqual(ApplicationsMock[0]);
    expect(DBMock.get).toHaveBeenCalledWith("applications", 1);
  });

  it("should add new application", async () => {
    const ApplicationMock = TestIApplications[0];
    DBMock.add.mockResolvedValue(ApplicationMock);

    const result = await ApiAddApplication(ApplicationMock);
    expect(result).toEqual(ApplicationMock);
    expect(DBMock.add).toHaveBeenCalledWith("applications", ApplicationMock);
  });

  it("should update application", async () => {
    const ApplicationMock = TestIApiApplications[0];
    DBMock.put.mockResolvedValue(ApplicationMock);

    await ApiUpdateApplication(ApplicationMock);
    expect(DBMock.put).toHaveBeenCalledWith("applications", ApplicationMock);
  });

  it("should delete application", async () => {
    DBMock.delete.mockResolvedValue(undefined);

    await ApiDeleteApplication(1);
    expect(DBMock.delete).toHaveBeenCalledWith("applications", 1);
  });

  it("should clear all applications", async () => {
    DBMock.clear.mockResolvedValue(undefined);

    await ApiClearAllApplications();
    expect(DBMock.clear).toHaveBeenCalledWith("applications");
  });
});
