<script setup lang="ts">
import type { CheckoutDetails } from "~/types/checkout";

const emit = defineEmits<{
  submit: [details: CheckoutDetails];
}>();

const buyerName = ref("");
const buyerPhone = ref("");
const deliveryAddress = ref("");
const deliveryNote = ref("");
const paymentMethod = ref<CheckoutDetails["paymentMethod"]>("cash");

const paymentMethods: Array<{
  id: CheckoutDetails["paymentMethod"];
  label: string;
}> = [
  { id: "cash", label: "Dinheiro" },
  { id: "transfer", label: "Transferência" },
  { id: "card", label: "Cartão" },
];

const canSubmit = computed(
  () =>
    buyerName.value.trim().length > 1 &&
    buyerPhone.value.trim().length > 5 &&
    deliveryAddress.value.trim().length > 5,
);

const submitCheckout = () => {
  if (!canSubmit.value) {
    return;
  }

  emit("submit", {
    name: buyerName.value.trim(),
    phone: buyerPhone.value.trim(),
    address: deliveryAddress.value.trim(),
    note: deliveryNote.value.trim(),
    paymentMethod: paymentMethod.value,
  });
};
</script>

<template>
  <form
    class="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
    @submit.prevent="submitCheckout"
  >
    <h2 class="text-lg font-black">Entrega</h2>

    <div class="mt-4 space-y-3">
      <label class="block">
        <span class="text-xs font-black text-slate-500">Nome</span>
        <input
          v-model="buyerName"
          class="mt-1 h-12 w-full rounded-2xl border-0 bg-slate-50 px-4 text-sm font-bold ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          type="text"
          autocomplete="name"
          placeholder="O seu nome"
        />
      </label>

      <label class="block">
        <span class="text-xs font-black text-slate-500">Telefone</span>
        <input
          v-model="buyerPhone"
          class="mt-1 h-12 w-full rounded-2xl border-0 bg-slate-50 px-4 text-sm font-bold ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          type="tel"
          autocomplete="tel"
          placeholder="+244 900 000 000"
        />
      </label>

      <label class="block">
        <span class="text-xs font-black text-slate-500">Endereço</span>
        <input
          v-model="deliveryAddress"
          class="mt-1 h-12 w-full rounded-2xl border-0 bg-slate-50 px-4 text-sm font-bold ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          type="text"
          autocomplete="street-address"
          placeholder="Bairro, rua ou referência"
        />
      </label>

      <label class="block">
        <span class="text-xs font-black text-slate-500">Observações</span>
        <textarea
          v-model="deliveryNote"
          class="mt-1 min-h-24 w-full resize-none rounded-2xl border-0 bg-slate-50 px-4 py-3 text-sm font-bold ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Troco, ponto de referência ou pedido especial"
        />
      </label>
    </div>

    <fieldset class="mt-4">
      <legend class="text-xs font-black text-slate-500">Pagamento</legend>
      <div class="mt-2 grid grid-cols-3 gap-2">
        <label
          v-for="method in paymentMethods"
          :key="method.id"
          class="flex cursor-pointer items-center justify-center rounded-2xl px-2 py-3 text-center text-xs font-black ring-1"
          :class="
            paymentMethod === method.id
              ? 'bg-slate-950 text-white ring-slate-950'
              : 'bg-slate-50 text-slate-700 ring-slate-200'
          "
        >
          <input
            v-model="paymentMethod"
            class="sr-only"
            type="radio"
            :value="method.id"
          />
          {{ method.label }}
        </label>
      </div>
    </fieldset>

    <button
      class="mt-4 w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
      type="submit"
      :disabled="!canSubmit"
    >
      Confirmar pedido
    </button>
  </form>
</template>
