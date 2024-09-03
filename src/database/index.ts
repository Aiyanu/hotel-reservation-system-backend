import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "your_username",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "your_database",
  entities: [], // Add all your entities here
  synchronize: true, // Set to false in production
  logging: true, // Optional: Enable logging for debugging
});
export default AppDataSource;
