import { DatabaseProvider, Point } from '..';
import { Database } from 'sqlite3';
import * as path from 'path';
import * as fs from 'fs';
import { DatabaseManager } from '../DatabaseManager';

class DAOPoint {

  private static TABLE_NAME: string = 'Point';
  private static SCRIPT_TABLE: string = 'point.sql';

  private static createTable(): void {
    console.log('Creating "Point" table...');
    const sqlQueries: string = fs.readFileSync(path.resolve(DatabaseProvider.SCRIPT_DIR, this.SCRIPT_TABLE)).toString();
    console.log('sqlQueries=', sqlQueries);
    const database: Database = DatabaseProvider.getConnection();
    database.run(sqlQueries, [], (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Table "Point" created.');
    });
    DatabaseProvider.closeConnection();
  }

  private static createTableIfNotExists(): void {
    this.isTableExists((isExists: boolean) => {
      if (isExists) {
        this.createTable();
      }
    });
  }

  private static isTableExists(callback: (isExists: boolean) => void): void {
    DatabaseManager.isTableExists(this.TABLE_NAME, callback);
  }

  public static read(userId: string, callback: (point: Point) => void): void {
    this.createTableIfNotExists();
    const database: Database = DatabaseProvider.getConnection();
    database.get('SELECT * FROM Point WHERE userId = $userId', {
      $userId: userId
    }, (err: Error, row: any) => {
      if (err) {
        console.error(err.message);
      }
      let number: number = 0;
      if (row) {
        number = row.number;
      } else {

      }
      let point: Point = new Point(userId, row.number);
      callback(point);
    });
    DatabaseProvider.closeConnection();
  }

  public static insert(userId: string): void {
    this.createTableIfNotExists();
    const database: Database = DatabaseProvider.getConnection();
    database.run('INSERT INTO Point(userId) VALUES($userId)', {
      $userId: userId
    });
    DatabaseProvider.closeConnection();
  }

  public static update(point: Point): void {
    this.createTableIfNotExists();
    const database: Database = DatabaseProvider.getConnection();
    database.run('UPDATE Point SET number = $number WHERE userId = $userId', {
      $userId: point.getUserId(),
      $number: point.getNumber()
    });
    DatabaseProvider.closeConnection();
  }

  public static delete(userId: string): void {
    this.createTableIfNotExists();
    const database: Database = DatabaseProvider.getConnection();
    database.run('UPDATE FROM Point WHERE userId = $userId', {
      $userId: userId
    });
    DatabaseProvider.closeConnection();
  }
}

export { DAOPoint };
