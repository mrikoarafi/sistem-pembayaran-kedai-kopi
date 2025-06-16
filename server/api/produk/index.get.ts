import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const id = query.id as string;

    if (id) {
      // Get single product
      const produk = await prisma.produk.findUnique({
        where: { id: parseInt(id) },
      });

      if (!produk) {
        throw createError({
          statusCode: 404,
          statusMessage: "Produk tidak ditemukan",
        });
      }

      return produk;
    }

    // Get all products
    const produkList = await prisma.produk.findMany({
      orderBy: { created_at: "desc" },
    });

    return produkList;
  } catch (error) {
    console.error("Error in API:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal mengambil data produk",
    });
  } finally {
    await prisma.$disconnect();
  }
});
