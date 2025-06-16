import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const { status } = body;

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID pesanan diperlukan",
      });
    }

    if (!status) {
      throw createError({
        statusCode: 400,
        statusMessage: "Status pesanan diperlukan",
      });
    }

    // Validate status
    const validStatuses = ["unpaid", "paid"];
    if (!validStatuses.includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Status tidak valid",
      });
    }

    // Check if order exists
    const existingPesanan = await prisma.pesanan.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingPesanan) {
      throw createError({
        statusCode: 404,
        statusMessage: "Pesanan tidak ditemukan",
      });
    }

    // Update order
    const updatedPesanan = await prisma.pesanan.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        detail_pesanan: {
          include: {
            produk: true,
          },
        },
      },
    });

    return updatedPesanan;
  } catch (error) {
    console.error("Error updating order:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal mengupdate pesanan",
    });
  } finally {
    await prisma.$disconnect();
  }
});
