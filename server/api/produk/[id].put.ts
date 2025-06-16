import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir, unlink } from "fs/promises";
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

    const formData = await readMultipartFormData(event);

    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: "Data tidak valid",
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

    let imagePath = existingProduk.image;
    let produkData: any = {};

    // Process form data
    for (const item of formData) {
      if (item.name === "image" && item.filename) {
        // Delete old image
        if (existingProduk.image) {
          const oldImagePath = path.join(process.cwd(), "public", existingProduk.image);
          if (existsSync(oldImagePath)) {
            await unlink(oldImagePath).catch(console.error);
          }
        }

        // Upload new image
        const uploadDir = path.join(process.cwd(), "public", "uploads", "produk");

        if (!existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}-${item.filename}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, item.data);
        imagePath = `/uploads/produk/${fileName}`;
      } else if (item.name && item.data) {
        const value = item.data.toString();
        if (item.name === "kategori") {
          produkData[item.name] = parseInt(value);
        } else {
          produkData[item.name] =
            item.name === "harga" || item.name === "stok" || item.name === "diskon" || item.name === "pajak" ? parseFloat(value) : value;
        }
      }
    }

    // Update product
    const produk = await prisma.produk.update({
      where: { id: parseInt(id) },
      data: {
        nama: produkData.nama,
        kategori: produkData.kategori,
        harga: produkData.harga,
        stok: produkData.stok,
        deskripsi: produkData.deskripsi || null,
        image: imagePath,
        diskon: produkData.diskon || 0,
        pajak: produkData.pajak || 0.1,
      },
    });

    return produk;
  } catch (error) {
    console.error("Error updating product:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal mengupdate produk",
    });
  } finally {
    await prisma.$disconnect();
  }
});
