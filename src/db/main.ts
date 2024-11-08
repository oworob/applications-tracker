import { openDB, DBSchema, IDBPDatabase } from "idb";
import { IApiApplication, IApplication } from "models/application";

interface AppDB extends DBSchema {
  applications: {
    key: number;
    value: IApiApplication;
  };
  questions: {
    key: number;
    value: any;
  };
}

export const dbPromise: Promise<IDBPDatabase<AppDB>> = openDB<AppDB>("app-db", 1, {
  upgrade(db) {
    db.createObjectStore("applications", { keyPath: "id", autoIncrement: true });
    db.createObjectStore("questions", { keyPath: "id", autoIncrement: true });
  },
});
