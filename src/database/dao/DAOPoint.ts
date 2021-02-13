import { DatabaseProvider, Point } from '..';
import { Database } from 'sqlite3';
import * as path from 'path';
import * as fs from 'fs';

class DAOPoint {

  private static TABLE_NAME: string = 'Point';
  private static SCRIPT_TABLE: string = 'point.sql';

  private static createTable(database: Database): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      console.log(`Creating "${this.TABLE_NAME}" table if not exists...`);
      const sqlQueries: string = fs.readFileSync(path.resolve(DatabaseProvider.SCRIPT_DIR, this.SCRIPT_TABLE)).toString();
      database.run(sqlQueries, (err: Error) => {
        if (err) {
          console.error(`Failed to create "${this.TABLE_NAME}" table.`);
          reject(err);
        }
        console.log(`Table "${this.TABLE_NAME}" created if not existing.`);
        resolve();
      });
    });
  }

  public static isExists(database: Database, userId: string): Promise<boolean> {
    return new Promise((resolve: (value: boolean) => void, reject: (reason: Error) => void) => {
      database.get(`SELECT 1 FROM ${this.TABLE_NAME} WHERE userId = $userId`, {
        $userId: userId
      }, (err: Error, row: any) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        resolve(row);
      });
    });
  }

  public static read(database: Database, userId: string): Promise<Point> {
    return new Promise((resolve: (value: Point) => void, reject: (reason?: any) => void) => {
      this.createTable(database).then(() => {
        database.get(`SELECT * FROM ${this.TABLE_NAME} WHERE userId = $userId`, {
          $userId: userId
        }, (err: Error, row: any) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else if (!row) {
            console.error(`The user "${userId}" doesn't exists.`);
            reject();
          }
          let point: Point = new Point(userId, row.number);
          resolve(point);
        });
      });
    });
  }

  public static insert(database: Database, point: Point): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason?: any) => void) => {
      this.createTable(database).then(() => {
        database.run(`INSERT INTO ${this.TABLE_NAME}(userId, number) VALUES($userId, $number)`, {
          $userId: point.getUserId(),
          $number: point.getNumber()
        }, (err: Error) => {
          if (err) {
            console.error(`Failed to insert a row in "${this.TABLE_NAME}" table.`);
            reject(err);
          }
          resolve();
        });
      });
    });
  }

  public static update(database: Database, point: Point): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason?: any) => void) => {
      this.createTable(database).then(() => {
        database.run(`UPDATE ${this.TABLE_NAME} SET number = $number WHERE userId = $userId`, {
          $userId: point.getUserId(),
          $number: point.getNumber()
        }, (err: Error) => {
          if (err) {
            console.error(`Failed to update a row in "${this.TABLE_NAME}" table.`);
            reject(err);
          }
          resolve();
        });
      });
    });
  }

  public static delete(database: Database, userId: string): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason?: any) => void) => {
      this.createTable(database).then(() => {
        database.run(`DELETE FROM ${this.TABLE_NAME} WHERE userId = $userId`, {
          $userId: userId
        }, (err: Error) => {
          if (err) {
            console.error(`Failed to delete a row in "${this.TABLE_NAME}" table.`);
            reject(err);
          }
          resolve();
        });
      });
    });
  }
}

export { DAOPoint };
