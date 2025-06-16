import { PrismaClient } from "@prisma/client";
import { unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID produk diperlukan",
      });
    }

    // Get existing product
    const existingProduk = await prisma.produk.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduk) {
      throw createError({
        statusCode: 404,
        statusMessage: "Produk tidak ditemukan",
      });
    }

    // Delete image file if exists
    if (existingProduk.image) {
      const imagePath = path.join(process.cwd(), "public", existingProduk.image);
      if (existsSync(imagePath)) {
        await unlink(imagePath).catch(console.error);
      }
    }

    // Delete product from database
    await prisma.produk.delete({
      where: { id: parseInt(id) },
    });

    return { message: "Produk berhasil dihapus" };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal menghapus produk",
    });
  } finally {
    await prisma.$disconnect();
  }
});
