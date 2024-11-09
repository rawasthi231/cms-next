import {
  DataSource,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
  Repository,
} from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
// import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { Post } from "@lib/entities/posts";
import { Page } from "@lib/entities/pages";

class Database {
  static connectionInfo: DataSource | undefined;
  static schemaName: string;

  /**
   * Get database connection. If connection is not established, then establish connection.
   */
  static async getDataSource(): Promise<DataSource | undefined> {
    try {
      const dataSource = new DataSource({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [Post, Page],
        synchronize: true, // Use for development only; run migrations in production
        schema: "public",
      });
      if (!Database.connectionInfo) {
        await dataSource.initialize();
        Database.connectionInfo = dataSource;
        Database.schemaName =
          (dataSource.options as PostgresConnectionOptions).schema || "cms-db";
      }
      return Database.connectionInfo;
    } catch (error) {
      console.log("Error in getDataSource: ", error);
      return Database.connectionInfo;
    }
  }

  /**
   * Get repository of entity from database connection.
   * @param {EntityTarget<T>} model - Entity model to get repository
   * @returns {Promise<Repository<T>>} - Returns repository of entity model
   */
  static async getRepository<T extends ObjectLiteral>(model: EntityTarget<T>) {
    const dbConnection = await Database.getDataSource();
    if (!dbConnection) {
      throw new Error("Database connection is not established.");
    }
    return dbConnection.getRepository(model);
  }

  /**
   * Get QueryRunner and getRepository function to get repository of entity from database connection.
   * @returns {Promise<{queryRunner: QueryRunner, getRepository: <T extends ObjectLiteral>(entity: EntityTarget<T>) => Repository<T>}>} - Returns QueryRunner and getRepository function to get repository of entity
   */
  static async getQueryRunner(): Promise<{
    queryRunner: QueryRunner;
    getRepository: <T extends ObjectLiteral>(
      entity: EntityTarget<T>
    ) => Repository<T>;
  }> {
    const dbConnection = await Database.getDataSource();
    if (!dbConnection) {
      throw new Error("Database connection is not established.");
    }
    const queryRunner = dbConnection.createQueryRunner();

    if (!queryRunner) {
      throw new Error("QueryRunner is not created.");
    }
    await queryRunner.connect();
    return {
      queryRunner,
      getRepository: <T extends ObjectLiteral>(entity: EntityTarget<T>) => {
        return queryRunner.manager.getRepository(entity);
      },
    };
  }
}

export default Database;
