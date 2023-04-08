import path from "path";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { app } from 'electron';


// check either for dev or prod environment
const isComplied = path.extname(__filename).includes("js");

const appDataPath = app.getPath('appData');

const appPath = path.join(appDataPath, 'logset-app');
console.log('the app Path is ', appDataPath);

const appLocalDatabasePath = path.join(appPath, 'demo.db');
console.log('the appLocalDatabase Path is ', appLocalDatabasePath)

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: appLocalDatabasePath,
  synchronize: true,  // MUST set 'false' for production, instead run migration to update.
  logging: true,
  logger: "advanced-console",
  entities: [User],
  migrations: [`src/migrations/**/*.${isComplied ? "js" : "ts"}`],
  // subscribers: [],
});

export const dbConnection = async () => {
  // to initialize initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  try {
    await AppDataSource.initialize();
    console.log("Database is connected successfully");
  } catch (error) {
    console.log("Unable to connect database", error);
  }
};
