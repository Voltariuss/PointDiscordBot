import { Database } from 'sqlite3';
import { DAOPoint, DatabaseManager, DatabaseProvider, Point } from '..';

class PointService {

  public static ERROR_UNKNOWN: string = 'Unknown error';

  public static async getPoint(userId: string): Promise<Point> {
    console.debug('PointService.getPoint() method called.');
    const databaseProvider: DatabaseProvider = new DatabaseProvider();
    databaseProvider.openConnection();
    const database: Database = databaseProvider.getConnection();
    database.serialize();
    const daoPoint: DAOPoint = new DAOPoint(database);
    let point: Point;
    try {
      await DatabaseManager.startTransaction(database);
      await daoPoint.checkAndCreateEntry(userId);
      point = await daoPoint.read(userId);
      await DatabaseManager.commitTransaction(database);
    } catch (err: any) {
      await DatabaseManager.rollbackTransaction(database);
      if (err && err.message) {
        console.error(err.message);
      } else {
        console.error()
      }
      throw err;
    } finally {
      databaseProvider.closeConnection();
    }
    return point;
  }

  public static async setPoint(userId: string, number: number): Promise<void> {
    console.debug('PointService.setPoint() method called.');
    const point: Point = new Point(userId, number);
    const databaseProvider: DatabaseProvider = new DatabaseProvider();
    databaseProvider.openConnection();
    const database: Database = databaseProvider.getConnection();
    database.serialize();
    const daoPoint: DAOPoint = new DAOPoint(database);
    try {
      await DatabaseManager.startTransaction(database);
      await daoPoint.checkAndCreateEntry(userId);
      await daoPoint.update(point);
      await DatabaseManager.commitTransaction(database);
    } catch (err: any) {
      await DatabaseManager.rollbackTransaction(database);
      if (err && err.message) {
        console.error(err.message);
      } else {
        console.error(PointService.ERROR_UNKNOWN);
      }
      throw err;
    } finally {
      databaseProvider.closeConnection();
    }
  }

  public static async addPoint(userId: string, number: number): Promise<void> {
    console.debug('PointService.addPoint() method called.');
    const databaseProvider: DatabaseProvider = new DatabaseProvider();
    databaseProvider.openConnection();
    const database: Database = databaseProvider.getConnection();
    database.serialize();
    const daoPoint: DAOPoint = new DAOPoint(database);
    try {
      await DatabaseManager.startTransaction(database);
      await daoPoint.checkAndCreateEntry(userId);
      const point: Point = await daoPoint.read(userId);
      point.setNumber(point.getNumber() + number);
      await daoPoint.update(point);
      await DatabaseManager.commitTransaction(database);
    } catch (err: any) {
      await DatabaseManager.rollbackTransaction(database);
      if (err && err.message) {
        console.error(err.message);
      } else {
        console.error(PointService.ERROR_UNKNOWN);
      }
      throw err;
    } finally {
      databaseProvider.closeConnection();
    }
  }

  public static async removePoint(userId: string, number: number): Promise<void> {
    console.debug('PointService.removePoint() method called.');
    await this.addPoint(userId, -number);
  }

  public static async resetPoint(userId: string): Promise<void> {
    console.debug('PointService.resetPoint() method called.');
    await this.setPoint(userId, 0);
  }

  public static async removeUser(userId: string): Promise<void> {
    console.debug('PointService.removeUser() method called.');
    const databaseProvider: DatabaseProvider = new DatabaseProvider();
    databaseProvider.openConnection();
    const database: Database = databaseProvider.getConnection();
    database.serialize();
    const daoPoint: DAOPoint = new DAOPoint(database);
    try {
      await DatabaseManager.startTransaction(database);
      await daoPoint.delete(userId);
      await DatabaseManager.commitTransaction(database);
    } catch (err: any) {
      await DatabaseManager.rollbackTransaction(database);
      if (err && err.message) {
        console.error(err.message);
      } else {
        console.error(PointService.ERROR_UNKNOWN);
      }
      throw err;
    } finally {
      databaseProvider.closeConnection();
    }
  }
}

export { PointService };
