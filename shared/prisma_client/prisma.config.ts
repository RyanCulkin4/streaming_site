// prisma/prisma.config.ts (adjust path to your layout)
import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './schema.prisma',         // path to your schema
  datasource: {
      url: 'postgresql://postgres:postgres@localhost:3104/KokoroTV?schema=public',
  },
});
