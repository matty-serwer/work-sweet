import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "postgresql://worksweet_admin:K9mP2vL8nX4qR7tY6wZ3@localhost:5432/worksweet_dev?schema=public",
  },
});
