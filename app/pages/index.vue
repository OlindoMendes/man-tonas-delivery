<script setup lang="ts">
import type { Product } from "~/composables/useCatalog";

const {
  categories,
  products,
  selectedCategoryId,
  selectedCategory,
  visibleProducts,
  featuredProducts,
  formatPrice,
  setSelectedCategory,
} = useCatalog();

const { itemCount } = useCart();

const selectedProduct = ref<Product | null>(null);

const homeSelectedCategory = computed(
  () => selectedCategory.value ?? categories[0],
);

const homeVisibleProducts = computed(() => {
  if (selectedCategoryId.value) {
    return visibleProducts.value;
  }

  return products.filter((product) => product.categoryId === categories[0]?.id);
});

const openProductDetails = (product: Product) => {
  selectedProduct.value = product;
};

const closeProductDetails = () => {
  selectedProduct.value = null;
};
</script>

<template>
  <main class="min-h-screen bg-slate-50 text-slate-950">
    <section
      class="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-4 sm:max-w-2xl lg:max-w-6xl lg:px-8"
    >
      <header class="flex items-center justify-between gap-4">
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-wide text-emerald-700"
          >
            Entrega disponível agora
          </p>
          <button
            class="mt-1 flex items-center gap-2 text-left text-sm font-semibold text-slate-950"
            type="button"
          >
            <span
              class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
            >
              <UIcon
                name="i-lucide-map-pin"
                class="size-5"
                aria-hidden="true"
              />
            </span>
            Luanda, Angola
          </button>
        </div>

        <NuxtLink
          class="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200"
          aria-label="Abrir carrinho"
          to="/cart"
        >
          <UIcon
            name="i-lucide-shopping-bag"
            class="size-5"
            aria-hidden="true"
          />
          <span
            class="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-bold text-white"
            >{{ itemCount }}</span
          >
        </NuxtLink>
      </header>

      <section
        class="mt-6 overflow-hidden rounded-[2rem] bg-slate-950 p-5 text-white shadow-xl shadow-slate-200 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-8"
      >
        <div>
          <p
            class="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-white/10"
          >
            Bebidas geladas em 20-30 min
          </p>
          <h1
            class="mt-5 text-4xl font-black leading-none tracking-tight sm:text-5xl"
          >
            Bebidas entregues geladas, rápido e prontas para servir.
          </h1>
          <p class="mt-4 max-w-sm text-sm leading-6 text-slate-300">
            Peça água, sumos, refrigerantes, cerveja, vinho e packs para festas
            em lojas próximas.
          </p>

          <div class="mt-6 flex gap-3">
            <button
              class="flex-1 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-950/20"
              type="button"
            >
              Comprar bebidas
            </button>
            <button
              class="rounded-2xl bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/15"
              type="button"
            >
              Promoções
            </button>
          </div>
        </div>

        <div class="mt-8 grid grid-cols-[0.8fr_1fr] gap-3 lg:mt-0">
          <div class="space-y-3">
            <div class="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
              <p class="text-4xl" aria-hidden="true">🥤</p>
              <p class="mt-3 text-sm font-bold">Refrigerantes</p>
              <p class="text-xs text-slate-400">A partir de 800 Kz</p>
            </div>
            <div class="rounded-3xl bg-emerald-400 p-4 text-slate-950">
              <p class="text-3xl" aria-hidden="true">🧊</p>
              <p class="mt-3 text-sm font-black">Gelo incluído</p>
            </div>
          </div>
          <div class="rounded-[2rem] bg-white p-4 text-slate-950">
            <div
              class="flex h-full min-h-56 flex-col justify-between rounded-[1.5rem] bg-gradient-to-b from-emerald-100 to-slate-100 p-4"
            >
              <div class="flex items-center justify-between">
                <span
                  class="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white"
                  >Mais pedido</span
                >
                <span class="text-3xl" aria-hidden="true">🍾</span>
              </div>
              <div>
                <p class="text-6xl font-black leading-none">-15%</p>
                <p class="mt-2 text-sm font-semibold">Packs de fim de semana</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-6">
        <label class="relative block" for="drink-search">
          <span
            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
            >⌕</span
          >
          <input
            id="drink-search"
            class="h-14 w-full rounded-2xl border-0 bg-white px-11 text-sm font-medium text-slate-950 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Pesquisar água, refrigerante, vinho..."
            type="search"
          />
        </label>
      </section>

      <section class="mt-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-black">Categorias</h2>
          <NuxtLink class="text-sm font-bold text-emerald-700" to="/products">
            Ver tudo
          </NuxtLink>
        </div>

        <div class="mt-4 grid grid-cols-4 justify-center gap-3 sm:grid-cols-6">
          <button
            v-for="category in categories"
            :key="category.id"
            class="rounded-2xl p-2 text-center shadow-md ring-1 transition cursor-pointer"
            :class="
              selectedCategoryId === category.id ||
              (!selectedCategoryId && category.id === categories[0]?.id)
                ? 'bg-slate-950 text-white ring-slate-950'
                : 'bg-white ring-slate-200'
            "
            type="button"
            @click="setSelectedCategory(category.id)"
          >
            <div class="flex justify-center">
              <img
                :src="category.icon"
                class="flex text-2xl justify-center"
                aria-hidden="true"
              />
            </div>
            <span class="mt-2 block text-xs font-bold">{{
              category.name
            }}</span>
          </button>
        </div>
      </section>

      <section class="mt-7">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-black">
            {{ homeSelectedCategory?.name ?? "Produtos" }}
          </h2>
          <button class="text-sm font-bold text-emerald-700" type="button">
            {{ homeVisibleProducts.length }} produtos
          </button>
        </div>

        <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="product in homeVisibleProducts"
            :key="product.id"
            class="flex cursor-pointer gap-3 rounded-3xl bg-white p-3 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-500"
            role="button"
            tabindex="0"
            @click="openProductDetails(product)"
            @keydown.enter="openProductDetails(product)"
            @keydown.space.prevent="openProductDetails(product)"
          >
            <div
              class="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-4xl"
              :class="product.badgeClass"
              aria-hidden="true"
            >
              {{ product.icon }}
            </div>
            <div class="min-w-0 flex-1 py-1">
              <p class="text-sm font-black">{{ product.name }}</p>
              <p class="mt-1 text-xs text-slate-500">
                {{ product.description }}
              </p>
              <div class="mt-4 flex items-center justify-between">
                <p class="font-black">{{ formatPrice(product.price) }} Kz</p>
                <button
                  class="h-9 w-9 rounded-full bg-slate-950 text-lg font-bold text-white"
                  type="button"
                  :aria-label="`Adicionar ${product.name}`"
                  @click.stop="openProductDetails(product)"
                >
                  +
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="mt-7">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-black">Mais pedidos hoje</h2>
        </div>

        <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="product in featuredProducts"
            :key="product.id"
            class="flex cursor-pointer gap-3 rounded-3xl bg-white p-3 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-emerald-500"
            role="button"
            tabindex="0"
            @click="openProductDetails(product)"
            @keydown.enter="openProductDetails(product)"
            @keydown.space.prevent="openProductDetails(product)"
          >
            <div
              class="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-4xl"
              :class="product.badgeClass"
              aria-hidden="true"
            >
              {{ product.icon }}
            </div>
            <div class="min-w-0 flex-1 py-1">
              <p class="text-sm font-black">{{ product.name }}</p>
              <p class="mt-1 text-xs text-slate-500">
                {{ product.description }}
              </p>
              <div class="mt-4 flex items-center justify-between">
                <p class="font-black">{{ formatPrice(product.price) }} Kz</p>
                <button
                  class="h-9 w-9 rounded-full bg-slate-950 text-lg font-bold text-white"
                  type="button"
                  :aria-label="`Adicionar ${product.name}`"
                  @click.stop="openProductDetails(product)"
                >
                  +
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </section>

    <AppBottomNavigation />

    <ProductDetailModal
      :product="selectedProduct"
      @close="closeProductDetails"
    />
  </main>
</template>
