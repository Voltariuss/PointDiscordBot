import { User } from 'discord.js';
import { DAOPoint, Point } from "../database";

class PointService {

  public static getPoint(user: User, callback: (point: Point) => void): void {
    DAOPoint.read(user.id, callback);
  }

  public static setPoint(user: User, number: number) {
    const point: Point = new Point(user.id, number);
    DAOPoint.update(point);
  }

  public static addPoint(user: User, number: number): void {
    this.getPoint(user, (point: Point) => {
      let newNumber: number = point.getNumber() + number;
      this.setPoint(user, newNumber);
    });
  }

  public static removePoint(user: User, number: number): void {
    this.getPoint(user, (point: Point) => {
      let newNumber: number = point.getNumber() - number;
      this.setPoint(user, newNumber);
    });
  }

  public static removeUser(user: User): void {
    DAOPoint.delete(user.id);
  }
}

export { PointService };
