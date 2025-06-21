<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
    <!-- Header -->
    <div class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-30">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-800">Daftar Transaksi</h1>
              <p class="text-sm text-gray-600">Kelola pesanan kedai kopi</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/edit"
              class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Lihat Edit Menu
              <svg class="w-4 h-4 inline ml-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-6 py-8">
      <!-- info -->
      <div class="flex gap-5">
        <!-- Sales Chart Section -->
        <div class="bg-white rounded-2xl shadow-xl p-8 border border-amber-100 mb-8 w-[80%]">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Grafik Penjualan Bulanan</h2>
            </div>
            <div class="flex items-center gap-3">
              <button
                @click="selectedMonth = 'previous'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedMonth === 'previous' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                {{ previousMonthName }}
              </button>
              <button
                @click="selectedMonth = 'current'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedMonth === 'current' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                {{ currentMonthName }}
              </button>
            </div>
          </div>

          <!-- Chart Container -->
          <div class="h-80 relative">
            <canvas ref="chartCanvas" class="w-full h-full"></canvas>
          </div>

          <!-- Chart Summary -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div class="text-center">
              <p class="text-xl font-bold text-gray-800">{{ chartData.totalOrders }}</p>
              <p class="text-sm text-gray-600">Total Pesanan</p>
            </div>
            <div class="text-center">
              <p class="text-xl font-bold text-green-600">{{ chartData.paidOrders }}</p>
              <p class="text-sm text-gray-600">Sudah Dibayar</p>
            </div>
            <div class="text-center">
              <p class="text-xl font-bold text-amber-600">Rp {{ formatCurrency(chartData.totalRevenue) }}</p>
              <p class="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="w-[20%] flex flex-col gap-5">
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <p class="text-xl font-bold text-gray-800">{{ totalPesananHariIni }}</p>
                <p class="text-sm text-gray-600">Pesanan Hari Ini</p>
                <p class="text-xs text-gray-500">{{ formatDate(new Date(), true) }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="text-xl font-bold text-gray-800">{{ paidOrdersHariIni }}</p>
                <p class="text-sm text-gray-600">Sudah Dibayar Hari Ini</p>
                <p class="text-xs text-gray-500">dari {{ totalPesananHariIni }} pesanan</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div>
                <p class="text-xl font-bold text-gray-800">Rp {{ formatCurrency(totalRevenueHariIni) }}</p>
                <p class="text-sm text-gray-600">Revenue Hari Ini</p>
                <p class="text-xs text-gray-500">dari {{ paidOrdersHariIni }} transaksi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders List -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Daftar Pesanan</h2>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{{ pesananList.length }} total pesanan</div>
            <button @click="loadPesanan" class="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-16">
          <div class="flex flex-col items-center gap-4">
            <div class="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            <p class="text-gray-600">Memuat data pesanan...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16">
          <div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-4 inline-block">
            <svg class="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </div>
          <button @click="loadPesanan" class="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors">
            Coba Lagi
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="pesananList.length === 0" class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Belum ada pesanan</h3>
          <p class="text-gray-500">Pesanan akan muncul di sini setelah pelanggan melakukan checkout</p>
        </div>

        <!-- Orders Grid -->
        <div v-else class="space-y-4">
          <div
            v-for="pesanan in pesananList"
            :key="pesanan.id"
            class="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
          >
            <!-- Order Header -->
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">
                  Pesanan #{{ pesanan.id }}
                  <span v-if="isToday(pesanan.tanggal)" class="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Hari Ini
                  </span>
                </h3>
                <p class="text-sm text-gray-600">
                  {{ formatDate(pesanan.tanggal) }}
                </p>
              </div>
              <div class="flex items-center gap-3">
                <span
                  :class="{
                    'px-4 py-2 rounded-full text-sm font-semibold': true,
                    'bg-green-100 text-green-800': pesanan.status === 'paid',
                    'bg-red-100 text-red-800': pesanan.status === 'unpaid',
                  }"
                >
                  {{ pesanan.status === "paid" ? "Sudah Dibayar" : "Belum Dibayar" }}
                </span>

                <!-- Print Receipt Button -->
                <button
                  v-if="pesanan.status === 'paid'"
                  @click="printReceipt(pesanan)"
                  class="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v-4a2 2 0 002-2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Print Struk
                </button>

                <button
                  v-if="pesanan.status === 'unpaid'"
                  @click="updateOrderStatus(pesanan.id, 'paid')"
                  :disabled="updating === pesanan.id"
                  class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {{ updating === pesanan.id ? "Updating..." : "Tandai Dibayar" }}
                </button>
              </div>
            </div>

            <!-- Order Items -->
            <div class="bg-white rounded-lg p-4 mb-4">
              <h4 class="font-semibold text-gray-800 mb-3">Detail Pesanan:</h4>
              <div class="space-y-2">
                <div
                  v-for="detail in pesanan.detail_pesanan"
                  :key="detail.id"
                  class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                >
                  <div class="flex-1">
                    <p class="font-medium text-gray-800">{{ detail.produk.nama }}</p>
                    <p class="text-sm text-gray-600">
                      {{ detail.jumlah }}x @ Rp {{ formatCurrency(detail.harga_satuan) }}
                      <span v-if="detail.diskon_item > 0" class="text-red-600"> (Diskon {{ detail.diskon_item }}%) </span>
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-800">Rp {{ formatCurrency(detail.subtotal) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Total -->
            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
              <span class="text-lg font-semibold text-gray-800">Total Pembayaran:</span>
              <span class="text-2xl font-bold text-amber-600"> Rp {{ formatCurrency(pesanan.total_harga) }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Receipt Print Modal -->
    <div v-if="showReceiptModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl max-w-md w-full mx-4 shadow-2xl max-h-90vh overflow-hidden">
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-6 border-b">
          <h2 class="text-xl font-bold text-gray-800">Struk Pembayaran</h2>
          <button @click="closeReceiptModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Receipt Content -->
        <div id="receipt-content" class="p-6 bg-white" style="font-family: 'Courier New', monospace">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">KEDAI KOPI</h1>
            <p class="text-sm text-gray-600">
              Jl.Raya Mawar Merah No.23,<br />
              Pondok Kopi. Jakarta Timur
            </p>
            <p class="text-sm text-gray-600">Telp: (021) 86606633</p>
            <div class="border-t border-dashed border-gray-400 my-4"></div>
          </div>

          <div v-if="selectedReceipt" class="space-y-2 text-sm">
            <!-- Order Info -->
            <div class="flex justify-between">
              <span>No. Pesanan:</span>
              <span class="font-semibold">#{{ selectedReceipt.id }}</span>
            </div>
            <div class="flex justify-between">
              <span>Tanggal:</span>
              <span>{{ formatReceiptDate(selectedReceipt.tanggal) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Kasir:</span>
              <span>Admin</span>
            </div>

            <div class="border-t border-dashed border-gray-400 my-4"></div>

            <!-- Items -->
            <div class="space-y-2">
              <div v-for="detail in selectedReceipt.detail_pesanan" :key="detail.id">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="font-medium">{{ detail.produk.nama }}</div>
                    <div class="text-xs text-gray-600">
                      {{ detail.jumlah }} x Rp {{ formatCurrency(detail.harga_satuan) }}
                      <span v-if="detail.diskon_item > 0" class="text-red-600"> (-{{ detail.diskon_item }}%) </span>
                    </div>
                  </div>
                  <div class="font-medium text-right">Rp {{ formatCurrency(detail.subtotal) }}</div>
                </div>
              </div>
            </div>

            <div class="border-t border-dashed border-gray-400 my-4"></div>

            <!-- Summary -->
            <div class="space-y-1">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>Rp {{ formatCurrency(getSubtotal(selectedReceipt)) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Pajak:</span>
                <span>Rp {{ formatCurrency(getTax(selectedReceipt)) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Diskon:</span>
                <span class="text-red-600">-Rp {{ formatCurrency(getDiscount(selectedReceipt)) }}</span>
              </div>
              <div class="border-t border-gray-400 pt-2">
                <div class="flex justify-between font-bold text-lg">
                  <span>TOTAL:</span>
                  <span>Rp {{ formatCurrency(selectedReceipt.total_harga) }}</span>
                </div>
              </div>
            </div>

            <div class="border-t border-dashed border-gray-400 my-4"></div>

            <!-- Footer -->
            <div class="text-center text-xs text-gray-600 space-y-1">
              <p>Terima kasih atas kunjungan Anda!</p>
              <p>Barang yang sudah dibeli tidak dapat ditukar</p>
              <p>Simpan struk ini sebagai bukti pembayaran</p>
              <div class="mt-4">
                <p>{{ new Date().toLocaleString("id-ID") }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="flex gap-3 p-6 border-t bg-gray-50">
          <button
            @click="closeReceiptModal"
            class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Tutup
          </button>
          <button
            @click="printReceiptContent"
            class="flex-1 bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v-4a2 2 0 002-2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print
          </button>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="toast.show" class="fixed top-4 right-4 p-4 rounded-xl text-white z-50 transition-all duration-300 shadow-lg bg-green-500">
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Set page title and meta
useHead({
  title: "Daftar Transaksi - Admin Panel | Kedai Kopi",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Dashboard transaksi untuk melihat dan mengelola semua pesanan kedai kopi.",
    },
    {
      hid: "keywords",
      name: "keywords",
      content: "transaksi, pesanan, pembayaran, dashboard admin, kedai kopi",
    },
    {
      name: "robots",
      content: "noindex, nofollow",
    },
  ],
});

const pesananList = ref([]);
const loading = ref(true);
const error = ref(null);
const updating = ref(null);
const toast = ref({ show: false, message: "" });
const showReceiptModal = ref(false);
const selectedReceipt = ref(null);
const chartCanvas = ref(null);
const chart = ref(null);
const selectedMonth = ref("current");

// Month names
const currentMonthName = computed(() => {
  return new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" });
});

const previousMonthName = computed(() => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
});

// Helper functions for date calculations
const isCurrentMonth = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

const isPreviousMonth = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  return date.getMonth() === prevMonth.getMonth() && date.getFullYear() === prevMonth.getFullYear();
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Computed stats for today only
const totalPesananHariIni = computed(() => {
  return pesananList.value.filter((p) => isToday(p.tanggal)).length;
});

const paidOrdersHariIni = computed(() => {
  return pesananList.value.filter((p) => isToday(p.tanggal) && p.status === "paid").length;
});

const totalRevenueHariIni = computed(() => {
  return pesananList.value.filter((p) => isToday(p.tanggal) && p.status === "paid").reduce((total, p) => total + p.total_harga, 0);
});

// Computed stats
const totalPesanan = computed(() => pesananList.value.length);
const paidOrders = computed(() => pesananList.value.filter((p) => p.status === "paid").length);
const totalRevenue = computed(() => pesananList.value.filter((p) => p.status === "paid").reduce((total, p) => total + p.total_harga, 0));

const showToast = (message) => {
  toast.value = { show: true, message };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const loadPesanan = async () => {
  loading.value = true;
  error.value = null;

  try {
    const data = await $fetch("/api/pesanan");
    pesananList.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error loading orders:", err);
    error.value = "Gagal memuat data pesanan. Silakan coba lagi.";
  } finally {
    loading.value = false;
  }
};

const updateOrderStatus = async (pesananId, status) => {
  updating.value = pesananId;

  try {
    await $fetch(`/api/pesanan/${pesananId}`, {
      method: "PUT",
      body: { status },
    });

    // Update local data
    const index = pesananList.value.findIndex((p) => p.id === pesananId);
    if (index !== -1) {
      pesananList.value[index].status = status;
    }

    showToast("Status pesanan berhasil diupdate!");
  } catch (err) {
    console.error("Error updating order:", err);
    showToast("Gagal mengupdate status pesanan");
  } finally {
    updating.value = null;
  }
};

const printReceipt = (pesanan) => {
  selectedReceipt.value = pesanan;
  showReceiptModal.value = true;
};

const closeReceiptModal = () => {
  showReceiptModal.value = false;
  selectedReceipt.value = null;
};

const printReceiptContent = () => {
  const printWindow = window.open("", "_blank");
  const receiptContent = document.getElementById("receipt-content").innerHTML;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Struk Pembayaran #${selectedReceipt.value.id}</title>
      <style>
        body {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.4;
          margin: 0;
          padding: 20px;
          width: 58mm;
          max-width: 58mm;
        }
        @media print {
          body {
            margin: 0;
            padding: 10px;
          }
          @page {
            size: 58mm auto;
            margin: 0;
          }
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: bold; }
        .font-medium { font-weight: 500; }
        .text-sm { font-size: 11px; }
        .text-xs { font-size: 10px; }
        .text-lg { font-size: 14px; }
        .text-2xl { font-size: 18px; }
        .text-gray-600 { color: #6b7280; }
        .text-red-600 { color: #dc2626; }
        .border-t { border-top: 1px solid #d1d5db; }
        .border-dashed { border-style: dashed; }
        .border-gray-400 { border-color: #9ca3af; }
        .my-4 { margin: 16px 0; }
        .pt-2 { padding-top: 8px; }
        .space-y-1 > * + * { margin-top: 4px; }
        .space-y-2 > * + * { margin-top: 8px; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-start { align-items: flex-start; }
        .flex-1 { flex: 1; }
        .mt-4 { margin-top: 16px; }
        .mb-6 { margin-bottom: 24px; }
      </style>
    </head>
    <body>
      ${receiptContent}
    </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID").format(Math.round(amount));
};

const formatDate = (dateString, dateOnly = false) => {
  const options = dateOnly
    ? { year: "numeric", month: "long", day: "numeric" }
    : {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

  return new Date(dateString).toLocaleString("id-ID", options);
};

const formatReceiptDate = (dateString) => {
  return new Date(dateString).toLocaleString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getSubtotal = (pesanan) => {
  return pesanan.detail_pesanan.reduce((total, detail) => {
    const basePrice = detail.harga_satuan * detail.jumlah;
    return total + basePrice;
  }, 0);
};

const getTax = (pesanan) => {
  return pesanan.detail_pesanan.reduce((total, detail) => {
    const basePrice = detail.harga_satuan * detail.jumlah;
    const discountedPrice = basePrice * (1 - detail.diskon_item / 100);
    const tax = discountedPrice * detail.tax_item;
    return total + tax;
  }, 0);
};

const getDiscount = (pesanan) => {
  return pesanan.detail_pesanan.reduce((total, detail) => {
    const basePrice = detail.harga_satuan * detail.jumlah;
    const discount = basePrice * (detail.diskon_item / 100);
    return total + discount;
  }, 0);
};

// Load orders on mount
onMounted(() => {
  loadPesanan();
});

// Helper function to check if date is today
const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

// Computed chart data
const chartData = computed(() => {
  const isCurrentMonthSelected = selectedMonth.value === "current";
  const filterFn = isCurrentMonthSelected ? isCurrentMonth : isPreviousMonth;

  const filteredOrders = pesananList.value.filter((p) => filterFn(p.tanggal));

  // Get year and month for selected period
  const now = new Date();
  const targetDate = isCurrentMonthSelected ? new Date(now.getFullYear(), now.getMonth()) : new Date(now.getFullYear(), now.getMonth() - 1);

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  // Initialize daily data
  const dailyOrders = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    totalOrders: 0,
    paidOrders: 0,
    revenue: 0,
  }));

  // Aggregate data by day
  filteredOrders.forEach((order) => {
    const orderDate = new Date(order.tanggal);
    const day = orderDate.getDate() - 1; // Convert to 0-based index

    if (day >= 0 && day < daysInMonth) {
      dailyOrders[day].totalOrders++;
      if (order.status === "paid") {
        dailyOrders[day].paidOrders++;
        dailyOrders[day].revenue += order.total_harga;
      }
    }
  });

  const totalOrders = filteredOrders.length;
  const paidOrders = filteredOrders.filter((p) => p.status === "paid").length;
  const totalRevenue = filteredOrders.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.total_harga, 0);

  return {
    dailyOrders,
    totalOrders,
    paidOrders,
    totalRevenue,
    daysInMonth,
  };
});

// Chart creation and update
const createChart = () => {
  if (!chartCanvas.value) return;

  const ctx = chartCanvas.value.getContext("2d");

  if (chart.value) {
    chart.value.destroy();
  }

  const data = chartData.value;
  const labels = Array.from({ length: data.daysInMonth }, (_, i) => `${i + 1}`);

  chart.value = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Revenue (Rp)",
          data: data.dailyOrders.map((d) => d.revenue),
          borderColor: "#D97706",
          backgroundColor: "rgba(217, 119, 6, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          yAxisID: "revenue",
        },
        {
          label: "Pesanan Dibayar",
          data: data.dailyOrders.map((d) => d.paidOrders),
          borderColor: "#059669",
          backgroundColor: "rgba(5, 150, 105, 0.1)",
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          yAxisID: "orders",
        },
        {
          label: "Total Pesanan",
          data: data.dailyOrders.map((d) => d.totalOrders),
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          yAxisID: "orders",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          callbacks: {
            title: (context) => {
              return `Tanggal ${context[0].label} ${selectedMonth.value === "current" ? currentMonthName.value : previousMonthName.value}`;
            },
            label: (context) => {
              const value = context.parsed.y;
              if (context.datasetIndex === 0) {
                return `Revenue: Rp ${formatCurrency(value)}`;
              }
              return `${context.dataset.label}: ${value}`;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Tanggal",
          },
          grid: {
            display: false,
          },
        },
        revenue: {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Revenue (Rp)",
          },
          ticks: {
            callback: function (value) {
              return "Rp " + formatCurrency(value);
            },
          },
        },
        orders: {
          type: "linear",
          position: "right",
          title: {
            display: true,
            text: "Jumlah Pesanan",
          },
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });
};

// Watch for changes and update chart
watch(
  [selectedMonth, pesananList],
  () => {
    nextTick(() => {
      createChart();
    });
  },
  { deep: true }
);

// Initialize chart when component is mounted
onMounted(() => {
  nextTick(() => {
    createChart();
  });
});

// Cleanup chart when component is unmounted
onUnmounted(() => {
  if (chart.value) {
    chart.value.destroy();
  }
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #d97706;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b45309;
}

.max-h-90vh {
  max-height: 90vh;
}

/* Print specific styles */
@media print {
  body * {
    visibility: hidden;
  }
  #receipt-content,
  #receipt-content * {
    visibility: visible;
  }
  #receipt-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 58mm;
  }
}
</style>
