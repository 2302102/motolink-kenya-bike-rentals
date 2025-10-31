import { SQLDatabase } from "encore.dev/storage/sqldb";

export default new SQLDatabase("motolink", {
  migrations: "./migrations",
});
