import { Database } from 'sqlite3';
import { DAOPoint, DatabaseProvider, Point } from '..';

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
      // TODO : transaction SQL
      await daoPoint.checkAndCreateEntry(userId);
      point = await daoPoint.read(userId);
    } catch (err: any) {
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
      await daoPoint.checkAndCreateEntry(userId);
      console.log('TESST', point);
      await daoPoint.update(point);
    } catch (err: any) {
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
    const point: Point = await this.getPoint(userId);
    const finalNumber: number = point.getNumber() + number;
    await this.setPoint(userId, finalNumber);
  }

  public static async removePoint(userId: string, number: number): Promise<void> {
    await this.addPoint(userId, -number);
  }

  public static async resetPoint(userId: string): Promise<void> {
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
      await daoPoint.delete(userId);
    } catch (err: any) {
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
