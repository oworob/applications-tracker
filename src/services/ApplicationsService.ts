import { dbPromise } from "db/main";
import { IApiApplication, IApplication } from "models/application";

export async function ApiGetApplications() {
  const db = await dbPromise;
  return db.getAll("applications");
}

export async function ApiGetApplication(id: number) {
  const db = await dbPromise;
  return db.get("applications", id);
}

export async function ApiAddApplication(application: IApplication) {
  const db = await dbPromise;
  return db.add("applications", application as IApiApplication);
}

export async function ApiUpdateApplication(application: IApiApplication) {
  const db = await dbPromise;
  return db.put("applications", application);
}

export async function ApiDeleteApplication(id: number) {
  const db = await dbPromise;
  return db.delete("applications", id);
}

export async function ApiClearAllApplications() {
  const db = await dbPromise;
  return db.clear("applications");
}
