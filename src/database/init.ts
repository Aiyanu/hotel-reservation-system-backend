import AppDataSource, { createDatabase } from "./index";

export const init = async () => {
  try {
    await createDatabase(); // Ensure the database is created before initializing DataSource
    await AppDataSource.initialize();
    console.log("Database connected successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during database initialization", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    process.exit(1);
  }
};
