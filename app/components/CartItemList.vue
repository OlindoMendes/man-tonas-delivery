<script setup lang="ts">
import type { CartItem } from "~/composables/useCart";

defineProps<{
  items: CartItem[];
}>();

const emit = defineEmits<{
  clear: [];
  decrease: [productId: string];
  increase: [productId: string];
  remove: [productId: string];
}>();

const { formatPrice } = useCatalog();
</script>

<template>
  <section class="space-y-3">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-black">Produtos</h2>
      <button
        class="text-sm font-black text-slate-500"
        type="button"
        @click="emit('clear')"
      >
        Limpar
      </button>
    </div>

    <article
      v-for="item in items"
      :key="item.product.id"
      class="rounded-3xl bg-white p-3 shadow-sm ring-1 ring-slate-200"
    >
      <div class="flex gap-3">
        <div
          class="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-4xl"
          :class="item.product.badgeClass"
          aria-hidden="true"
        >
          {{ item.product.icon }}
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <h3 class="truncate text-sm font-black">
                {{ item.product.name }}
              </h3>
              <p class="mt-1 text-xs text-slate-500">
                {{ item.product.description }}
              </p>
            </div>
            <button
              class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-black text-slate-500"
              type="button"
              :aria-label="`Remover ${item.product.name}`"
              @click="emit('remove', item.product.id)"
            >
              ×
            </button>
          </div>

          <div class="mt-4 flex items-center justify-between gap-3">
            <div
              class="grid grid-cols-[2.25rem_2.75rem_2.25rem] items-center rounded-full bg-slate-50 p-1 ring-1 ring-slate-200"
            >
              <button
                class="h-9 rounded-full text-lg font-black text-slate-700"
                type="button"
                :aria-label="`Diminuir ${item.product.name}`"
                @click="emit('decrease', item.product.id)"
              >
                −
              </button>
              <span class="text-center text-sm font-black">
                {{ item.quantity }}
              </span>
              <button
                class="h-9 rounded-full bg-slate-950 text-lg font-black text-white"
                type="button"
                :aria-label="`Aumentar ${item.product.name}`"
                @click="emit('increase', item.product.id)"
              >
                +
              </button>
            </div>

            <p class="text-right font-black">
              {{ formatPrice(item.product.price * item.quantity) }} Kz
            </p>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
