import { Database } from 'sqlite3';
import * as path from 'path';

class DatabaseProvider {

  public static DATABASE_FILE: string = path.resolve('./app.db');
  public static SCRIPT_DIR: string = path.resolve('./src/database/scripts');
  
  private database: Database;

  public constructor() {}

  public openConnection(): void {
    console.log('Opening database connection...');
    this.database = new Database(DatabaseProvider.DATABASE_FILE, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Database connection opened.');
    });
  }

  public closeConnection(): void {
    console.log('Closing database connection.');
    this.database.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Database connection closed.');
    });
  }

  public getConnection(): Database {
    return this.database;
  }
}

export { DatabaseProvider };
