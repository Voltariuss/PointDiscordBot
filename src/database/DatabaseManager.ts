import { Database } from 'sqlite3';

class DatabaseManager {

  public static ERROR_START_TRANSACTION: string = 'Failed to start the transaction.';
  public static ERROR_COMMIT_TRANSACTION: string = 'Failed to commit the transaction.';
  public static ERROR_ROLLBACK_TRANSACTION: string = 'Failed to rollback the transaction.';

  public static startTransaction(database: Database): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason?: any) => void) => {
      database.run('BEGIN', (err: Error) => {
        if (err) {
          console.error(this.ERROR_START_TRANSACTION);
          reject(err);
        }
        resolve();
      });
    });
  }

  public static commitTransaction(database: Database): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason?: any) => void) => {
      database.run('COMMIT', (err: Error) => {
        if (err) {
          console.error(this.ERROR_COMMIT_TRANSACTION);
          reject(err);
        }
        resolve();
      });
    });
  }

  public static rollbackTransaction(database: Database): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason?: any) => void) => {
      database.run('ROLLBACK', (err: Error) => {
        if (err) {
          console.error(this.ERROR_ROLLBACK_TRANSACTION);
          reject(err);
        }
        resolve();
      });
    });
  }
}

export { DatabaseManager };
