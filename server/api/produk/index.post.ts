import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: "Data tidak valid",
      });
    }

    let imagePath = null;
    let produkData: any = {};

    // Process form data
    for (const item of formData) {
      if (item.name === "image" && item.filename) {
        // Handle image upload
        const uploadDir = path.join(process.cwd(), "public", "uploads", "produk");

        if (!existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}-${item.filename}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, item.data);
        imagePath = `/uploads/produk/${fileName}`;
      } else if (item.name && item.data) {
        // Handle other form fields
        const value = item.data.toString();
        if (item.name === "kategori") {
          produkData[item.name] = parseInt(value);
        } else {
          produkData[item.name] =
            item.name === "harga" || item.name === "stok" || item.name === "diskon" || item.name === "pajak" ? parseFloat(value) : value;
        }
      }
    }

    // Create product
    const produk = await prisma.produk.create({
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
    console.error("Error creating product:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal membuat produk",
    });
  } finally {
    await prisma.$disconnect();
  }
});
