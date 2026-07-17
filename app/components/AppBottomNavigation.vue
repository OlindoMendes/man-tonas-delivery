<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

type NavigationItem = {
  id: string;
  label: string;
  icon: string;
  to?: RouteLocationRaw;
};

const defaultItems: readonly NavigationItem[] = [
  { id: "home", label: "Início", icon: "i-lucide-house", to: "/" },
  {
    id: "search",
    label: "Procurar",
    icon: "i-lucide-search",
    to: "/products",
  },
  {
    id: "cart",
    label: "Carrinho",
    icon: "i-lucide-shopping-cart",
    to: "/cart",
  },
  { id: "profile", label: "Perfil", icon: "i-lucide-user" },
];

const props = defineProps<{
  items?: readonly NavigationItem[];
}>();

const navigationItems = computed(() => props.items ?? defaultItems);

const emit = defineEmits<{
  select: [item: NavigationItem];
}>();

const itemClass =
  "flex flex-col items-center justify-center gap-1 text-slate-500 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2";
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-md border-t border-slate-200 bg-white/95 px-5 pb-4 pt-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur sm:max-w-2xl lg:hidden"
    aria-label="Navegação principal"
  >
    <ul class="grid grid-cols-4 text-center text-xs font-bold">
      <li v-for="item in navigationItems" :key="item.id">
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          :class="itemClass"
          active-class="text-emerald-700"
          exact-active-class="text-emerald-700"
        >
          <UIcon :name="item.icon" class="size-5" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </NuxtLink>

        <button
          v-else
          :class="itemClass"
          class="w-full"
          type="button"
          @click="emit('select', item)"
        >
          <UIcon :name="item.icon" class="size-5" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>
