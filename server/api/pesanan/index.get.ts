import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const id = query.id as string;

    if (id) {
      // Get single order with details
      const pesanan = await prisma.pesanan.findUnique({
        where: { id: parseInt(id) },
        include: {
          detail_pesanan: {
            include: {
              produk: true,
            },
          },
        },
      });

      if (!pesanan) {
        throw createError({
          statusCode: 404,
          statusMessage: "Pesanan tidak ditemukan",
        });
      }

      return pesanan;
    }

    // Get all orders with details
    const pesananList = await prisma.pesanan.findMany({
      include: {
        detail_pesanan: {
          include: {
            produk: true,
          },
        },
      },
      orderBy: { tanggal: "desc" },
    });

    return pesananList;
  } catch (error) {
    console.error("Error in pesanan API:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal mengambil data pesanan",
    });
  } finally {
    await prisma.$disconnect();
  }
});
