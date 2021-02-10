import { DatabaseProvider } from "./DatabaseProvider";
import { Database } from 'sqlite3';
import * as _ from 'lodash';

class DatabaseManager {

  public static isTableExists(tableName: string, callback: (isExists: boolean) => void): void {
    const database: Database = DatabaseProvider.getConnection();
    database.get('SELECT name FROM sqlite_master WHERE type=$type AND name=$name', {
      $type: 'table',
      $name: tableName
    }, (err: Error, row: any) => {
      if (err) {
        return console.error(err.message);
      }
      const isExists: boolean = !_.isEmpty(row);
      callback(isExists);
    });
  }
}

export { DatabaseManager };
