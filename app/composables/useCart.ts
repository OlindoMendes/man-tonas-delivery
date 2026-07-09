import type { Product } from "./useCatalog";

export type CartItem = {
  product: Product;
  quantity: number;
};

export const useCart = () => {
  const items = useState<CartItem[]>("cart-items", () => []);

  const itemCount = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0),
  );

  const subtotal = computed(() =>
    items.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ),
  );

  const addToCart = (product: Product, quantity = 1) => {
    const safeQuantity = Math.max(1, quantity);
    const existingItem = items.value.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      existingItem.quantity += safeQuantity;
      return;
    }

    items.value.push({
      product,
      quantity: safeQuantity,
    });
  };

  return {
    items,
    itemCount,
    subtotal,
    addToCart,
  };
};
