import { Entity } from '..';
import { DAO } from './DAO';
import { Database } from "sqlite3";

abstract class SQLiteDAO implements DAO {

  protected database: Database;

  protected constructor(database: Database) {
    this.setDatabase(database);
  }

  protected getDatabase(): Database {
    return this.database;
  }

  private setDatabase(database: Database): void {
    this.database = database;
  }

  public abstract createTable(): Promise<void>;
  public abstract isExists(primaryKey: any): Promise<boolean>;
  public abstract read(primaryKey: any): Promise<Entity>;
  public abstract insert(entity: Entity): Promise<void>;
  public abstract update(entity: Entity): Promise<void>;
  public abstract delete(primaryKey: any): Promise<void>;
}

export { SQLiteDAO };
