<script setup lang="ts">
const {
  categories,
  products,
  selectedCategoryId,
  selectedCategory,
  visibleProducts,
  categoryById,
  formatPrice,
  setSelectedCategory,
  clearSelectedCategory,
} = useCatalog()
</script>

<template>
  <main class="min-h-screen bg-slate-50 text-slate-950">
    <section
      class="mx-auto w-full max-w-md px-4 pb-28 pt-4 sm:max-w-2xl lg:max-w-6xl lg:px-8"
    >
      <header class="flex items-center justify-between gap-4">
        <div>
          <NuxtLink
            class="inline-flex items-center gap-2 text-sm font-bold text-emerald-700"
            to="/"
          >
            <span aria-hidden="true">‹</span>
            Início
          </NuxtLink>
          <h1 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Catálogo de produtos
          </h1>
          <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Todos os produtos disponíveis para entrega em Luanda.
          </p>
        </div>

        <button
          class="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200"
          type="button"
          aria-label="Abrir carrinho"
        >
          <span class="text-lg" aria-hidden="true">🛒</span>
          <span
            class="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-bold text-white"
            >2</span
          >
        </button>
      </header>

      <section class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <button
          class="rounded-2xl p-4 text-left shadow-sm ring-1 transition"
          :class="
            !selectedCategoryId
              ? 'bg-slate-950 text-white ring-slate-950'
              : 'bg-white ring-slate-200'
          "
          type="button"
          @click="clearSelectedCategory"
        >
          <div class="flex items-center justify-between gap-3">
            <span class="text-3xl" aria-hidden="true">🛒</span>
            <span
              class="text-xs font-black"
              :class="!selectedCategoryId ? 'text-emerald-300' : 'text-emerald-700'"
            >
              {{ products.length }}
            </span>
          </div>
          <p class="mt-3 text-sm font-black">Todos</p>
        </button>

        <button
          v-for="category in categories"
          :key="category.id"
          class="rounded-2xl p-4 text-left shadow-sm ring-1 transition"
          :class="
            selectedCategoryId === category.id
              ? 'bg-slate-950 text-white ring-slate-950'
              : 'bg-white ring-slate-200'
          "
          type="button"
          @click="setSelectedCategory(category.id)"
        >
          <div class="flex items-center justify-between gap-3">
            <span class="text-3xl" aria-hidden="true">{{ category.icon }}</span>
            <span
              class="text-xs font-black"
              :class="
                selectedCategoryId === category.id
                  ? 'text-emerald-300'
                  : 'text-emerald-700'
              "
            >
              {{
                products.filter((product) => product.categoryId === category.id)
                  .length
              }}
            </span>
          </div>
          <p class="mt-3 text-sm font-black">{{ category.name }}</p>
        </button>
      </section>

      <section class="mt-6 rounded-3xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-black uppercase tracking-wide text-emerald-700">
              {{ selectedCategory ? "Categoria selecionada" : "Catálogo completo" }}
            </p>
            <h2 class="mt-1 text-xl font-black">
              {{ selectedCategory?.name ?? "Todos os produtos" }}
            </h2>
          </div>
          <p class="text-sm font-black text-emerald-700">
            {{ visibleProducts.length }} produtos
          </p>
        </div>
      </section>

      <section class="mt-7">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-black">
            {{ selectedCategory?.name ?? "Todos os produtos" }}
          </h2>
          <p class="text-sm font-bold text-emerald-700">
            {{ visibleProducts.length }} produtos
          </p>
        </div>

        <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="product in visibleProducts"
            :key="product.id"
            class="flex gap-3 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-slate-200"
          >
            <div
              class="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-4xl"
              :class="product.badgeClass"
              aria-hidden="true"
            >
              {{ product.icon }}
            </div>
            <div class="min-w-0 flex-1 py-1">
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <p class="truncate text-sm font-black">{{ product.name }}</p>
                  <p class="mt-1 text-xs font-bold text-emerald-700">
                    {{ categoryById[product.categoryId]?.name }}
                  </p>
                </div>
                <span
                  v-if="product.popular"
                  class="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-700"
                >
                  Top
                </span>
              </div>

              <p class="mt-1 text-xs text-slate-500">
                {{ product.description }}
              </p>
              <div class="mt-4 flex items-center justify-between">
                <p class="font-black">{{ formatPrice(product.price) }} Kz</p>
                <button
                  class="h-9 w-9 rounded-full bg-slate-950 text-lg font-bold text-white"
                  type="button"
                  :aria-label="`Adicionar ${product.name}`"
                >
                  +
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </section>

    <nav
      class="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-md border-t border-slate-200 bg-white/95 px-5 pb-4 pt-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur sm:max-w-2xl lg:hidden"
      aria-label="Navegação principal"
    >
      <div class="grid grid-cols-4 text-center text-xs font-bold text-slate-500">
        <NuxtLink to="/">
          <span class="block text-xl" aria-hidden="true">⌂</span>
          Início
        </NuxtLink>
        <NuxtLink class="text-emerald-700" to="/products">
          <span class="block text-xl" aria-hidden="true">⌕</span>
          Produtos
        </NuxtLink>
        <a href="#">
          <span class="block text-xl" aria-hidden="true">♡</span>
          Guardados
        </a>
        <a href="#">
          <span class="block text-xl" aria-hidden="true">☻</span>
          Conta
        </a>
      </div>
    </nav>
  </main>
</template>
