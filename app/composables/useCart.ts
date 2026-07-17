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

  const deliveryFee = computed(() => {
    if (items.value.length === 0 || subtotal.value >= 25000) {
      return 0;
    }

    return 1500;
  });

  const total = computed(() => subtotal.value + deliveryFee.value);

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

  const updateQuantity = (productId: string, quantity: number) => {
    const existingItem = items.value.find(
      (item) => item.product.id === productId,
    );

    if (!existingItem) {
      return;
    }

    existingItem.quantity = Math.max(1, quantity);
  };

  const increaseQuantity = (productId: string) => {
    const existingItem = items.value.find(
      (item) => item.product.id === productId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    }
  };

  const decreaseQuantity = (productId: string) => {
    const existingItem = items.value.find(
      (item) => item.product.id === productId,
    );

    if (!existingItem) {
      return;
    }

    existingItem.quantity = Math.max(1, existingItem.quantity - 1);
  };

  const removeFromCart = (productId: string) => {
    items.value = items.value.filter((item) => item.product.id !== productId);
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    addToCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };
};
