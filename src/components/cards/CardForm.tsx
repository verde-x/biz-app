import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { CardFormData } from "@/types/card";

interface CardFormProps {
  onSubmit: (formData: CardFormData) => void | Promise<void>;
  initialData?: Partial<CardFormData>;
  id: string;
}

const sanitizeFormData = (data?: Partial<CardFormData>): CardFormData => {
  return {
    last_name: data?.last_name ?? "",
    first_name: data?.first_name ?? "",
    company: data?.company ?? "",
    department: data?.department ?? "",
    role: data?.role ?? "",
    phone1: data?.phone1 ?? "",
    phone2: data?.phone2 ?? "",
    email: data?.email ?? "",
    url: data?.url ?? "",
    zip: data?.zip ?? "",
    address1: data?.address1 ?? "",
    address2: data?.address2 ?? "",
    note: data?.note ?? "",
  };
};

export const CardForm = ({ onSubmit, initialData, id }: CardFormProps) => {
  const [formData, setFormData] = useState<CardFormData>(
    sanitizeFormData(initialData)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      <div className="grid gap-3 my-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="grid gap-1">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              data-1p-ignore
              required
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="last_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              data-1p-ignore
              required
            />
          </div>
          <div className="grid gap-1 col-span-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              data-1p-ignore
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              data-1p-ignore
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              data-1p-ignore
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label htmlFor="phone1">Phone 1</Label>
            <Input
              id="phone1"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              data-1p-ignore
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="phone2">Phone 2</Label>
            <Input
              id="phone2"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
              data-1p-ignore
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              data-1p-ignore
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              data-1p-ignore
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="grid gap-1 col-span-4">
            <Label htmlFor="address1">Address 1</Label>
            <Input
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              data-1p-ignore
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="zip">Zip</Label>
            <Input
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              data-1p-ignore
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="grid gap-1 col-span-4">
            <Label htmlFor="address2">Address 2</Label>
            <Input
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              data-1p-ignore
            />
          </div>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="note">Note</Label>
          <Textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};
