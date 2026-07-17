<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    actionLabel?: string;
    actionTo?: string;
  }>(),
  {
    title: "O carrinho está vazio",
    description:
      "Adicione água, gasosas, cervejas ou packs para finalizar o pedido.",
    actionLabel: "Ver produtos",
    actionTo: "/products",
  },
);
</script>

<template>
  <section
    class="mt-8 rounded-3xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-200"
  >
    <div
      class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-4xl"
      aria-hidden="true"
    >
      🛒
    </div>
    <h2 class="mt-4 text-2xl font-black">{{ title }}</h2>
    <p class="mt-2 text-sm leading-6 text-slate-500">
      {{ description }}
    </p>
    <NuxtLink
      class="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-slate-950 sm:w-auto"
      :to="actionTo"
    >
      {{ actionLabel }}
    </NuxtLink>
  </section>
</template>
