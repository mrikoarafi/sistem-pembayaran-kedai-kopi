<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
    <!-- Header -->
    <div class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-30">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 15.846 4.632 18 6.414 18H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 8H6.28l-.31-1.243A1 1 0 005 6H3a1 1 0 000-2z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-800">Kedai Kopi</h1>
              <p class="text-sm text-gray-600">Menu Hari Ini</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <!-- Cart Icon with Counter -->
            <button 
              @click="showCartModal = true"
              class="relative bg-amber-600 text-white p-3 rounded-full hover:bg-amber-700 transition-colors shadow-lg"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 15.846 4.632 18 6.414 18H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 8H6.28l-.31-1.243A1 1 0 005 6H3a1 1 0 000-2z"/>
              </svg>
              <span v-if="totalCartItems > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {{ totalCartItems }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8">
      <!-- Search Bar -->
      <div class="max-w-md mx-auto mb-8">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Cari menu favorit Anda..."
            class="w-full pl-10 pr-4 py-3 border-0 rounded-full bg-white shadow-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
        </div>
      </div>

      <!-- Category Filter -->
      <div class="flex justify-center gap-3 mb-8">
        <button 
          v-for="category in categories" 
          :key="category.value"
          @click="selectedCategory = category.value"
          :class=" [
            'px-6 py-2 rounded-full font-medium transition-all duration-300',
            selectedCategory === category.value 
              ? 'bg-amber-600 text-white shadow-lg' 
              : 'bg-white text-gray-600 hover:bg-amber-50 shadow-md'
          ]"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-16">
        <div class="flex flex-col items-center gap-4">
          <div class="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
          <p class="text-gray-600">Sedang menyiapkan menu...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-4 inline-block">
          <svg class="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ error }}
        </div>
        <button @click="loadProduk" class="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors">
          Coba Lagi
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProduk.length === 0" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          {{ searchQuery ? 'Menu tidak ditemukan' : 'Menu sedang disiapkan' }}
        </h3>
        <p class="text-gray-500 mb-6">
          {{ searchQuery ? 'Coba kata kunci lain atau pilih kategori berbeda' : 'Silakan tunggu sebentar, menu sedang disiapkan' }}
        </p>
      </div>

      <!-- Menu Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div 
          v-for="produk in filteredProduk" 
          :key="produk.id"
          @click="selectProduct(produk)"
          :class=" [
            'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer relative',
            produk.stok === 0 ? 'opacity-60 cursor-not-allowed' : '',
            getCartQuantity(produk.id) > 0 ? 'ring-2 ring-amber-500' : ''
          ]"
        >
          <!-- In Cart Badge -->
          <div v-if="getCartQuantity(produk.id) > 0" class="absolute top-3 left-3 z-10">
            <div class="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 15.846 4.632 18 6.414 18H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 8H6.28l-.31-1.243A1 1 0 005 6H3a1 1 0 000-2z"/>
              </svg>
              {{ getCartQuantity(produk.id) }}
            </div>
          </div>

          <!-- Product Image -->
          <div class="relative h-48 overflow-hidden">
            <img 
              v-if="produk.image" 
              :src="produk.image" 
              :alt="produk.nama"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            >
            <div v-else class="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <svg class="w-16 h-16 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            
            <!-- Overlay badges -->
            <div class="absolute top-3 right-3 flex flex-col gap-2 items-end">
              <span v-if="produk.diskon > 0" class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg w-max">
                -{{ produk.diskon }}%
              </span>
              
              <span :class=" [
                'px-3 py-1 rounded-full text-sm font-medium shadow-lg',
                produk.stok > 0 ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
              ]">
                {{ produk.stok > 0 ? 'Tersedia' : 'Habis' }}
              </span>
            </div>

            <!-- Stock indicator overlay -->
            <div v-if="produk.stok === 0" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span class="text-white font-bold text-lg">STOK HABIS</span>
            </div>

            <!-- In Cart Overlay -->
            <div v-if="getCartQuantity(produk.id) > 0" class="absolute inset-0 bg-amber-600 bg-opacity-10 flex items-center justify-center">
              <div class="bg-white/90 backdrop-blur-sm rounded-full p-3">
                <svg class="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-6">
            <!-- In Cart Indicator -->
            <div v-if="getCartQuantity(produk.id) > 0" class="mb-3 flex items-center gap-2 text-amber-600 font-medium text-sm">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>{{ getCartQuantity(produk.id) }} di keranjang</span>
            </div>

            <h3 class="font-bold text-xl text-gray-800 mb-2 line-clamp-1">
              {{ produk.nama }}
            </h3>
            
            <p v-if="produk.deskripsi" class="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {{ produk.deskripsi }}
            </p>

            <!-- Price Section -->
            <div class="mb-4">
              <div class="flex items-baseline gap-2 mb-2">
                <span v-if="produk.diskon > 0" class="text-2xl font-bold text-red-600">
                  Rp {{ formatCurrency(calculateDiscountedPrice(produk)) }}
                </span>
                <span v-else class="text-2xl font-bold text-gray-800">
                  Rp {{ formatCurrency(produk.harga) }}
                </span>
                
                <span v-if="produk.diskon > 0" class="text-lg text-gray-400 line-through">
                  Rp {{ formatCurrency(produk.harga) }}
                </span>
              </div>
              
              <!-- Final price with tax -->
              <div class="text-sm text-amber-600 font-medium">
                Total: Rp {{ formatCurrency(calculateFinalPrice(produk)) }}
                <span class="text-gray-500">(termasuk pajak)</span>
              </div>
            </div>

            <!-- Stock info -->
            <div class="flex justify-between items-center text-sm mb-4">
              <span class="text-gray-500">Stok tersisa</span>
              <span :class=" [
                'font-medium',
                produk.stok > 10 ? 'text-green-600' : 
                produk.stok > 0 ? 'text-yellow-600' : 
                'text-red-600'
              ]">
                {{ produk.stok }} porsi
              </span>
            </div>

            <!-- Add to cart indication -->
            <div class="text-center text-sm font-medium">
              <span v-if="produk.stok === 0" class="text-gray-400">
                Stok tidak tersedia
              </span>
              <span v-else-if="getCartQuantity(produk.id) > 0" class="text-amber-600">
                Tap untuk ubah kuantitas
              </span>
              <span v-else class="text-amber-600">
                Tap untuk memilih kuantitas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Selection Modal -->
    <div v-if="selectedProduct" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl max-w-md w-full max-h-90vh overflow-y-auto">
        <div class="p-6">
          <!-- Modal Header -->
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-bold text-gray-800">{{ selectedProduct.nama }}</h2>
            <button @click="closeProductModal" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Product Image -->
          <div class="mb-6">
            <img 
              v-if="selectedProduct.image" 
              :src="selectedProduct.image" 
              :alt="selectedProduct.nama"
              class="w-full h-48 object-cover rounded-lg"
            >
            <div v-else class="w-full h-48 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
              <svg class="w-16 h-16 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
          </div>
          
          <!-- Product Details -->
          <div class="space-y-3 mb-6">
            <p v-if="selectedProduct.deskripsi" class="text-gray-600">
              {{ selectedProduct.deskripsi }}
            </p>
            
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Harga:</span>
                <span class="font-medium">Rp {{ formatCurrency(selectedProduct.harga) }}</span>
              </div>
              <div v-if="selectedProduct.diskon > 0" class="flex justify-between">
                <span class="text-gray-600">Diskon:</span>
                <span class="text-red-600 font-medium">{{ selectedProduct.diskon }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Pajak:</span>
                <span class="font-medium">{{ (selectedProduct.pajak * 100).toFixed(1) }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Stok:</span>
                <span class="font-medium">{{ selectedProduct.stok }} porsi</span>
              </div>
            </div>
            
            <div class="border-t pt-3">
              <div class="flex justify-between text-lg font-bold">
                <span>Harga per item:</span>
                <span class="text-amber-600">Rp {{ formatCurrency(calculateFinalPrice(selectedProduct)) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Quantity Selector -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Kuantitas:</label>
            <div class="flex items-center justify-center gap-4">
              <button 
                @click="decreaseQuantity"
                :disabled="selectedQuantity <= 1"
                class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              
              <div class="text-center">
                <span class="text-3xl font-bold text-gray-800">{{ selectedQuantity }}</span>
                <p class="text-sm text-gray-500">porsi</p>
              </div>
              
              <button 
                @click="increaseQuantity"
                :disabled="selectedQuantity >= selectedProduct.stok"
                class="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center text-xl font-bold text-white hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>
          
          <!-- Total Price -->
          <div class="bg-amber-50 p-4 rounded-lg mb-6">
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium text-gray-700">Total Harga:</span>
              <span class="text-2xl font-bold text-amber-600">
                Rp {{ formatCurrency(calculateFinalPrice(selectedProduct) * selectedQuantity) }}
              </span>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button 
              @click="closeProductModal"
              class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button 
              @click="addToCart"
              class="flex-2 bg-amber-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-700 transition-colors"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Modal -->
    <div v-if="showCartModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
      <div class="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-2xl max-h-90vh overflow-hidden">
        <!-- Cart Header -->
        <div class="flex justify-between items-center p-6 border-b">
          <h2 class="text-2xl font-bold text-gray-800">Keranjang Belanja</h2>
          <button @click="showCartModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Cart Items -->
        <div class="max-h-96 overflow-y-auto p-6">
          <div v-if="cart.length === 0" class="text-center py-8 text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <p>Keranjang masih kosong</p>
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="item in cart" 
              :key="item.id"
              class="flex items-center gap-4 p-4 border rounded-lg"
            >
              <img 
                v-if="item.produk.image" 
                :src="item.produk.image" 
                :alt="item.produk.nama"
                class="w-16 h-16 object-cover rounded-lg"
              >
              <div v-else class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              
              <div class="flex-1">
                <h4 class="font-medium text-gray-800">{{ item.produk.nama }}</h4>
                <p class="text-sm text-gray-600">Rp {{ formatCurrency(calculateFinalPrice(item.produk)) }} x {{ item.quantity }}</p>
                <p class="text-sm font-medium text-amber-600">Rp {{ formatCurrency(calculateFinalPrice(item.produk) * item.quantity) }}</p>
              </div>
              
              <div class="flex items-center gap-2">
                <button 
                  @click="updateCartItemQuantity(item.id, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                  class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold hover:bg-gray-300 disabled:opacity-50"
                >
                  -
                </button>
                <span class="font-medium">{{ item.quantity }}</span>
                <button 
                  @click="updateCartItemQuantity(item.id, item.quantity + 1)"
                  :disabled="item.quantity >= item.produk.stok"
                  class="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-sm font-bold text-white hover:bg-amber-700 disabled:opacity-50"
                >
                  +
                </button>
              </div>
              
              <button 
                @click="removeFromCart(item.id)"
                class="text-red-500 hover:text-red-700 p-1"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Cart Footer -->
        <div v-if="cart.length > 0" class="border-t p-6">
          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Total Item:</span>
              <span class="font-medium">{{ totalCartItems }} porsi</span>
            </div>
            <div class="flex justify-between text-lg font-bold">
              <span>Total Pembayaran:</span>
              <span class="text-amber-600">Rp {{ formatCurrency(totalCartPrice) }}</span>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button 
              @click="clearCart"
              class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Kosongkan
            </button>
            <button 
              @click="proceedToPayment"
              :disabled="checkingOut"
              class="flex-2 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {{ checkingOut ? 'Memproses...' : 'Bayar Sekarang' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Checkout Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Pesanan Berhasil!</h3>
        <p class="text-gray-600 mb-4">
          Pesanan Anda dengan nomor <span class="font-semibold">#{{ orderNumber }}</span> 
          telah berhasil dibuat.
        </p>
        <p class="text-sm text-gray-500 mb-6">
          Total: Rp {{ formatCurrency(orderTotal) }}
        </p>
        <button 
          @click="closeSuccessModal"
          class="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-white/50 backdrop-blur-sm border-t border-amber-100 mt-16">
      <div class="container mx-auto px-6 py-8 text-center">
        <p class="text-gray-600">Nikmati pengalaman kedai kopi terbaik bersama kami</p>
        <p class="text-sm text-gray-500 mt-2">Harga dapat berubah sewaktu-waktu</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Set page title and meta
useHead({
  title: 'Menu Hari Ini - Kedai Kopi',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Jelajahi menu kedai kopi kami hari ini. Pilih dari berbagai macam kopi, makanan, dan snack berkualitas tinggi.'
    },
  ]
})

const produkList = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const selectedCategory = ref('semua')
const cart = ref([])
const selectedProduct = ref(null)
const selectedQuantity = ref(1)
const showCartModal = ref(false)
const checkingOut = ref(false)
const showSuccessModal = ref(false)
const orderNumber = ref(null)
const orderTotal = ref(0)

const categories = [
  { label: 'Semua Menu', value: 'semua' },
  { label: 'Makanan', value: '1' },
  { label: 'Minuman', value: '2' },
  { label: 'Snack', value: '3' }
]

// Load products on mount
onMounted(() => {
  loadProduk()
})

const loadProduk = async () => {
  loading.value = true
  error.value = null
  
  try {
    const data = await $fetch('/api/produk')
    produkList.value = Array.isArray(data) ? data : []
  } catch (err) {
    console.error('Error loading products:', err)
    error.value = 'Gagal memuat menu. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

// Computed properties
const filteredProduk = computed(() => {
  let filtered = produkList.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(produk => 
      produk.nama.toLowerCase().includes(query) ||
      (produk.deskripsi && produk.deskripsi.toLowerCase().includes(query))
    )
  }

  // Filter by category
  if (selectedCategory.value !== 'semua') {
    const categoryId = parseInt(selectedCategory.value)
    filtered = filtered.filter(produk => produk.kategori === categoryId)
  }

  // Sort by availability and name
  filtered.sort((a, b) => {
    // Available items first
    if (a.stok > 0 && b.stok === 0) return -1
    if (a.stok === 0 && b.stok > 0) return 1
    // Then by name
    return a.nama.localeCompare(b.nama)
  })

  return filtered
})

const totalCartItems = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

const totalCartPrice = computed(() => {
  return cart.value.reduce((total, item) => total + (calculateFinalPrice(item.produk) * item.quantity), 0)
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID').format(Math.round(amount))
}

const calculateDiscountedPrice = (produk) => {
  return produk.harga * (1 - produk.diskon / 100)
}

const calculateFinalPrice = (produk) => {
  const discountedPrice = calculateDiscountedPrice(produk)
  return discountedPrice * (1 + produk.pajak)
}

const selectProduct = (produk) => {
  if (produk.stok === 0) return
  selectedProduct.value = produk
  selectedQuantity.value = 1
}

const closeProductModal = () => {
  selectedProduct.value = null
  selectedQuantity.value = 1
}

const increaseQuantity = () => {
  if (selectedQuantity.value < selectedProduct.value.stok) {
    selectedQuantity.value++
  }
}

const decreaseQuantity = () => {
  if (selectedQuantity.value > 1) {
    selectedQuantity.value--
  }
}

const addToCart = () => {
  const existingItemIndex = cart.value.findIndex(item => item.produk.id === selectedProduct.value.id)
  
  if (existingItemIndex >= 0) {
    // Update existing item
    const newQuantity = cart.value[existingItemIndex].quantity + selectedQuantity.value
    if (newQuantity <= selectedProduct.value.stok) {
      cart.value[existingItemIndex].quantity = newQuantity
    } else {
      cart.value[existingItemIndex].quantity = selectedProduct.value.stok
    }
  } else {
    // Add new item
    cart.value.push({
      id: Date.now() + Math.random(), // Simple unique ID
      produk: selectedProduct.value,
      quantity: selectedQuantity.value
    })
  }
  
  closeProductModal()
}

const updateCartItemQuantity = (itemId, newQuantity) => {
  const itemIndex = cart.value.findIndex(item => item.id === itemId)
  if (itemIndex >= 0) {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else if (newQuantity <= cart.value[itemIndex].produk.stok) {
      cart.value[itemIndex].quantity = newQuantity
    }
  }
}

const removeFromCart = (itemId) => {
  cart.value = cart.value.filter(item => item.id !== itemId)
}

const clearCart = () => {
  cart.value = []
  showCartModal.value = false
}

const proceedToPayment = async () => {
  checkingOut.value = true
  
  try {
    const response = await $fetch('/api/pesanan', {
      method: 'POST',
      body: { cart: cart.value }
    })
    
    // Show success modal
    orderNumber.value = response.id
    orderTotal.value = response.total_harga
    showSuccessModal.value = true
    
    // Clear cart
    cart.value = []
    showCartModal.value = false
    
  } catch (err) {
    console.error('Error creating order:', err)
    alert('Gagal memproses pesanan. Silakan coba lagi.')
  } finally {
    checkingOut.value = false
  }
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  orderNumber.value = null
  orderTotal.value = 0
}

const getCartQuantity = (produkId) => {
  const cartItem = cart.value.find(item => item.produk.id === produkId)
  return cartItem ? cartItem.quantity : 0
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar untuk mobile */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #d97706;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b45309;
}

.flex-2 {
  flex: 2;
}

.max-h-90vh {
  max-height: 90vh;
}
</style>