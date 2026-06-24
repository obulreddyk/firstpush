import { Logger } from './LoggerUtil';

/**
 * Interface representing standard database connection config.
 */
export interface DbConfig {
  host: string;
  port: number;
  user: string;
  password?: string;
  database: string;
  ssl?: boolean;
}

/**
 * Database Helper class to execute database queries for validation.
 * Contains stubs and templates for PostgreSQL, MySQL, and generic SQL engines.
 * 
 * To activate these, you must install the respective library:
 *   PostgreSQL: npm install pg @types/pg
 *   MySQL: npm install mysql2 @types/mysql2
 */
export class DbUtil {
  /**
   * Stub method to execute PostgreSQL queries.
   * Un-comment the pg imports and connection logic after running: npm install pg @types/pg
   * 
   * @param config Database connection configuration
   * @param query SQL query string to run
   * @param params Query parameters (optional)
   */
  public static async executePgQuery(config: DbConfig, query: string, params: any[] = []): Promise<any[]> {
    Logger.info(`Executing PG Query: "${query}" with parameters: ${JSON.stringify(params)}`);
    
    try {
      /*
      // Un-comment this block after installing 'pg'
      const { Client } = require('pg');
      const client = new Client({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        ssl: config.ssl ? { rejectUnauthorized: false } : false
      });
      
      await client.connect();
      const res = await client.query(query, params);
      await client.end();
      
      Logger.info(`Query successfully executed. Returned ${res.rowCount} rows.`);
      return res.rows;
      */
      
      Logger.warn('DbUtil.executePgQuery is a stub. Please install "pg" package and uncomment the implementation.');
      return [];
    } catch (error: any) {
      Logger.error(`PG Database Query failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Stub method to execute MySQL queries.
   * Un-comment the mysql2 imports and connection logic after running: npm install mysql2 @types/mysql2
   * 
   * @param config Database connection configuration
   * @param query SQL query string to run
   * @param params Query parameters (optional)
   */
  public static async executeMysqlQuery(config: DbConfig, query: string, params: any[] = []): Promise<any[]> {
    Logger.info(`Executing MySQL Query: "${query}" with parameters: ${JSON.stringify(params)}`);
    
    try {
      /*
      // Un-comment this block after installing 'mysql2'
      const mysql = require('mysql2/promise');
      const connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
      });
      
      const [rows] = await connection.execute(query, params);
      await connection.end();
      
      Logger.info('MySQL Query successfully executed.');
      return rows as any[];
      */
      
      Logger.warn('DbUtil.executeMysqlQuery is a stub. Please install "mysql2" package and uncomment the implementation.');
      return [];
    } catch (error: any) {
      Logger.error(`MySQL Database Query failed: ${error.message}`);
      throw error;
    }
  }
}
