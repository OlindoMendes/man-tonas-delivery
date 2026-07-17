<script setup lang="ts">
withDefaults(
  defineProps<{
    subtotal: number;
    deliveryFee: number;
    total: number;
    estimatedDelivery?: string;
    actionLabel?: string;
    actionTo?: string;
    showAction?: boolean;
  }>(),
  {
    estimatedDelivery: "20-30 min",
    actionLabel: "Finalizar compra",
    actionTo: "/checkout",
    showAction: true,
  },
);

const { formatPrice } = useCatalog();
</script>

<template>
  <section class="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
    <h2 class="text-lg font-black">Resumo</h2>

    <div class="mt-4 space-y-3 text-sm">
      <div class="flex items-center justify-between gap-4">
        <span class="font-bold text-slate-500">Subtotal</span>
        <span class="font-black">{{ formatPrice(subtotal) }} Kz</span>
      </div>
      <div class="flex items-center justify-between gap-4">
        <span class="font-bold text-slate-500">Entrega</span>
        <span class="font-black">
          {{ deliveryFee === 0 ? "Grátis" : `${formatPrice(deliveryFee)} Kz` }}
        </span>
      </div>
      <div class="flex items-center justify-between gap-4">
        <span class="font-bold text-slate-500">Tempo</span>
        <span class="font-black">{{ estimatedDelivery }}</span>
      </div>
    </div>

    <div
      class="mt-4 flex items-center justify-between border-t border-slate-100 pt-4"
    >
      <span class="text-sm font-black">Total</span>
      <span class="text-2xl font-black">{{ formatPrice(total) }} Kz</span>
    </div>

    <NuxtLink
      v-if="showAction"
      class="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-slate-950"
      :to="actionTo"
    >
      {{ actionLabel }}
    </NuxtLink>
  </section>
</template>
