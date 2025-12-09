import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCard } from "@/hooks/useCard";
import { CardForm } from "@/components/cards/CardForm";
import { type CardFormData } from "@/types/card";

interface AddCardDialogProps {
  onSuccess?: () => void;
}

export const AddCardDialog = ({ onSuccess }: AddCardDialogProps) => {
  const [open, setOpen] = useState(false);
  const { addCard } = useCard();

  const handleSubmit = async (formData: CardFormData) => {
    const result = await addCard(formData);

    if (!result.success) {
      alert(`Error: ${result.error?.message}`);
      return;
    }

    onSuccess?.();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription>
            Enter new business card here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <CardForm id="add-card-form" onSubmit={handleSubmit} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="add-card-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
