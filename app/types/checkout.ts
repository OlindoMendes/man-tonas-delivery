export type CheckoutDetails = {
  name: string;
  phone: string;
  address: string;
  note: string;
  paymentMethod: "cash" | "transfer" | "card";
};
