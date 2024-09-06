import { DataSource } from "typeorm";
import { config } from "dotenv";
config();
import {
  Hotel,
  Availability,
  Booking,
  Payment,
  Review,
  Room,
  User,
} from "../entities";
import { Client } from "pg";
import { Token } from "../entities/Token.entity";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

let AppDataSource: DataSource;

export const createDatabase = async () => {
  const client = new Client({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USERNAME,
    password: String(DB_PASSWORD),
    database: "postgres", // Connect to the default "postgres" database
  });

  try {
    await client.connect();

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`Database "${DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${DB_NAME}" already exists.`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if ((error as any).code === "23505") {
        console.log(`Database "${DB_NAME}" already exists.`);
      } else {
        console.error("Error creating database", error.message);
        process.exit(1);
      }
    } else {
      console.error("Unexpected error", error);
      process.exit(1);
    }
  } finally {
    await client.end();
  }
};

AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: String(DB_PASSWORD),
  database: DB_NAME,
  entities: [Availability, Booking, Hotel, Payment, Review, Room, User, Token],
  synchronize: false,
  logging: false,
  migrations: ["src/migration/**/*.ts"],
});

export default AppDataSource;
