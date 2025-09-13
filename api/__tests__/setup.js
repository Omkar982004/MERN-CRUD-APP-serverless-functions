// __tests__/setup.js
import { connectDB, getDB } from '../config/db.js';
import { seedData } from '../config/seed.js';

beforeAll(async () => {
  await connectDB();
  await seedData();
});
