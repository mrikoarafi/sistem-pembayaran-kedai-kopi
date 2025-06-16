import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    // Test koneksi database
    await prisma.$connect();

    return {
      success: true,
      message: "Koneksi Prisma berhasil!",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal terhubung ke database",
    });
  } finally {
    await prisma.$disconnect();
  }
});
