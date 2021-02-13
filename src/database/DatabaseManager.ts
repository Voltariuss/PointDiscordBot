import { Database } from 'sqlite3';
import * as _ from 'lodash';

class DatabaseManager {

  public static isTableExists(database: Database, tableName: string, callback: (isExists: boolean) => void): void {
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
