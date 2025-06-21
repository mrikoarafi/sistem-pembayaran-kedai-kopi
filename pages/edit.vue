<!-- filepath: pages/edit.vue -->
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-800">Kelola Produk</h1>
              <p class="text-sm text-gray-600">Manajemen Menu Kedai Kopi</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/transaksi"
              class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Lihat Pembayaran
              <svg class="w-4 h-4 inline ml-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-6 py-8">
      <!-- Form Section -->
      <div ref="formSection" class="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-amber-100">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-800">
            {{ isEditing ? "Ubah Produk" : "Tambah Produk Baru" }}
          </h2>
        </div>

        <form @submit.prevent="submitForm" enctype="multipart/form-data" class="space-y-6">
          <!-- Basic Info Grid -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Nama Produk</label>
              <input
                v-model="form.nama"
                type="text"
                required
                placeholder="Masukkan nama produk"
                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Kategori</label>
              <select
                v-model="form.kategori"
                required
                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none bg-white"
              >
                <option value="">Pilih Kategori</option>
                <option value="1">🍽️ Makanan</option>
                <option value="2">☕ Minuman</option>
                <option value="3">🍪 Snack</option>
              </select>
            </div>
          </div>

          <!-- Price and Stock Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Harga (Rp)</label>
              <input
                v-model="form.harga"
                type="number"
                step="1000"
                required
                placeholder="0"
                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Stok</label>
              <input
                v-model="form.stok"
                type="number"
                required
                placeholder="0"
                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Diskon (%)</label>
              <input
                v-model="form.diskon"
                type="number"
                step="1"
                min="0"
                max="100"
                placeholder="0"
                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Pajak (%)</label>
              <input
                v-model="form.pajak"
                type="number"
                step="0.1"
                min="0"
                placeholder="10"
                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Image Upload -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Gambar Produk</label>

            <!-- Show current image if editing -->
            <div v-if="isEditing && currentImage && !selectedImagePreview" class="mb-4">
              <p class="text-sm text-gray-600 mb-2">Gambar saat ini:</p>
              <div class="relative inline-block">
                <img :src="currentImage" alt="Current product image" class="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                <div class="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Image preview -->
            <div v-if="selectedImagePreview" class="mb-4">
              <p class="text-sm text-gray-600 mb-2">Preview gambar baru:</p>
              <div class="relative inline-block">
                <img :src="selectedImagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                <div class="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <button
                  type="button"
                  @click="removeSelectedImage"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Upload area -->
            <div
              :class="[
                'border-2 border-dashed rounded-xl p-6 transition-colors',
                selectedImagePreview ? 'border-green-300 bg-green-50' : 'border-amber-200 hover:border-amber-400',
              ]"
            >
              <input ref="imageInput" type="file" accept="image/*" @change="handleImageChange" class="hidden" id="image-upload" />
              <label for="image-upload" class="cursor-pointer block text-center">
                <div v-if="selectedImagePreview" class="text-green-600">
                  <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p class="font-medium">Gambar berhasil dipilih!</p>
                  <p class="text-sm mt-1">{{ selectedImageName }}</p>
                  <p class="text-xs text-green-500 mt-2">Klik untuk memilih gambar lain</p>
                </div>
                <div v-else class="text-amber-600">
                  <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p class="text-gray-600 font-medium">
                    {{ isEditing ? "Klik untuk mengganti gambar" : "Klik untuk upload gambar" }}
                  </p>
                  <p class="text-sm text-gray-400 mt-1">PNG, JPG hingga 10MB</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Deskripsi</label>
            <textarea
              v-model="form.deskripsi"
              rows="4"
              placeholder="Deskripsikan produk Anda..."
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              :disabled="loading"
              class="flex-1 md:flex-none bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              <svg v-if="loading" class="animate-spin w-5 h-5 inline mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ loading ? "Menyimpan..." : isEditing ? "✏️ Update Produk" : "➕ Tambah Produk" }}
            </button>

            <button
              v-if="isEditing"
              type="button"
              @click="cancelEdit"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Batal
            </button>
          </div>
        </form>
      </div>

      <!-- Product List -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Daftar Produk</h2>
          </div>
          <div class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{{ produkList.length }} produk</div>
        </div>

        <!-- Loading State -->
        <div v-if="loadingData" class="flex justify-center items-center py-16">
          <div class="flex flex-col items-center gap-4">
            <div class="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            <p class="text-gray-600">Memuat data produk...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-4 text-center">
          <svg class="w-8 h-8 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="font-medium">{{ error }}</p>
          <button @click="loadProduk" class="mt-3 text-red-600 underline hover:text-red-800">Coba lagi</button>
        </div>

        <!-- Empty State -->
        <div v-else-if="produkList.length === 0" class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Belum ada produk</h3>
          <p class="text-gray-500 mb-6">Tambahkan produk pertama Anda menggunakan form di atas</p>
        </div>

        <!-- Product Cards Grid -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="produk in produkList"
            :key="produk.id"
            class="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <!-- Product Image -->
            <div class="relative h-48 overflow-hidden">
              <img
                v-if="produk.image"
                :src="produk.image"
                :alt="produk.nama"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <svg class="w-16 h-16 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <!-- Category Badge -->
              <div class="absolute top-3 left-3">
                <span :class="['px-3 py-1 rounded-full text-xs font-semibold shadow-lg', getCategoryStyle(produk.kategori)]">
                  {{ getCategoryName(produk.kategori) }}
                </span>
              </div>

              <!-- Stock Badge -->
              <div class="absolute top-3 right-3">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold shadow-lg',
                    produk.stok > 10 ? 'bg-green-500 text-white' : produk.stok > 0 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white',
                  ]"
                >
                  Stok: {{ produk.stok }}
                </span>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-6">
              <h3 class="font-bold text-lg text-gray-800 mb-2 truncate">
                {{ produk.nama }}
              </h3>

              <p v-if="produk.deskripsi" class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ produk.deskripsi }}
              </p>

              <!-- Price Info -->
              <div class="space-y-2 mb-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">Harga</span>
                  <span class="font-bold text-lg text-gray-800">Rp {{ formatCurrency(produk.harga) }}</span>
                </div>

                <div v-if="produk.diskon > 0" class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">Diskon</span>
                  <span class="font-semibold text-red-600">{{ produk.diskon }}%</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">Pajak</span>
                  <span class="font-medium text-gray-600">{{ (produk.pajak * 100).toFixed(1) }}%</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button
                  @click="editProduk(produk)"
                  class="flex-1 bg-amber-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Ubah
                </button>
                <button
                  @click="deleteProduk(produk)"
                  class="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success/Error Toast -->
    <div
      v-if="toast.show"
      :class="[
        'fixed top-4 right-4 p-4 rounded-xl text-white z-50 transition-all duration-300 shadow-lg',
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500',
      ]"
    >
      <div class="flex items-center gap-3">
        <svg v-if="toast.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        {{ toast.message }}
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus produk
            <span class="font-semibold">"{{ deleteTarget?.nama }}"</span>? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div class="flex gap-3">
            <button
              @click="cancelDelete"
              class="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              @click="confirmDelete"
              :disabled="deleting"
              class="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              {{ deleting ? "Menghapus..." : "Hapus" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Set page title and meta
useHead({
  title: "Admin Panel - Manajemen Menu | Kedai Kopi",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Panel admin untuk mengelola menu kedai kopi. Tambah, edit, dan hapus produk dengan mudah.",
    },
  ],
});

const produkList = ref([]);
const loading = ref(false);
const loadingData = ref(true);
const error = ref(null);
const isEditing = ref(false);
const editingId = ref(null);
const imageInput = ref(null);
const formSection = ref(null);

const toast = ref({
  show: false,
  message: "",
  type: "success",
});

const form = ref({
  nama: "",
  kategori: "",
  harga: 0,
  stok: 0,
  deskripsi: "",
  diskon: 0,
  pajak: 0.1,
});

// Load products on mount
onMounted(async () => {
  await loadProduk();
});

const showToast = (message, type = "success") => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const loadProduk = async () => {
  loadingData.value = true;
  error.value = null;

  try {
    const data = await $fetch("/api/produk");
    produkList.value = Array.isArray(data) ? data : data ? [data] : [];
  } catch (err) {
    console.error("Error loading products:", err);
    error.value = "Gagal memuat data produk. Periksa koneksi atau coba lagi.";
    produkList.value = [];
  } finally {
    loadingData.value = false;
  }
};

const selectedImagePreview = ref(null);
const selectedImageName = ref("");
const currentImage = ref(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast("Ukuran file terlalu besar. Maksimal 10MB.", "error");
      event.target.value = "";
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showToast("File harus berupa gambar.", "error");
      event.target.value = "";
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImagePreview.value = e.target.result;
      selectedImageName.value = file.name;
    };
    reader.readAsDataURL(file);
  }
};

const removeSelectedImage = () => {
  selectedImagePreview.value = null;
  selectedImageName.value = "";
  if (imageInput.value) {
    imageInput.value.value = "";
  }
};

const submitForm = async () => {
  loading.value = true;

  try {
    const formData = new FormData();

    // Add form fields
    Object.keys(form.value).forEach((key) => {
      if (form.value[key] !== null && form.value[key] !== undefined) {
        formData.append(key, form.value[key]);
      }
    });

    // Add image if selected
    const imageFile = imageInput.value?.files[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (isEditing.value) {
      // Update product
      await $fetch(`/api/produk/${editingId.value}`, {
        method: "PUT",
        body: formData,
      });
      showToast("Produk berhasil diupdate!");
    } else {
      // Create product
      await $fetch("/api/produk", {
        method: "POST",
        body: formData,
      });
      showToast("Produk berhasil ditambahkan!");
    }

    // Reset form and reload
    resetForm();
    await loadProduk();
  } catch (err) {
    console.error("Error saving product:", err);
    showToast("Gagal menyimpan produk. Silakan coba lagi.", "error");
  } finally {
    loading.value = false;
  }
};

const editProduk = (produk) => {
  isEditing.value = true;
  editingId.value = produk.id;
  currentImage.value = produk.image;

  form.value = {
    nama: produk.nama,
    kategori: produk.kategori.toString(),
    harga: produk.harga,
    stok: produk.stok,
    deskripsi: produk.deskripsi || "",
    diskon: produk.diskon,
    pajak: produk.pajak,
  };

  // Clear any selected image preview
  selectedImagePreview.value = null;
  selectedImageName.value = "";

  // Scroll to form section
  nextTick(() => {
    if (formSection.value) {
      formSection.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
};

const cancelEdit = () => {
  resetForm();
};

const resetForm = () => {
  isEditing.value = false;
  editingId.value = null;
  currentImage.value = null;
  selectedImagePreview.value = null;
  selectedImageName.value = "";

  form.value = {
    nama: "",
    kategori: "",
    harga: 0,
    stok: 0,
    deskripsi: "",
    diskon: 0,
    pajak: 0.1,
  };

  if (imageInput.value) {
    imageInput.value.value = "";
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID").format(amount);
};

const showDeleteModal = ref(false);
const deleteTarget = ref(null);
const deleting = ref(false);

const deleteProduk = (produk) => {
  deleteTarget.value = produk;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  deleteTarget.value = null;
};

const confirmDelete = async () => {
  if (!deleteTarget.value) return;

  deleting.value = true;

  try {
    await $fetch(`/api/produk/${deleteTarget.value.id}`, {
      method: "DELETE",
    });

    showToast("Produk berhasil dihapus!");
    await loadProduk();
  } catch (err) {
    console.error("Error deleting product:", err);
    showToast("Gagal menghapus produk. Silakan coba lagi.", "error");
  } finally {
    deleting.value = false;
    showDeleteModal.value = false;
    deleteTarget.value = null;
  }
};

const getCategoryName = (kategori) => {
  const categories = {
    1: "Makanan",
    2: "Minuman",
    3: "Snack",
  };
  return categories[kategori] || "Unknown";
};

const getCategoryStyle = (kategori) => {
  const styles = {
    1: "bg-orange-100 text-orange-800",
    2: "bg-blue-100 text-blue-800",
    3: "bg-purple-100 text-purple-800",
  };
  return styles[kategori] || "bg-gray-100 text-gray-800";
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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

/* Remove default select arrow */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>
