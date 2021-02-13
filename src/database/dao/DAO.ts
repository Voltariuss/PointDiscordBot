import { Entity } from '..';

interface DAO {
  createTable(): Promise<void>;
  isExists(primaryKey: any): Promise<boolean>;
  read(primaryKey: any): Promise<any>;
  insert(entity: Entity): Promise<void>;
  update(entity: Entity): Promise<void>;
  delete(primaryKey: any): Promise<void>;
}

export { DAO };
