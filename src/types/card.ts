export type Card = {
  id: string;
  user_id: string;
  last_name: string;
  first_name: string;
  company: string;
  department: string;
  role: string;
  phone1: string;
  phone2: string;
  email: string;
  url: string;
  zip: string;
  address1: string;
  address2: string;
  note: string;
  created_at: string;
  updated_at: string;
};

export type CardFormData = Omit<
  Card,
  "id" | "user_id" | "created_at" | "updated_at"
>;
