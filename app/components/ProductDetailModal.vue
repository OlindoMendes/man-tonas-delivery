<script setup lang="ts">
import type { Product } from "~/composables/useCatalog";

const props = defineProps<{
  product: Product | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { categoryById, formatPrice } = useCatalog();
const { addToCart } = useCart();

const quantity = ref(1);
const mode = ref<"details" | "confirmed">("details");

const category = computed(() =>
  props.product ? categoryById.value[props.product.categoryId] : undefined,
);

const totalPrice = computed(() => {
  if (!props.product) {
    return 0;
  }

  return props.product.price * quantity.value;
});

watch(
  () => props.product?.id,
  () => {
    quantity.value = 1;
    mode.value = "details";
  },
);

const increaseQuantity = () => {
  quantity.value += 1;
};

const decreaseQuantity = () => {
  quantity.value = Math.max(1, quantity.value - 1);
};

const handleAddToCart = () => {
  if (!props.product) {
    return;
  }

  addToCart(props.product, quantity.value);
  mode.value = "confirmed";
};

const handleBuyNow = () => {
  if (!props.product) {
    return;
  }

  addToCart(props.product, quantity.value);
  emit("close");
  navigateTo("/checkout");
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="product"
      class="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 px-3 pb-3 pt-10 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      :aria-label="`Detalhes de ${product.name}`"
      @click.self="emit('close')"
    >
      <section
        class="max-h-[92vh] w-full max-w-lg overflow-hidden rounded-[1.75rem] bg-white shadow-2xl ring-1 ring-slate-200"
      >
        <div class="max-h-[92vh] overflow-y-auto">
          <div class="flex items-start justify-between gap-4 p-4 pb-0">
            <div>
              <p class="text-xs font-black uppercase tracking-wide text-emerald-700">
                {{ category?.name ?? "Produto" }}
              </p>
              <h2 class="mt-1 text-2xl font-black leading-tight">
                {{ product.name }}
              </h2>
            </div>

            <button
              class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-black text-slate-700"
              type="button"
              aria-label="Fechar detalhes do produto"
              @click="emit('close')"
            >
              ×
            </button>
          </div>

          <div class="p-4">
            <div
              class="flex aspect-[16/9] items-center justify-center rounded-[1.5rem] text-7xl"
              :class="product.badgeClass"
              aria-hidden="true"
            >
              {{ product.icon }}
            </div>

            <div class="mt-4 grid grid-cols-3 gap-2 text-center">
              <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <p class="text-xs font-bold text-slate-500">Preço</p>
                <p class="mt-1 text-sm font-black">
                  {{ formatPrice(product.price) }} Kz
                </p>
              </div>
              <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <p class="text-xs font-bold text-slate-500">Entrega</p>
                <p class="mt-1 text-sm font-black">20-30 min</p>
              </div>
              <div class="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <p class="text-xs font-bold text-slate-500">Estado</p>
                <p class="mt-1 text-sm font-black">Gelado</p>
              </div>
            </div>

            <p class="mt-4 text-sm leading-6 text-slate-600">
              {{ product.description }}. Preparado para entrega rápida em Luanda
              com embalagem segura e bebidas prontas para servir.
            </p>

            <div
              v-if="mode === 'details'"
              class="mt-5 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-100"
            >
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-xs font-black uppercase tracking-wide text-slate-500">
                    Quantidade
                  </p>
                  <p class="mt-1 text-xl font-black">
                    {{ formatPrice(totalPrice) }} Kz
                  </p>
                </div>

                <div
                  class="grid grid-cols-[2.5rem_3rem_2.5rem] items-center rounded-full bg-white p-1 ring-1 ring-slate-200"
                >
                  <button
                    class="h-10 rounded-full text-xl font-black text-slate-700"
                    type="button"
                    aria-label="Diminuir quantidade"
                    @click="decreaseQuantity"
                  >
                    −
                  </button>
                  <span class="text-center text-sm font-black">{{
                    quantity
                  }}</span>
                  <button
                    class="h-10 rounded-full bg-slate-950 text-xl font-black text-white"
                    type="button"
                    aria-label="Aumentar quantidade"
                    @click="increaseQuantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  class="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 ring-1 ring-slate-200"
                  type="button"
                  @click="handleAddToCart"
                >
                  Adicionar ao carrinho
                </button>
                <button
                  class="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-slate-950"
                  type="button"
                  @click="handleBuyNow"
                >
                  Comprar agora
                </button>
              </div>
            </div>

            <div
              v-else
              class="mt-5 rounded-3xl bg-emerald-50 p-4 text-center ring-1 ring-emerald-100"
            >
              <p class="text-4xl" aria-hidden="true">✓</p>
              <h3 class="mt-3 text-xl font-black">Produto no carrinho</h3>
              <p class="mt-2 text-sm leading-6 text-slate-600">
                {{ quantity }} × {{ product.name }} foi adicionado. Pode fechar
                e continuar a comprar.
              </p>
              <button
                class="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
                type="button"
                @click="emit('close')"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Teleport>
</template>
