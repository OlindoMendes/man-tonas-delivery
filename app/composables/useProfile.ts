import type { CustomerProfile, ProfileMenuItem } from "~/types/profile";

const profileMenuItems: readonly ProfileMenuItem[] = [
  {
    id: "orders",
    label: "Meus pedidos",
    description: "Acompanhe as suas compras",
    icon: "i-lucide-package",
  },
  {
    id: "addresses",
    label: "Endereços",
    description: "Gerencie locais de entrega",
    icon: "i-lucide-map-pin",
  },
  {
    id: "payment",
    label: "Métodos de pagamento",
    description: "Defina como prefere pagar",
    icon: "i-lucide-credit-card",
  },
];

export const useProfile = () => {
  const profile = useState<CustomerProfile>("customer-profile", () => ({
    name: "Cliente Man Tonas",
    phone: "+244 900 000 000",
    email: "cliente@mantonas.ao",
    address: "Viana, Luanda",
  }));

  const initials = computed(() =>
    profile.value.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((name) => name[0])
      .join("")
      .toUpperCase(),
  );

  return { profile, initials, profileMenuItems };
};
