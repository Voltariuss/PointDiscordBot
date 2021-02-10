import { Database } from 'sqlite3';
import * as path from 'path';

class DatabaseProvider {

  public static DATABASE_FILE: string = path.resolve(__dirname, 'app.db');
  public static SCRIPT_DIR: string = path.resolve(__dirname, '/database/scripts');

  private static database: Database;

  public static openConnection(): void {
    console.log('Opening database connection...');
    this.database = new Database(this.DATABASE_FILE, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Database connection opened.');
    });
    this.database.serialize();
  }

  public static closeConnection(): void {
    console.log('Closing database connection.');
    this.database.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Database connection closed.');
    });
  }

  public static getConnection(): Database {
    this.openConnection();
    return this.database;
  }
}

export { DatabaseProvider };
