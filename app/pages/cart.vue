<script setup lang="ts">
const {
  items,
  itemCount,
  subtotal,
  deliveryFee,
  total,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = useCart();
</script>

<template>
  <main class="min-h-screen bg-slate-50 text-slate-950">
    <section
      class="mx-auto w-full max-w-md px-4 pb-28 pt-4 sm:max-w-2xl lg:max-w-6xl lg:px-8"
    >
      <header class="flex items-start justify-between gap-4">
        <div>
          <NuxtLink
            class="inline-flex items-center gap-2 text-sm font-bold text-emerald-700"
            to="/products"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="size-5"
              aria-hidden="true"
            />

            Produtos
          </NuxtLink>
          <h1 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Carrinho
          </h1>
          <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Revise os produtos e ajuste quantidades antes do checkout.
          </p>
        </div>

        <div
          class="inline-flex h-12 min-w-12 items-center justify-center rounded-full bg-white px-4 text-sm font-black shadow-sm ring-1 ring-slate-200"
          aria-label="Itens no carrinho"
        >
          {{ itemCount }}
        </div>
      </header>

      <CartEmptyState v-if="items.length === 0" />

      <div v-else class="mt-7 grid gap-5 lg:grid-cols-[1fr_24rem]">
        <CartItemList
          :items="items"
          @clear="clearCart"
          @decrease="decreaseQuantity"
          @increase="increaseQuantity"
          @remove="removeFromCart"
        />

        <aside class="lg:sticky lg:top-4 lg:self-start">
          <CartSummary
            :subtotal="subtotal"
            :delivery-fee="deliveryFee"
            :total="total"
          />
        </aside>
      </div>
    </section>

    <AppBottomNavigation />
  </main>
</template>
