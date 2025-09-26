import { PrismaClient } from "../lib/generated/prisma"; // configured in schema.prisma client output
import sampleData from "@/db/sample-data";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.product.deleteMany();
    await prisma.product.createMany({ data: sampleData.products });
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error("Fatal error during seeding:", error);
    process.exit(1);
  }
})();
