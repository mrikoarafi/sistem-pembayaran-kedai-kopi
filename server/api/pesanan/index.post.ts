import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { cart } = body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Keranjang tidak boleh kosong",
      });
    }

    // Calculate total price
    let totalHarga = 0;
    const detailItems: any = [];

    for (const item of cart) {
      const produk = await prisma.produk.findUnique({
        where: { id: item.produk.id },
      });

      if (!produk) {
        throw createError({
          statusCode: 400,
          statusMessage: `Produk dengan ID ${item.produk.id} tidak ditemukan`,
        });
      }

      if (produk.stok < item.quantity) {
        throw createError({
          statusCode: 400,
          statusMessage: `Stok ${produk.nama} tidak mencukupi`,
        });
      }

      // Calculate item price with discount and tax
      const hargaSetelahDiskon = produk.harga * (1 - produk.diskon / 100);
      const hargaFinal = hargaSetelahDiskon * (1 + produk.pajak);
      const subtotal = hargaFinal * item.quantity;

      totalHarga += subtotal;

      detailItems.push({
        produk_id: produk.id,
        jumlah: item.quantity,
        harga_satuan: produk.harga,
        diskon_item: produk.diskon,
        tax_item: produk.pajak,
        subtotal: subtotal,
      });
    }

    // Create order with transaction
    const pesanan = await prisma.$transaction(async (tx) => {
      // Create order
      const newPesanan = await tx.pesanan.create({
        data: {
          total_harga: totalHarga,
          status: "unpaid",
        },
      });

      // Create order details
      await tx.detailPesanan.createMany({
        data: detailItems.map((item: any) => ({
          ...item,
          pesanan_id: newPesanan.id,
        })),
      });

      // Update product stock
      for (const item of cart) {
        await tx.produk.update({
          where: { id: item.produk.id },
          data: {
            stok: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Return order with details
      return await tx.pesanan.findUnique({
        where: { id: newPesanan.id },
        include: {
          detail_pesanan: {
            include: {
              produk: true,
            },
          },
        },
      });
    });

    return pesanan;
  } catch (error) {
    console.error("Error creating order:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal membuat pesanan",
    });
  } finally {
    await prisma.$disconnect();
  }
});
