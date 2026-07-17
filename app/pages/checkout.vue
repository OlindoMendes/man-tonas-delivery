<script setup lang="ts">
import type { CheckoutDetails } from "~/types/checkout";

const { items, subtotal, deliveryFee, total, clearCart } = useCart();

const deliveryWindow = "20-30 min";
const confirmedOrder = ref<CheckoutDetails | null>(null);

const placeOrder = (details: CheckoutDetails) => {
  confirmedOrder.value = details;
  clearCart();
};
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
            to="/cart"
          >
            <span aria-hidden="true">‹</span>
            Carrinho
          </NuxtLink>
          <h1 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Checkout
          </h1>
          <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Informe os dados de entrega e escolha como deseja pagar.
          </p>
        </div>
      </header>

      <section
        v-if="confirmedOrder"
        class="mt-8 rounded-3xl bg-emerald-50 p-5 text-center ring-1 ring-emerald-100"
      >
        <p class="text-5xl" aria-hidden="true">✓</p>
        <h2 class="mt-4 text-2xl font-black">Pedido confirmado</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600">
          Recebemos os seus dados. A equipa vai preparar as bebidas e seguir
          para entrega em <strong>{{ confirmedOrder.address }}</strong> em
          {{ deliveryWindow }}.
        </p>
        <NuxtLink
          class="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white sm:w-auto"
          to="/products"
        >
          Continuar a comprar
        </NuxtLink>
      </section>

      <!-- <CartEmptyState
        v-else-if="items.length === 0"
        title="Não há itens para checkout"
        description="Adicione produtos ao carrinho antes de confirmar o pedido."
        action-label="Voltar aos produtos"
      /> -->

      <div v-else class="mt-7 grid gap-5 lg:grid-cols-[1fr_24rem]">
        <CheckoutForm @submit="placeOrder" />

        <aside class="lg:sticky lg:top-4 lg:self-start">
          <CartSummary
            :subtotal="subtotal"
            :delivery-fee="deliveryFee"
            :total="total"
            :estimated-delivery="deliveryWindow"
            :show-action="false"
          />
        </aside>
      </div>
    </section>

    <AppBottomNavigation />
  </main>
</template>
