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
const mode = ref<"details" | "checkout" | "confirmed">("details");
const confirmationType = ref<"cart" | "order">("cart");
const buyerName = ref("");
const buyerPhone = ref("");
const deliveryAddress = ref("");
const paymentMethod = ref("cash");

const category = computed(() =>
  props.product ? categoryById.value[props.product.categoryId] : undefined,
);

const totalPrice = computed(() => {
  if (!props.product) {
    return 0;
  }

  return props.product.price * quantity.value;
});

const canPlaceOrder = computed(
  () =>
    buyerName.value.trim().length > 1 &&
    buyerPhone.value.trim().length > 5 &&
    deliveryAddress.value.trim().length > 5,
);

watch(
  () => props.product?.id,
  () => {
    quantity.value = 1;
    mode.value = "details";
    confirmationType.value = "cart";
    buyerName.value = "";
    buyerPhone.value = "";
    deliveryAddress.value = "";
    paymentMethod.value = "cash";
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
  confirmationType.value = "cart";
  mode.value = "confirmed";
};

const handleBuyNow = () => {
  mode.value = "checkout";
};

const placeOrder = () => {
  if (!props.product || !canPlaceOrder.value) {
    return;
  }

  addToCart(props.product, quantity.value);
  confirmationType.value = "order";
  mode.value = "confirmed";
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

            <form
              v-else-if="mode === 'checkout'"
              class="mt-5 space-y-3 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-100"
              @submit.prevent="placeOrder"
            >
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-xs font-black uppercase tracking-wide text-emerald-700">
                    Comprar agora
                  </p>
                  <p class="mt-1 text-xl font-black">
                    {{ formatPrice(totalPrice) }} Kz
                  </p>
                </div>
                <button
                  class="text-sm font-black text-slate-500"
                  type="button"
                  @click="mode = 'details'"
                >
                  Voltar
                </button>
              </div>

              <label class="block">
                <span class="text-xs font-black text-slate-500">Nome</span>
                <input
                  v-model="buyerName"
                  class="mt-1 h-12 w-full rounded-2xl border-0 bg-white px-4 text-sm font-bold ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  type="text"
                  autocomplete="name"
                  placeholder="O seu nome"
                />
              </label>

              <label class="block">
                <span class="text-xs font-black text-slate-500">Telefone</span>
                <input
                  v-model="buyerPhone"
                  class="mt-1 h-12 w-full rounded-2xl border-0 bg-white px-4 text-sm font-bold ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  type="tel"
                  autocomplete="tel"
                  placeholder="+244 900 000 000"
                />
              </label>

              <label class="block">
                <span class="text-xs font-black text-slate-500">Endereço</span>
                <input
                  v-model="deliveryAddress"
                  class="mt-1 h-12 w-full rounded-2xl border-0 bg-white px-4 text-sm font-bold ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  type="text"
                  autocomplete="street-address"
                  placeholder="Bairro, rua ou referência"
                />
              </label>

              <fieldset>
                <legend class="text-xs font-black text-slate-500">
                  Pagamento
                </legend>
                <div class="mt-2 grid grid-cols-2 gap-2">
                  <label
                    class="flex cursor-pointer items-center justify-center rounded-2xl px-3 py-3 text-sm font-black ring-1"
                    :class="
                      paymentMethod === 'cash'
                        ? 'bg-slate-950 text-white ring-slate-950'
                        : 'bg-white text-slate-700 ring-slate-200'
                    "
                  >
                    <input
                      v-model="paymentMethod"
                      class="sr-only"
                      type="radio"
                      value="cash"
                    />
                    Dinheiro
                  </label>
                  <label
                    class="flex cursor-pointer items-center justify-center rounded-2xl px-3 py-3 text-sm font-black ring-1"
                    :class="
                      paymentMethod === 'transfer'
                        ? 'bg-slate-950 text-white ring-slate-950'
                        : 'bg-white text-slate-700 ring-slate-200'
                    "
                  >
                    <input
                      v-model="paymentMethod"
                      class="sr-only"
                      type="radio"
                      value="transfer"
                    />
                    Transferência
                  </label>
                </div>
              </fieldset>

              <button
                class="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                type="submit"
                :disabled="!canPlaceOrder"
              >
                Confirmar pedido
              </button>
            </form>

            <div
              v-else
              class="mt-5 rounded-3xl bg-emerald-50 p-4 text-center ring-1 ring-emerald-100"
            >
              <p class="text-4xl" aria-hidden="true">✓</p>
              <h3 class="mt-3 text-xl font-black">
                {{
                  confirmationType === "order"
                    ? "Pedido confirmado"
                    : "Produto no carrinho"
                }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-slate-600">
                <template v-if="confirmationType === 'order'">
                  {{ quantity }} × {{ product.name }} será entregue no endereço
                  indicado.
                </template>
                <template v-else>
                  {{ quantity }} × {{ product.name }} foi adicionado. Pode
                  fechar e continuar a comprar.
                </template>
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
