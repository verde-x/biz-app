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
import type { Card, CardFormData } from "@/types/card";
import { Pencil } from "lucide-react";

interface EditCardDialogProps {
  card: Card;
  onSuccess?: () => void;
}

export const EditCardDialog = ({ card, onSuccess }: EditCardDialogProps) => {
  const [open, setOpen] = useState(false);
  const { updateCard } = useCard();

  const handleSubmit = async (formData: CardFormData) => {
    const result = await updateCard(card.id, formData);

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
        <Button variant="ghost" size="icon">
          <Pencil className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Card</DialogTitle>
          <DialogDescription>
            Edit business card here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <CardForm
          id="edit-card-form"
          onSubmit={handleSubmit}
          initialData={card}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="edit-card-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
