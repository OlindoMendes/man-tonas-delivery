export type CustomerProfile = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

export type ProfileMenuItem = {
  id: string;
  label: string;
  description: string;
  icon: string;
  to?: string;
};
