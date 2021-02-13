import { SQLiteDAO } from './SQLiteDAO';
import { DatabaseProvider, Point } from '..';
import { Database } from 'sqlite3';
import * as path from 'path';
import * as fs from 'fs';

class DAOPoint extends SQLiteDAO {

  public static TABLE_NAME: string = 'Point';
  public static SCRIPT_TABLE: string = 'point.sql';

  public static INFO_CREATING_TABLE: string = `Creating "${DAOPoint.TABLE_NAME}" table if not exists...`;
  public static INFO_TABLE_CREATED: string = `Table "${DAOPoint.TABLE_NAME}" created if not existing.`;

  public static ERROR_CREATE_TABLE: string = `Failed to create "${DAOPoint.TABLE_NAME}" table.`;
  public static ERROR_IS_EXISTS: string = `Failed to check existance of entry in "${DAOPoint.TABLE_NAME}" table.`;
  public static ERROR_CHECK_AND_CREATE: string = `Failed to check and eventually create entry in "${DAOPoint.TABLE_NAME}" table.`;
  public static ERROR_READ: string = `Failed to read a row in "${DAOPoint.TABLE_NAME}" table.`;
  public static ERROR_INSERT: string = `Failed to insert a row in "${DAOPoint.TABLE_NAME}" table.`;
  public static ERROR_UPDATE: string = `Failed to update a row in "${DAOPoint.TABLE_NAME}" table.`;
  public static ERROR_DELETE: string = `Failed to delete a row in "${DAOPoint.TABLE_NAME}" table.`;

  public constructor(database: Database) {
    super(database);
  }

  public createTable(): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      console.log(DAOPoint.INFO_CREATING_TABLE);
      const sqlQueries: string = fs.readFileSync(path.resolve(DatabaseProvider.SCRIPT_DIR, DAOPoint.SCRIPT_TABLE)).toString();
      this.getDatabase().run(sqlQueries, (err: Error) => {
        if (err) {
          console.error(DAOPoint.ERROR_CREATE_TABLE);
          reject(err);
        }
        console.log(DAOPoint.INFO_TABLE_CREATED);
        resolve();
      });
    });
  }

  public isExists(userId: string): Promise<boolean> {
    return new Promise((resolve: (value: boolean) => void, reject: (reason: Error) => void) => {
      this.getDatabase().get(`SELECT 1 FROM ${DAOPoint.TABLE_NAME} WHERE userId = $userId`, {
        $userId: userId
      }, (err: Error, row: any) => {
        if (err) {
          console.error(DAOPoint.ERROR_IS_EXISTS);
          reject(err);
        }
        resolve(row);
      });
    });
  }

  public checkAndCreateEntry(userId: string): Promise<void> {
    return new Promise((resolve: () => void, reject: (readon: Error) => void) => {
      this.isExists(userId)
        .then((isExists: boolean) => {
          if (isExists) {
            resolve();
          } else {
            const point: Point = new Point(userId);
            this.insert(point)
              .then(() => {
                resolve();
              })
              .catch((err: Error) => {
                console.error(DAOPoint.ERROR_CHECK_AND_CREATE);
                reject(err);
              });
          }
        })
        .catch((err: Error) => {
          console.error(DAOPoint.ERROR_CHECK_AND_CREATE);
          reject(err);
        });
    });
  }

  public read(userId: string): Promise<Point> {
    return new Promise((resolve: (value: Point) => void, reject: (reason: Error) => void) => {
      this.createTable()
        .then(() => {
          this.getDatabase().get(`SELECT * FROM ${DAOPoint.TABLE_NAME} WHERE userId = $userId`, {
            $userId: userId
          }, (err: Error, row: any) => {
            if (err || !row || !row.number) {
              console.error(DAOPoint.ERROR_READ);
              reject(err);
            }
            let point: Point = new Point(userId, row.number);
            resolve(point);
          });
        })
        .catch((err?: Error) => {
          console.error(DAOPoint.ERROR_READ);
          reject(err);
        });
    });
  }

  public insert(point: Point): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.createTable()
        .then(() => {
          this.getDatabase().run(`INSERT INTO ${DAOPoint.TABLE_NAME}(userId, number) VALUES($userId, $number)`, {
            $userId: point.getUserId(),
            $number: point.getNumber()
          }, (err: Error) => {
            if (err) {
              console.error(DAOPoint.ERROR_INSERT);
              reject(err);
            }
            resolve();
          });
        })
        .catch((err: Error) => {
          console.error(DAOPoint.ERROR_INSERT);
          reject(err);
        });
    });
  }

  public update(point: Point): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.createTable()
        .then(() => {
          this.getDatabase().run(`UPDATE ${DAOPoint.TABLE_NAME} SET number = $number WHERE userId = $userId`, {
            $userId: point.getUserId(),
            $number: point.getNumber()
          }, (err: Error) => {
            if (err) {
              console.error(DAOPoint.ERROR_UPDATE);
              reject(err);
            }
            resolve();
          });
        })
        .catch((err: Error) => {
          console.error(DAOPoint.ERROR_UPDATE);
          reject(err);
        });
    });
  }

  public delete(userId: string): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.createTable()
        .then(() => {
          this.getDatabase().run(`DELETE FROM ${DAOPoint.TABLE_NAME} WHERE userId = $userId`, {
            $userId: userId
          }, (err: Error) => {
            if (err) {
              console.error(DAOPoint.ERROR_DELETE);
              reject(err);
            }
            resolve();
          });
        })
        .catch((err: Error) => {
          console.error(DAOPoint.ERROR_DELETE);
          reject(err);
        });
    });
  }
}

export { DAOPoint };
