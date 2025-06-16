import { PrismaClient } from "@prisma/client";

// Membuat tipe untuk global object yang bisa menyimpan instance PrismaClient
// Ini digunakan untuk mencegah pembuatan multiple connection saat hot reload di development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Membuat instance PrismaClient dengan singleton pattern
// Jika sudah ada instance di global object, gunakan yang sudah ada
// Jika belum ada, buat instance baru dengan konfigurasi logging query
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // Mengaktifkan logging query untuk debugging
  });

// Menyimpan instance prisma ke global object hanya saat development
// Ini mencegah pembuatan connection baru setiap kali ada hot reload
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
