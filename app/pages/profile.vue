<script setup lang="ts">
const { profile, initials, profileMenuItems } = useProfile();
</script>

<template>
  <main class="min-h-screen bg-slate-50 text-slate-950">
    <section class="mx-auto w-full max-w-md px-4 pb-28 pt-4 sm:max-w-2xl lg:max-w-6xl lg:px-8">
      <header>
        <NuxtLink
          class="inline-flex items-center gap-2 text-sm font-bold text-emerald-700"
          to="/"
        >
          <span aria-hidden="true">‹</span>
          Início
        </NuxtLink>
        <h1 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Perfil</h1>
        <p class="mt-2 text-sm leading-6 text-slate-500">Gerencie os seus dados e preferências de entrega.</p>
      </header>

      <section class="mt-7 overflow-hidden rounded-3xl bg-slate-950 p-5 text-white shadow-xl shadow-slate-200 sm:p-6">
        <div class="flex items-center gap-4">
          <span class="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xl font-black text-slate-950">
            {{ initials }}
          </span>
          <div class="min-w-0">
            <h2 class="truncate text-xl font-black">{{ profile.name }}</h2>
            <p class="mt-1 truncate text-sm text-slate-300">{{ profile.phone }}</p>
            <p class="truncate text-sm text-slate-300">{{ profile.email }}</p>
          </div>
        </div>

        <div class="mt-5 border-t border-white/10 pt-4">
          <p class="text-xs font-bold uppercase tracking-wide text-emerald-300">Endereço principal</p>
          <p class="mt-1 text-sm font-semibold">{{ profile.address }}</p>
        </div>
      </section>

      <section class="mt-7">
        <h2 class="text-lg font-black">A minha conta</h2>
        <div class="mt-4 space-y-3">
          <ProfileMenuItem
            v-for="item in profileMenuItems"
            :key="item.id"
            :item="item"
          />
        </div>
      </section>

      <section class="mt-7 rounded-3xl bg-emerald-50 p-5 ring-1 ring-emerald-100">
        <div class="flex gap-3">
          <UIcon name="i-lucide-circle-help" class="size-5 shrink-0 text-emerald-700" aria-hidden="true" />
          <div>
            <h2 class="text-sm font-black">Precisa de ajuda?</h2>
            <p class="mt-1 text-sm leading-6 text-slate-600">A nossa equipa está disponível para ajudar com pedidos e entregas.</p>
          </div>
        </div>
      </section>
    </section>

    <AppBottomNavigation />
  </main>
</template>
