<script setup lang="ts">
import type { ProfileMenuItem } from "~/types/profile";

defineProps<{
  item: ProfileMenuItem;
}>();
</script>

<template>
  <NuxtLink
    v-if="item.to"
    :to="item.to"
    class="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
  >
    <span
      class="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"
    >
      <UIcon :name="item.icon" class="size-5" aria-hidden="true" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block text-sm font-black text-slate-950">{{
        item.label
      }}</span>
      <span class="mt-1 block text-xs text-slate-500">{{
        item.description
      }}</span>
    </span>
    <UIcon
      name="i-lucide-chevron-right"
      class="size-5 text-slate-400"
      aria-hidden="true"
    />
  </NuxtLink>

  <div
    v-else
    class="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
  >
    <span
      class="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"
    >
      <UIcon :name="item.icon" class="size-5" aria-hidden="true" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block text-sm font-black text-slate-950">{{
        item.label
      }}</span>
      <span class="mt-1 block text-xs text-slate-500">{{
        item.description
      }}</span>
    </span>
    <span class="text-xs font-bold text-slate-400">Em breve</span>
  </div>
</template>
