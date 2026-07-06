export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  badgeClass: string;
  popular?: boolean;
};

const categories: Category[] = [
  { id: "agua", name: "Água", icon: "💧" },
  { id: "refrigerante", name: "Refrigerante", icon: "🥤" },
  { id: "sumo", name: "Sumo", icon: "🧃" },
  { id: "cerveja", name: "Cerveja", icon: "🍺" },
];

const products: Product[] = [
  {
    id: "agua-01",
    categoryId: "agua",
    name: "Pack de água sem gás",
    description: "12 garrafas · 500ml",
    price: 4500,
    icon: "💦",
    badgeClass: "bg-sky-100",
    popular: true,
  },
  {
    id: "agua-02",
    categoryId: "agua",
    name: "Água mineral grande",
    description: "6 garrafas · 1.5L",
    price: 3900,
    icon: "💧",
    badgeClass: "bg-cyan-100",
  },
  {
    id: "agua-03",
    categoryId: "agua",
    name: "Água com gás",
    description: "Pack de 6 · 330ml",
    price: 3200,
    icon: "🫧",
    badgeClass: "bg-blue-100",
  },
  {
    id: "agua-04",
    categoryId: "agua",
    name: "Galão de água",
    description: "Unidade · 5L",
    price: 1800,
    icon: "🧊",
    badgeClass: "bg-slate-100",
  },
  {
    id: "agua-05",
    categoryId: "agua",
    name: "Água alcalina",
    description: "6 garrafas · 750ml",
    price: 5200,
    icon: "💧",
    badgeClass: "bg-emerald-100",
  },
  {
    id: "agua-06",
    categoryId: "agua",
    name: "Água premium",
    description: "12 garrafas · 330ml",
    price: 6100,
    icon: "💎",
    badgeClass: "bg-indigo-100",
  },
  {
    id: "agua-07",
    categoryId: "agua",
    name: "Pack familiar de água",
    description: "24 garrafas · 500ml",
    price: 8200,
    icon: "📦",
    badgeClass: "bg-sky-100",
  },
  {
    id: "agua-08",
    categoryId: "agua",
    name: "Água sabor limão",
    description: "6 garrafas · 500ml",
    price: 4300,
    icon: "🍋",
    badgeClass: "bg-lime-100",
  },
  {
    id: "agua-09",
    categoryId: "agua",
    name: "Água gelada individual",
    description: "Unidade · 1.5L",
    price: 900,
    icon: "🥶",
    badgeClass: "bg-cyan-100",
  },
  {
    id: "agua-10",
    categoryId: "agua",
    name: "Água para escritório",
    description: "Pack de 10 · 1.5L",
    price: 6900,
    icon: "🏢",
    badgeClass: "bg-blue-100",
  },
  {
    id: "refrigerante-01",
    categoryId: "refrigerante",
    name: "Coca-Cola original",
    description: "Pack de 6 · 350ml",
    price: 4800,
    icon: "🥤",
    badgeClass: "bg-red-100",
  },
  {
    id: "refrigerante-02",
    categoryId: "refrigerante",
    name: "Sprite lata",
    description: "Pack de 6 · 330ml",
    price: 4500,
    icon: "🍋",
    badgeClass: "bg-lime-100",
  },
  {
    id: "refrigerante-03",
    categoryId: "refrigerante",
    name: "Fanta laranja",
    description: "Pack de 6 · 350ml",
    price: 4600,
    icon: "🍊",
    badgeClass: "bg-orange-100",
    popular: true,
  },
  {
    id: "refrigerante-04",
    categoryId: "refrigerante",
    name: "Pepsi grande",
    description: "2 garrafas · 2L",
    price: 3900,
    icon: "🥤",
    badgeClass: "bg-blue-100",
  },
  {
    id: "refrigerante-05",
    categoryId: "refrigerante",
    name: "Guaraná Antarctica",
    description: "Pack de 6 · 330ml",
    price: 5200,
    icon: "🌿",
    badgeClass: "bg-emerald-100",
  },
  {
    id: "refrigerante-06",
    categoryId: "refrigerante",
    name: "Schweppes tónica",
    description: "Pack de 6 · 250ml",
    price: 5600,
    icon: "🫧",
    badgeClass: "bg-yellow-100",
  },
  {
    id: "refrigerante-07",
    categoryId: "refrigerante",
    name: "Red Bull energy",
    description: "Pack de 4 · 250ml",
    price: 7800,
    icon: "⚡",
    badgeClass: "bg-amber-100",
  },
  {
    id: "refrigerante-08",
    categoryId: "refrigerante",
    name: "Sumol ananás",
    description: "Pack de 6 · 330ml",
    price: 4900,
    icon: "🍍",
    badgeClass: "bg-yellow-100",
  },
  {
    id: "refrigerante-09",
    categoryId: "refrigerante",
    name: "Ice tea pêssego",
    description: "Pack de 6 · 330ml",
    price: 4700,
    icon: "🍑",
    badgeClass: "bg-rose-100",
  },
  {
    id: "refrigerante-10",
    categoryId: "refrigerante",
    name: "Refrigerante festa mix",
    description: "12 unidades variadas",
    price: 8900,
    icon: "🎉",
    badgeClass: "bg-fuchsia-100",
  },
  {
    id: "sumo-01",
    categoryId: "sumo",
    name: "Mix de sumos naturais",
    description: "Laranja, manga e ananás",
    price: 2800,
    icon: "🍊",
    badgeClass: "bg-orange-100",
    popular: true,
  },
  {
    id: "sumo-02",
    categoryId: "sumo",
    name: "Sumo de manga",
    description: "Garrafa · 1L",
    price: 1900,
    icon: "🥭",
    badgeClass: "bg-yellow-100",
  },
  {
    id: "sumo-03",
    categoryId: "sumo",
    name: "Sumo de ananás",
    description: "Garrafa · 1L",
    price: 1900,
    icon: "🍍",
    badgeClass: "bg-amber-100",
  },
  {
    id: "sumo-04",
    categoryId: "sumo",
    name: "Sumo de maracujá",
    description: "Garrafa · 1L",
    price: 2100,
    icon: "🟡",
    badgeClass: "bg-yellow-100",
  },
  {
    id: "sumo-05",
    categoryId: "sumo",
    name: "Sumo detox verde",
    description: "Garrafa · 500ml",
    price: 2400,
    icon: "🥬",
    badgeClass: "bg-green-100",
  },
  {
    id: "sumo-06",
    categoryId: "sumo",
    name: "Limonada fresca",
    description: "Garrafa · 1L",
    price: 1700,
    icon: "🍋",
    badgeClass: "bg-lime-100",
  },
  {
    id: "sumo-07",
    categoryId: "sumo",
    name: "Sumo de morango",
    description: "Garrafa · 750ml",
    price: 2300,
    icon: "🍓",
    badgeClass: "bg-red-100",
  },
  {
    id: "sumo-08",
    categoryId: "sumo",
    name: "Sumo tropical",
    description: "Pack de 4 · 330ml",
    price: 3600,
    icon: "🌴",
    badgeClass: "bg-teal-100",
  },
  {
    id: "sumo-09",
    categoryId: "sumo",
    name: "Néctar de pêssego",
    description: "Pack de 6 · 200ml",
    price: 3100,
    icon: "🍑",
    badgeClass: "bg-rose-100",
  },
  {
    id: "sumo-10",
    categoryId: "sumo",
    name: "Sumo infantil mix",
    description: "10 caixas · 200ml",
    price: 4300,
    icon: "🧃",
    badgeClass: "bg-purple-100",
  },
  {
    id: "cerveja-01",
    categoryId: "cerveja",
    name: "Balde de cerveja",
    description: "6 garrafas · geladas",
    price: 6900,
    icon: "🍻",
    badgeClass: "bg-amber-100",
    popular: true,
  },
  {
    id: "cerveja-02",
    categoryId: "cerveja",
    name: "Cuca garrafa",
    description: "Pack de 6 · 330ml",
    price: 5400,
    icon: "🍺",
    badgeClass: "bg-yellow-100",
  },
  {
    id: "cerveja-03",
    categoryId: "cerveja",
    name: "Nocal lata",
    description: "Pack de 6 · 330ml",
    price: 5200,
    icon: "🍺",
    badgeClass: "bg-orange-100",
  },
  {
    id: "cerveja-04",
    categoryId: "cerveja",
    name: "Heineken long neck",
    description: "Pack de 6 · 250ml",
    price: 7800,
    icon: "🍾",
    badgeClass: "bg-emerald-100",
  },
  {
    id: "cerveja-05",
    categoryId: "cerveja",
    name: "Corona extra",
    description: "Pack de 6 · 330ml",
    price: 8900,
    icon: "🍋",
    badgeClass: "bg-lime-100",
  },
  {
    id: "cerveja-06",
    categoryId: "cerveja",
    name: "Stella Artois",
    description: "Pack de 6 · 330ml",
    price: 8400,
    icon: "⭐",
    badgeClass: "bg-amber-100",
  },
  {
    id: "cerveja-07",
    categoryId: "cerveja",
    name: "Cerveja preta",
    description: "Pack de 6 · 330ml",
    price: 6200,
    icon: "🍺",
    badgeClass: "bg-stone-200",
  },
  {
    id: "cerveja-08",
    categoryId: "cerveja",
    name: "Mini cervejas",
    description: "Pack de 12 · 200ml",
    price: 7600,
    icon: "🧊",
    badgeClass: "bg-sky-100",
  },
  {
    id: "cerveja-09",
    categoryId: "cerveja",
    name: "Craft IPA",
    description: "4 garrafas · 330ml",
    price: 9200,
    icon: "🌾",
    badgeClass: "bg-orange-100",
  },
  {
    id: "cerveja-10",
    categoryId: "cerveja",
    name: "Pack festa cerveja",
    description: "24 unidades variadas",
    price: 19800,
    icon: "🎉",
    badgeClass: "bg-amber-100",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-AO", {
    maximumFractionDigits: 0,
  }).format(price);

export const useCatalog = () => {
  const selectedCategoryId = useState(
    "catalog-selected-category-id",
    () => "",
  );

  const selectedCategory = computed(() =>
    categories.find((category) => category.id === selectedCategoryId.value),
  );

  const visibleProducts = computed(() => {
    if (!selectedCategoryId.value) {
      return products;
    }

    return products.filter(
      (product) => product.categoryId === selectedCategoryId.value,
    );
  });

  const featuredProducts = computed(() =>
    products.filter((product) => product.popular),
  );

  const categoryById = computed<Record<string, Category>>(() =>
    Object.fromEntries(
      categories.map((category) => [category.id, category]),
    ),
  );

  const setSelectedCategory = (categoryId: string) => {
    if (categories.some((category) => category.id === categoryId)) {
      selectedCategoryId.value = categoryId;
    }
  };

  const clearSelectedCategory = () => {
    selectedCategoryId.value = "";
  };

  return {
    categories,
    products,
    selectedCategoryId,
    selectedCategory,
    visibleProducts,
    featuredProducts,
    categoryById,
    formatPrice,
    setSelectedCategory,
    clearSelectedCategory,
  };
};
