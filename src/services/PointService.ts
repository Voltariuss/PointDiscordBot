import { User } from 'discord.js';
import { Database } from 'sqlite3';
import { DAOPoint, DatabaseProvider, Point } from "../database";

class PointService {

  public static ERROR_UNKNOWN: string = 'Unknown error';

  public static async getPoint(user: User): Promise<Point> {
    const databaseProvider: DatabaseProvider = new DatabaseProvider();
    databaseProvider.openConnection();
    const database: Database = databaseProvider.getConnection();
    database.serialize();
    const daoPoint: DAOPoint = new DAOPoint(database);
    let point: Point;
    try {
      await daoPoint.checkAndCreateEntry(user.id);
      point = await daoPoint.read(user.id);
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

  public static async setPoint(user: User, number: number): Promise<void> {
    const point: Point = new Point(user.id, number);
    const databaseProvider: DatabaseProvider = new DatabaseProvider();
    databaseProvider.openConnection();
    const database: Database = databaseProvider.getConnection();
    database.serialize();
    const daoPoint: DAOPoint = new DAOPoint(database);
    try {
      await daoPoint.checkAndCreateEntry(user.id);
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

  public static async addPoint(user: User, number: number): Promise<void> {
    const point: Point = await this.getPoint(user);
    const finalNumber: number = point.getNumber() + number;
    await this.setPoint(user, finalNumber);
  }

  public static async removePoint(user: User, number: number): Promise<void> {
    await this.addPoint(user, -number);
  }

  public static async removeUser(user: User): Promise<void> {
    const databaseProvider: DatabaseProvider = new DatabaseProvider();
    databaseProvider.openConnection();
    const database: Database = databaseProvider.getConnection();
    database.serialize();
    const daoPoint: DAOPoint = new DAOPoint(database);
    try {
      await daoPoint.delete(user.id);
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
